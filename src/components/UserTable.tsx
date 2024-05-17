import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// {
// 	"_id": "-nXOY8YE-Cjar-p50siY",
// 	"firstName": "Default",
// 	"lastName": "User",
// 	"email": "testuser@gobodhi.com",
// 	"password": "somestring",
// 	"phoneNumber": "+14444444444",
// 	"role": "administrator",
// 	"preferences": {
// 		"receiveEmails": true
// 	},
// 	"createdById": "test",
// 	"createdAtDate": "2024-05-01T11:40:20.713Z",
// 	"updatedById": "test",
// 	"updatedAtDate": "2024-05-01T11:40:20.713Z"
// },

import { Checkbox, Table } from "antd";

export default function UserTable({ users, setSelectedUser, deleteUser }) {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email Allowed",
      dataIndex: "receiveEmails",
      key: "receiveEmails",
      render: (receiveEmails) => <Checkbox checked={receiveEmails} />,
    },
    {
      title: "Notification Allowed",
      dataIndex: "receiveNotifications",
      key: "receiveNotifications",
      render: (receiveNotifications) => (
        <Checkbox checked={receiveNotifications} />
      ),
    },
    //   { title: "preferences", dataIndex: "preferences", key: "preferences" },
    { title: "createdById", dataIndex: "createdById", key: "createdById" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, user) => {
        return (
          user._id !== "-nXOY8YE-Cjar-p50siY" && (
            <>
              <EditOutlined
                onClick={() =>
                  setSelectedUser({ ...user, showModal: true, edit: true })
                }
                style={{ fontSize: 24, marginRight: 8 }}
              />
              <DeleteOutlined
                onClick={() => deleteUser(user)}
                style={{ fontSize: 24, marginRight: 8 }}
              />
            </>
          )
        );
      },
    },
  ];
  return (
    <Table
      style={{ width: "100%", overflowX: "auto" }}
      dataSource={users}
      columns={columns}
    />
  );
}
