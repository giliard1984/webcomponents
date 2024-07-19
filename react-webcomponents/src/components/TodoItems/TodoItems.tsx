import React, { useState, useEffect } from "react";

// components
import TodoItem from "../TodoItem/TodoItem";

interface Props {
  data?: Todo[]
  updateTodoList: (action: Action, id: string) => string
}

const TodoItems: React.FC<Props> = ({ data, updateTodoList }) => {
  const [todoItems, setTodoItems] = useState<Todo[] | undefined>(data);

  useEffect(() => {
    setTodoItems(data);
  }, [data]);

  if (todoItems?.length) return todoItems.map((todo: Todo) => <TodoItem data={todo} updateTodoList={updateTodoList} />);
  
  return <>Loading...</>;
}

export default TodoItems;
