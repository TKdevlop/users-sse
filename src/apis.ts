const headers = new Headers();
headers.set("Authorization", "Basic " + btoa("test" + ":" + "user"));
headers.set("Content-Type", "application/json");
export const getUsersApi = async () => {
  try {
    const res = await fetch("/api/users", {
      headers,
    });
    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, data: e.message };
  }
};

export const getUserApi = async (userId) => {
  try {
    const res = await fetch(`/api/users/${userId}`, {
      headers,
    });
    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, data: e.message };
  }
};

export const addUserApi = async (data) => {
  try {
    const res = await fetch("/api/users", {
      headers,
      method: "POST",
      body: JSON.stringify(data),
    });

    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, data: e.message };
  }
};

export const editUserApi = async ({ _id, ...data }) => {
  try {
    const res = await fetch(`/api/users/${_id}`, {
      headers,
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return { success: true, data: await res.json() };
  } catch (e) {
    return { success: false, data: e.message };
  }
};

export const deleteUserApi = async ({ _id }) => {
  try {
    await fetch(`/api/users/${_id}`, {
      headers,
      method: "DELETE",
    });

    return { success: true };
  } catch (e) {
    return { success: false, data: e.message };
  }
};
