import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  if (todoItems?.length) {
    return todoItems.map((todo: Todo, index: number) => 
      <motion.div
        key={`todo-item-wrapper-${todo.id}`}
        initial={{
          x: -20,
          y: 0,
          opacity: 0 
        }}
        animate={{
          x: 0,
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: index * 0.1,
          duration: 0.15,
          ease: "easeIn"
        }}
      >
        <TodoItem data={todo} updateTodoList={updateTodoList} />
      </motion.div>
    );
  }
  
  return <>Loading...</>;
}

export default TodoItems;
