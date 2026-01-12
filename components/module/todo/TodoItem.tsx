"use client";

import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Edit2,
  Check,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn, formattedDate } from "@/lib/utils";
import Textarea from "@/components/ui/textarea";
import CDatePicker from "@/components/shared/form/date-picker";
import { format } from "date-fns";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string | number, completed: boolean) => void;
  onDelete: (id: string | number) => void;
  onUpdate: (
    id: string | number,
    data: { title?: string; description?: string; due_date?: string },
  ) => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || "");
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(
    todo.due_date ? new Date(todo.due_date) : undefined,
  );

  const handleUpdate = () => {
    const formattedDueDate = editDueDate
      ? format(editDueDate, "yyyy-MM-dd")
      : "";
    if (
      editTitle.trim() &&
      (editTitle !== todo.title ||
        editDesc !== todo.description ||
        formattedDueDate !== todo.due_date)
    ) {
      onUpdate(todo.id, {
        title: editTitle,
        description: editDesc,
        due_date: formattedDueDate,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDesc(todo.description || "");
    setEditDueDate(todo.due_date ? new Date(todo.due_date) : undefined);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 p-4 rounded-lg bg-card border border-border transition-all hover:shadow-sm",
        todo.is_completed && "opacity-70",
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.is_completed}
          onCheckedChange={(checked) => onToggle(todo.id, checked as boolean)}
          className="border-primary data-[state=checked]:bg-primary"
        />

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="h-10 px-3 bg-input border-border focus:border-primary"
                placeholder="Title"
                autoFocus
              />
              <Textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="bg-input border-border focus:border-primary"
                placeholder="Description"
              />
              <div className="flex items-center gap-2">
                <CDatePicker
                  value={editDueDate}
                  onChange={setEditDueDate}
                  placeholder="Due date"
                  className="flex-1"
                  closeOnSelect
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-accent hover:bg-accent/10"
                  onClick={handleUpdate}
                >
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-destructive hover:bg-destructive/10"
                  onClick={handleCancel}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <span
                className={cn(
                  "text-foreground font-semibold text-lg transition-all block",
                  todo.is_completed && "line-through text-muted-foreground",
                )}
              >
                {todo.title}
              </span>
              {todo.description && (
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {todo.description}
                </p>
              )}
              {todo.due_date && (
                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mt-2">
                  <CalendarIcon className="h-3.5 w-3.5 opacity-70" />
                  <span className="opacity-70">Due:</span>
                  <span>{formattedDate(todo.due_date, "PPP")}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 self-start pt-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-primary hover:text-primary hover:bg-secondary/20"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
