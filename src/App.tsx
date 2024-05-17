import { useEffect, useState } from "react";
import "./App.css";
import UserTable from "./components/UserTable";
import useGetUsers from "./hooks/useGetUsers";
import { Button, message } from "antd";
import UserAddEditStepperModal from "./components/UserAddEditStepperModal";
import { addUserApi, deleteUserApi, editUserApi } from "./apis";

function App() {
  const [users, setUsers] = useGetUsers();
  const [selectedUser, setSelectedUser] = useState<any>({
    receiveEmails: false,
    receiveNotifications: false,
  });
  const addUser = async () => {
    const { success, data } = await addUserApi(selectedUser);
    if (success) {
      setSelectedUser({});
    } else {
      message.error(data);
    }
  };
  const editUser = async () => {
    const { success, data } = await editUserApi(selectedUser);
    if (success) {
      setSelectedUser({});
    } else {
      message.error(data);
    }
  };
  const deleteUser = async (selectedUser) => {
    const { success, data } = await deleteUserApi(selectedUser);
    if (success) {
    } else {
      message.error(data);
    }
  };

  useEffect(() => {
    const sse = new EventSource("/api/users/events", {
      withCredentials: true,
    });
    function getRealtimeData({ data }) {
      // NOT ABLE TO FIND DEFAULT USER UPDATE EVENT IN PROVIDED DOCUMENT OR EVENT STREAM SO DIN"T PUT CODE TO UPDATE DEFAULT USER
      if (!data.action) return;
      switch (data.action) {
        case "updated":
          setUsers((users) =>
            users.map((user) => {
              if (user._id === data.resourceId) {
                return data.data;
              }
              return user;
            })
          );
          break;
        case "deleted":
          setUsers((users) =>
            users.filter((user) => user._id !== data.resourceId)
          );
          break;
        case "created":
          setUsers((users) => [...users, data.data]);
          break;
        default:
          break;
      }
    }
    sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);
  return (
    <>
      {/* custom css example */}
      <div
        style={{ display: "flex", justifyContent: "right", marginBottom: 10 }}
      >
        <Button
          onClick={() =>
            setSelectedUser({
              showModal: true,
            })
          }
          type="primary"
          size="large"
        >
          ADD USER
        </Button>
      </div>
      <UserTable
        users={users}
        setSelectedUser={setSelectedUser}
        deleteUser={deleteUser}
      />
      <UserAddEditStepperModal
        editUser={editUser}
        addUser={addUser}
        user={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
}

export default App;
