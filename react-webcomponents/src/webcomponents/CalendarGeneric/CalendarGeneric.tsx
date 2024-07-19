import React, { useState } from "react";
import { type Root, createRoot } from "react-dom/client";
import { Row, Col } from "antd";
import dayjs from "dayjs";
import _ from "lodash";

import styles from "./CalendarGeneric.module.scss";

interface Props {
  defaultValue?: string
}

type YearMonth = {
  year: number
  month: number
  abbreviated: string
  full: string
}

export const CalendarGeneric: React.FC<Props> = ({ defaultValue }) => {
  console.log(defaultValue);
  const [selectedYearMonth/* , setSelectedYearMonth */] = useState<YearMonth>({
    year: Number(dayjs().format("YYYY")),
    month: Number(dayjs().format("M")), // this returns a number from 1 to 12
    abbreviated: dayjs().format("MMM"),
    full: dayjs().format("MMMM"),
  });

  // const firstDayOfMonth = dayjs().startOf("month").day();

  // this variable it is based on the selected year/month
  // .month expects a number from 0 to 11
  const firstDayOfMonth = {
    day: Number(dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).startOf('month').format("DD")),
    dayOfWeek: dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).startOf('month').day(),
    dayOfWeekShortName: dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).startOf('month').format("ddd")
  };

  const lastDayOfMonth = {
    day: Number(dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).endOf('month').format("DD")),
    dayOfWeek: dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).endOf('month').day(),
    dayOfWeekShortName: dayjs().year(selectedYearMonth.year).month(selectedYearMonth.month - 1).endOf('month').format("ddd")
  };

  // Create array that expresses from 1 to the last day, the day and day of week, so it can be complemented.

  return (
    <div className={styles.calendarWrapper}>
      <Row>
        <Col span={24}>{JSON.stringify(selectedYearMonth)}</Col>
        <Col span={24}>{JSON.stringify(firstDayOfMonth)}</Col>
        <Col span={24}>{JSON.stringify(lastDayOfMonth)}</Col>
      </Row>
      <br />
      <Row justify="start">
        {
          _.range(firstDayOfMonth.day, lastDayOfMonth.day + 1)?.map((item: number) =>
            <Col span={1} style={{ background: "#f6f6f6", border: "1px solid #f2f2f2", padding: 10, fontSize: 20, width: "20%", height: "20%" }}>{item}</Col>)
        }
      </Row>
    </div>
  );
};

class Element extends HTMLElement {
  root?: Root;
  "default-value"?: string;

  constructor() {
    super();

    this.root = createRoot(this);
  }

  static get observedAttributes(): string[] {
    return ["default-value"];
  }

  renderComponent(): void {
    this?.root?.render(
      <CalendarGeneric
        defaultValue={this["default-value"]}
      />
    );
  }

  connectedCallback(): void {
    this.renderComponent();
  }

  disconnectedCallback(): void {
    setTimeout(() => this.root?.unmount(), 0);
  }

  attributeChangedCallback(attrName: string, _oldValue: string, newValue: string): void {
    switch (attrName) {
      case "default-value":
        this[attrName] = String(newValue);
        break;
      default:
        break;
    }

    this.renderComponent();
  }
}

customElements.get("calendar-generic") ??
  customElements.define("calendar-generic", Element);
