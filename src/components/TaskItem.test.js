// TaskItem.test.js
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "./TaskItem";

describe("TaskItem component", () => {
  const task = {
    id: 1,
    title: "Test task",
    completed: false,
  };

  const mockOnTaskRemoval = jest.fn();
  const mockOnTaskToggle = jest.fn();
  const mockOnTaskUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders task item", () => {
    render(
      <TaskItem
        task={task}
        onTaskRemoval={mockOnTaskRemoval}
        onTaskToggle={mockOnTaskToggle}
        onTaskUpdate={mockOnTaskUpdate}
      />
    );
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });

  it("displays edit modal when edit button is clicked", () => {
    render(
      <TaskItem
        task={task}
        onTaskRemoval={mockOnTaskRemoval}
        onTaskToggle={mockOnTaskToggle}
        onTaskUpdate={mockOnTaskUpdate}
      />
    );
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  it("updates task title when edited and submitted", () => {
    render(
      <TaskItem
        task={task}
        onTaskRemoval={mockOnTaskRemoval}
        onTaskToggle={mockOnTaskToggle}
        onTaskUpdate={mockOnTaskUpdate}
      />
    );
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByPlaceholderText("Edit task title"), {
      target: { value: "Updated task" },
    });
    fireEvent.click(screen.getByText("OK"));
    expect(mockOnTaskUpdate).toHaveBeenCalledWith({
      ...task,
      title: "Updated task",
    });
  });

  it("toggles task completion when switch is toggled", () => {
    render(
      <TaskItem
        task={task}
        onTaskRemoval={mockOnTaskRemoval}
        onTaskToggle={mockOnTaskToggle}
        onTaskUpdate={mockOnTaskUpdate}
      />
    );
    fireEvent.click(screen.getByRole("switch"));
    expect(mockOnTaskToggle).toHaveBeenCalledWith(task);
  });
});
