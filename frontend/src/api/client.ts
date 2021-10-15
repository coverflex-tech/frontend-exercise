const API_URL = "http://localhost:4000/api";

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
