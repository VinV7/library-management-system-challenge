const API_URL = import.meta.env.VITE_MASTLIB_SERVICES_API_URL;

async function master_library_services() {
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
  

  return data;
}

export default master_library_services;