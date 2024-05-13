const baseUrl = `${process.env.REACT_APP_API_URL}/api/Task`;

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const loadTasks = (userId) => {
  const token = getToken();
  return fetch(`${baseUrl}?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        throw new Error("Failed to load tasks!!Please try again");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error loading tasks:", error);
      throw error;
    });
};

export const createTask = (task) => {
  const token = getToken();
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        throw new Error("Failed to create task!!Please try again");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error creating task:", error);
      throw error;
    });
};

export const updateTask = (task) => {
  const token = getToken();
  return fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        throw new Error("Failed to update task!!Please try again");
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error updating task:", error);
      throw error;
    });
};

export const deleteTask = (id) => {
  const token = getToken();
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        throw new Error("Failed to delete task!!Please try again");
      }
      console.log("Task deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      throw error;
    });
};
