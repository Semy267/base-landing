"use client";

import { Todo } from "@/types/todo";
import { TodoItem } from "./TodoItem";
import { Skeleton } from "@/components/ui/skeleton";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: string | number, completed: boolean) => void;
  onDelete: (id: string | number) => void;
  onUpdate: (
    id: string | number,
    data: { title?: string; description?: string; due_date?: string },
  ) => void;
}

export const TodoList = ({
  todos,
  isLoading,
  onToggle,
  onDelete,
  onUpdate,
}: TodoListProps) => {
  if (isLoading && todos?.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (todos?.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-border rounded-lg">
        No tasks found. Add one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
