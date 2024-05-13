import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Table } from "antd";

const { Content } = Layout;

const ProfilePage = () => {
  // State to hold user details
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Fetch user details from wherever they are stored (e.g., backend API)
    // For demonstration, assuming userDetails is fetched from localStorage
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    setUserDetails({ userName: storedUserName, userEmail: storedUserEmail });
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  // Define data for the table
  const data = [
    {
      key: "1",
      attribute: "Username",
      value: userDetails.userName,
    },
    {
      key: "2",
      attribute: "Email",
      value: userDetails.userEmail,
    },
  ];

  return (
    <Layout className="layout">
      <Content style={{ padding: "50px" }}>
        <Row justify="center">
          <Col span={12}>
            <Card title="Profile" style={{ textAlign: "center" }}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="middle"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
