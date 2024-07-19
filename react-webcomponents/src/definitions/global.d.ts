type Todo = {
  id: string
  title: string
  description: string
  priority: number
  createdAt: Date
  updatedAt?: Date
};

type Action = "delete" | "create" | "update";