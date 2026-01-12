"use client";

import {
  useGetTodos,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "@/services/todoService";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const TodoContainer = () => {
  const { todos, isLoading } = useGetTodos();
  const { createTodo, isLoading: isCreating } = useCreateTodo();
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  console.log(todos);

  const handleAddTodo = (
    title: string,
    description: string,
    due_date: string,
  ) => {
    createTodo({ title, description, due_date, is_completed: false });
  };

  const handleToggleTodo = (id: string | number, completed: boolean) => {
    updateTodo({ id, payload: { is_completed: completed } });
  };

  const handleDeleteTodo = (id: string | number) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (
    id: string | number,
    data: { title?: string; description?: string; due_date?: string },
  ) => {
    updateTodo({ id, payload: data });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          NantiAja
        </h1>
        <p className="text-muted-foreground">
          Stay organized and productive with your personal to-do list.
        </p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
        <TodoInput onAdd={handleAddTodo} isLoading={isCreating} />
        <TodoList
          todos={todos}
          isLoading={isLoading}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      </div>
    </div>
  );
};
