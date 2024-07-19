import React from "react";
import { Row, Col, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

import styles from "./TodoItem.module.scss";

interface Props {
  data?: Todo
  updateTodoList: (action: Action, id: string) => string
}

const TodoItem: React.FC<Props> = ({ data, updateTodoList }) => {
  const deleteTodo = (id: string) => {
    fetch(`http://localhost:5174/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status === 200) {
        updateTodoList("delete", id);
      }
    });
  };

  if (data) {
    return (
      <Row
        justify="space-between"
        align="top"
        className={styles.todoItemWrapper}
      >
        <Col span={18} className={styles.todoItemTitle}>{data.title}</Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            style={{ color: "red" }}
            onClick={() => deleteTodo(data?.id) }
          >
            Delete
          </Button>
        </Col>
        <Col span={24} className={styles.todoItemDescription}>{data.description}</Col>
      </Row>
    );
  }

  return <>Loading...</>;
};

export default TodoItem;
