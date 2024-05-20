import React, { useEffect, useState, useCallback } from "react";
import {
  Tabs,
  Layout,
  Row,
  Col,
  message,
  Dropdown,
  Menu,
  Form,
  Input,
  Button,
} from "antd";
import {
  LogoutOutlined,
  EllipsisOutlined,
  UserOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TaskTab from "./TaskTab";
import TaskForm from "./TaskForm";
import {
  createTask,
  deleteTask,
  loadTasks,
  updateTask,
} from "../services/TaskService";
import "./TaskList.css";

const { TabPane } = Tabs;
const { Content } = Layout;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeSort, setActiveSort] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      refresh(userId);
    }
  }, [userId]);

  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);

  const refresh = useCallback(async (userId) => {
    try {
      const data = await loadTasks(userId);
      setTasks(data);
      setActiveTasks(data.filter((task) => !task.completed));
      setCompletedTasks(data.filter((task) => task.completed));
    } catch (error) {
      message.error(error.message);
    }
  }, []);

  const handleFormSubmit = (task) => {
    createTask(task)
      .then(() => {
        message.success("Task added!");
        refresh(userId);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleRemoveTask = (task) => {
    deleteTask(task.id)
      .then(() => {
        refresh(userId);
        message.warning("Task deleted");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleToggleTaskStatus = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask)
      .then(() => {
        refresh(userId);
        message.info("Task status updated");
      })
      .catch(() => {
        message.error("Failed to update task status. Please try again.");
      });
  };

  const handleTaskUpdate = (updatedTask) => {
    updateTask(updatedTask)
      .then(() => {
        refresh(userId);
        message.success("Task updated!");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const handleSignOut = () => {
    window.location.href = "/";
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    setUserId(null);
    setUserName("");
    console.log("Signing out...");
  };

  const clearSortFilters = () => {
    setSortedTasks(tasks);
    setActiveSort(null);
  };

  const menu = (
    <Menu style={{ minWidth: "120px" }}>
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => {
          window.open("/profile", "_blank");
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="signout"
        icon={<LogoutOutlined />}
        onClick={handleSignOut}
        style={{ textAlign: "center" }}
      >
        Sign out
      </Menu.Item>
    </Menu>
  );

  const filterTasks = (tasks, keyword) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const clearSearch = () => {
    setSearchKeyword("");
  };

  const sortTasks = (order) => {
    const sorted = [...sortedTasks].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (order === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });
    setSortedTasks(sorted);
    setSortOrder(order);
  };

  const toggleSort = (order) => {
    if (activeSort === order) {
      // If the sort button is already active, reset sorting
      setSortedTasks(tasks);
      setActiveSort(null);
    } else {
      sortTasks(order);
      setActiveSort(order);
    }
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px", position: "relative" }}>
        <div className="tasklist">
          <Row>
            <Col span={14} offset={5}>
              <h1>Welcome {userName}!!!Your list of tasks are here</h1>
              <TaskForm userId={userId} onFormSubmit={handleFormSubmit} />
              <Form.Item className="search-bar" style={{ width: "200px" }}>
                <Input
                  placeholder="Search tasks..."
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  value={searchKeyword}
                  autoFocus
                  prefix={
                    <SearchOutlined
                      style={{ color: "rgba(0,0,0,.25)", paddingRight: "6px" }}
                    />
                  }
                  addonAfter={
                    searchKeyword && (
                      <Button type="link" onClick={clearSearch}>
                        X
                      </Button>
                    )
                  }
                />
              </Form.Item>
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <EllipsisOutlined
                      style={{ fontSize: "24px", transform: "rotate(90deg)" }}
                    />
                  </a>
                </Dropdown>
              </div>
              <div
                style={{
                  margin: "10px 0",
                  float: "right",
                  position: "relative",
                  top: "-60px",
                  left: "100px",
                }}
              >
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="sortAZ"
                        onClick={() => toggleSort("asc")}
                        style={{
                          fontWeight: activeSort === "asc" ? "bold" : "normal",
                        }}
                      >
                        Sort A-Z by task name
                      </Menu.Item>
                      <Menu.Item
                        key="sortZA"
                        onClick={() => toggleSort("desc")}
                        style={{
                          fontWeight: activeSort === "desc" ? "bold" : "normal",
                        }}
                      >
                        Sort Z-A by task name
                      </Menu.Item>
                      <Menu.Item
                        key="clearFilters"
                        onClick={clearSortFilters}
                        style={{ fontWeight: "normal" }}
                      >
                        Clear Sort Filters
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button>
                    Sort By <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <Tabs className="tab-spacing" defaultActiveKey="all">
                <TabPane tab="All" key="all">
                  <TaskTab
                    tasks={filterTasks(sortedTasks, searchKeyword)}
                    onTaskToggle={handleToggleTaskStatus}
                    onTaskRemoval={handleRemoveTask}
                    onTaskUpdate={handleTaskUpdate}
                  />
                </TabPane>
                <TabPane tab="Active" key="active">
                  <TaskTab
                    tasks={filterTasks(activeTasks, searchKeyword)}
                    onTaskToggle={handleToggleTaskStatus}
                    onTaskRemoval={handleRemoveTask}
                    onTaskUpdate={handleTaskUpdate}
                  />
                </TabPane>
                <TabPane tab="Completed" key="complete">
                  <TaskTab
                    tasks={filterTasks(completedTasks, searchKeyword)}
                    onTaskToggle={handleToggleTaskStatus}
                    onTaskRemoval={handleRemoveTask}
                    onTaskUpdate={handleTaskUpdate}
                  />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default TaskList;
