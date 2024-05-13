import React from "react";
import { List } from "antd";
import TaskItem from "./TaskItem";

const TaskTab = ({ tasks = [], onTaskRemoval, onTaskToggle, onTaskUpdate }) => {
  return (
    <List
      locale={{ emptyText: "There's nothing to do" }}
      dataSource={tasks || []}
      renderItem={(task) => (
        <TaskItem
          key={task.id} // Ensure unique key for each TaskItem
          task={task}
          onTaskRemoval={onTaskRemoval}
          onTaskToggle={onTaskToggle}
          onTaskUpdate={onTaskUpdate}
        />
      )}
      pagination={{
        position: "bottom",
        pageSize: 15,
      }}
    />
  );
};

export default TaskTab;
