import { useEffect, useState } from "react";
import { getUsersApi } from "../apis";
import { message } from "antd";

export default function useGetUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const { success, data } = await getUsersApi();
      if (!success) {
        message.error(data);
      } else {
        setUsers(data as any[]);
      }
    })();
  }, []);
  return [users, setUsers];
}
