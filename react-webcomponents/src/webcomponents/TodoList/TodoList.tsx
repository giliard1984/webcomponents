import React, { useState, useEffect, useCallback } from "react";
import { type Root, createRoot } from "react-dom/client";
import { Row, Col, Input, Button } from "antd";
import { PlusOutlined, ClearOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useDebounce } from "../../hooks/useDebounce";

// components
import TodoItems from "../../components/TodoItems/TodoItems";

// styling
import styles from "./TodoList.module.scss";

interface Props {}

export const TodoList: React.FC<Props> = () => {
  const [data, setData] = useState<Todo[] | undefined>();
  const [filteredData, setFilteredData] = useState<Todo[] | undefined>();
  const [newTodoItem, setNewTodoItem] = useState<Record<string, string> | undefined>();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);

  // search function responsible for filtering the data, after the users stops typing (leveraging useDebounce)
  const search = useCallback(async () => {
    const regexp = new RegExp(searchValue, 'i');
    const filtered = data?.filter(x => regexp.test(x.title) || regexp.test(x.description));

    setFilteredData(filtered);
  }, [debouncedValue]);

  useEffect(() => {
    search();
  }, [debouncedValue, search]);

  // as soon as the component mounts, the todo list should be fetched
  useEffect(() => {
    fetch('http://localhost:5174/todos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      setData(json);
      setFilteredData(json);
    });
  }, []);

  const addTodo = () => {
    // TOOD: Validate the data before making a call to the endpoint

    const newData = {
      id: uuidv4(),
      title: newTodoItem?.title,
      description: newTodoItem?.description,
      priority: 999,
      createdAt: dayjs().toISOString(),
      updatedAt: null
    };

    fetch('http://localhost:5174/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    }).then(response => {
      if (response.status === 201) {
        setData((oldArray: any) => [...oldArray, newData]);
        setFilteredData((oldArray: any) => [...oldArray, newData]);
        clearAddTodoSection();
      }
    });
  };

  const clearAddTodoSection = () => {
    setNewTodoItem(undefined);
  };

  // callback function that receives an id, and applies the related action (operation)
  // TODO: abstract it into a helper function, if necessary
  const updateTodoList = (action: Action, id: string): any => {
    switch (action) {
      case "delete":
        setData((oldArray: any) => oldArray.filter((todo: any) => todo.id !== id));
        setFilteredData((oldArray: any) => oldArray.filter((todo: any) => todo.id !== id));
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.todoListWrapper}>
      <Row
        justify="space-between"
        align="middle"
        className={styles.todoListHeader}
      >
        <Col span={12} className={styles.todoListHeaderTitle}>
          <div>My Todos</div>
        </Col>
        <Col span={12}>
          <Input
            size="large"
            placeholder="search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
      </Row>
      <TodoItems data={filteredData} updateTodoList={updateTodoList} />
      <Row
        gutter={[0, 16]}
        justify="space-between"
        align="middle"
        className={styles.todoListFooter}
      >
        <Col span={9}>
          <Input
            size="large"
            placeholder="Title"
            value={newTodoItem?.title}
            onChange={(e) => setNewTodoItem((oldObject: any) => ({...oldObject, title: e.target.value}))}
          />
        </Col>
        <Col span={10}>
          <Input
            size="large"
            placeholder="Description"
            value={newTodoItem?.description}
            onChange={(e) => setNewTodoItem((oldObject: any) => ({...oldObject, description: e.target.value}))}
          />
        </Col>
        <Col span={2} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            className={styles.addButton}
            onClick={addTodo}
            icon={<PlusOutlined style={{ color: "white" }} />}
          />
        </Col>
        <Col span={2} style={{ textAlign: "right" }}>
          <Button
            type="default"
            className={styles.addButton}
            onClick={clearAddTodoSection}
            icon={<ClearOutlined style={{ color: "red" }} />}
          />
        </Col>
      </Row>
    </div>
  );
};

class Element extends HTMLElement {
  root?: Root;
  _internals: ElementInternals;

  constructor() {
    super();

    // this.attachShadow({ mode: "open" });
    // let container = document.createElement("div");
    // const shadowRoot = container.attachShadow({ mode: "open" });
    // this.root = createRoot(shadowRoot);
    // this works
    this._internals = this.attachInternals();
    this.root = createRoot(this);

    // create root container where react element will be inserted
    // let container = document.createElement("div");
    // container.classList.add("react-container");

    // // attach shadow DOM to container
    // const shadowRoot = container.attachShadow({ mode: "open" });

    // // create react element
    // // const reactButton = <button>Submit</button>;

    // // get hold of an existing element in HTML DOM
    // // const domElement = document.getElementById("name");
    // const domElement = document.getElementById("webcomponents-bundle");

    // // insert root container element in HTML DOM after the existing element
    // domElement?.after(container);

    // // shadow DOM as react root
    // this.root = createRoot(shadowRoot);
  }

  static get observedAttributes(): string[] {
    return [];
  }

  renderComponent(): void {
    this?.root?.render(
      <TodoList />
    );
  }

  connectedCallback(): void {
    this.renderComponent();
  }

  disconnectedCallback(): void {
    setTimeout(() => this.root?.unmount(), 0);
  }

  // attributeChangedCallback(attrName: string, _oldValue: string, newValue: string): void {
  //   switch (attrName) {
  //     case "default-value":
  //       this[attrName] = String(newValue);
  //       break;
  //     default:
  //       break;
  //   }

  //   this.renderComponent();
  // }
}

customElements.get("todo-list") ??
  customElements.define("todo-list", Element);
