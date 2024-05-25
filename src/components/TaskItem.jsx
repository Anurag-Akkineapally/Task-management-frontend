import React, { useState } from "react";
import {
  Tooltip,
  Tag,
  List,
  Button,
  Popconfirm,
  Switch,
  Modal,
  Input,
} from "antd";
import { CloseOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";

const TaskItem = ({ task, onTaskRemoval, onTaskToggle, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = () => {
    onTaskUpdate({ ...task, title: editedTitle });
    setIsEditing(false);
  };

  return (
    <List.Item
      actions={[
        <Tooltip
          title={task.completed ? "Mark as pending" : "Mark as completed"}
          key="toggle"
        >
          <Switch
            className="toggle-status"
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={task.completed}
            onChange={() => onTaskToggle(task)}
          />
        </Tooltip>,
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={handleEdit}
          key="edit"
          className="edit-button"
        >
          Edit
        </Button>,
        <Popconfirm
          title={"Are you sure you want to delete?"}
          onConfirm={() => onTaskRemoval(task)}
          key="delete"
        >
          <Button className="delete-button" type="primary" danger>
            Delete Task
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={task.id}
    >
      <div className="task-item" style={{ fontSize: "17px" }}>
        {task.title}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onOk={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
      >
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Edit task title"
        />
      </Modal>
    </List.Item>
  );
};

export default TaskItem;
