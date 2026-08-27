const API_URL = import.meta.env.VITE_MEMBER_SERVICES_API_URL;

async function member_services() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch from server");
  }

  const data = await response.json();

  console.log(data)

  return data;
}

export default member_services;