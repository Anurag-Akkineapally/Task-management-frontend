import React from "react";
import { render, screen } from "@testing-library/react";
import TaskTab from "./TaskTab";

describe("<TaskTab />", () => {
  it("renders without crashing", () => {
    render(<TaskTab />);
  });

  it("renders List with empty message when no tasks are provided", () => {
    render(<TaskTab />);
    expect(screen.getByText("There's nothing to do")).toBeInTheDocument();
  });

  it("renders correct number of TaskItems", () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
      { id: 3, title: "Task 3", completed: false },
    ];
    render(<TaskTab tasks={tasks} />);
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it("passes correct props to TaskItem component", () => {
    const tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];
    const onTaskRemoval = jest.fn();
    const onTaskToggle = jest.fn();
    const onTaskUpdate = jest.fn();
    render(
      <TaskTab
        tasks={tasks}
        onTaskRemoval={onTaskRemoval}
        onTaskToggle={onTaskToggle}
        onTaskUpdate={onTaskUpdate}
      />
    );

    tasks.forEach((task, index) => {
      expect(screen.getAllByTestId("task-item")[index]).toHaveAttribute(
        "taskid",
        String(task.id)
      );
    });
  });

  it("renders pagination with correct configuration", () => {
    render(<TaskTab />);
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
    expect(pagination).toHaveAttribute("aria-label", "pagination");
  });
});
