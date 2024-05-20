import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskForm from "./TaskForm";

describe("TaskForm component", () => {
  it("submits the form with input value when button is clicked", () => {
    const mockOnFormSubmit = jest.fn();

    render(<TaskForm userId={1} onFormSubmit={mockOnFormSubmit} />);

    const input = screen.getByPlaceholderText("Enter task to be done");
    fireEvent.change(input, { target: { value: "Test Task" } });

    const button = screen.getByText("Add Task");
    fireEvent.click(button);

    expect(mockOnFormSubmit).toHaveBeenCalledWith({
      title: "Test Task",
      completed: false,
      userId: 1,
    });
  });

  it("resets the form after submission", () => {
    const mockOnFormSubmit = jest.fn();

    render(<TaskForm userId={1} onFormSubmit={mockOnFormSubmit} />);

    const input = screen.getByPlaceholderText("Enter task to be done");
    fireEvent.change(input, { target: { value: "Test Task" } });

    const button = screen.getByText("Add Task");
    fireEvent.click(button);

    expect(input.value).toBe(""); // Check if input value is empty after form submission
  });
});
