"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Textarea from "@/components/ui/textarea";
import CDatePicker from "@/components/shared/form/date-picker";
import { format } from "date-fns";

interface TodoInputProps {
  onAdd: (title: string, description: string, due_date: string) => void;
  isLoading?: boolean;
}

export const TodoInput = ({ onAdd, isLoading }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(
        title.trim(),
        description.trim(),
        dueDate ? format(dueDate, "yyyy-MM-dd") : "",
      );
      setTitle("");
      setDescription("");
      setDueDate(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Input
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            className="bg-input border-border focus:border-primary transition-colors h-10"
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            className="bg-input border-border focus:border-primary transition-colors"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <CDatePicker
              value={dueDate}
              onChange={setDueDate}
              placeholder="Pick a due date"
              className="w-full"
              closeOnSelect
            />
          </div>
          <Button
            type="submit"
            disabled={!title.trim() || isLoading}
            className="bg-primary text-white hover:bg-primary/90 transition-colors h-10"
            size={"default"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </form>
  );
};
