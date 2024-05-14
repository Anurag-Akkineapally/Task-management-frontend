import React from "react";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const TaskForm = ({ userId, onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      title: form.getFieldValue("title"),
      completed: false,
      userId: userId,
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="task-form"
    >
      <Row gutter={20}>
        <Col xs={17} sm={18} md={13} lg={15} xl={13}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please enter a task title." }]}
          >
            <Input placeholder="Enter task to be done" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={4} lg={2} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
