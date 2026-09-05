const API_URL = import.meta.env.VITE_LIBRARIAN_SERVICES_API_URL;

async function librarian_services() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();

  return data;
}

export default librarian_services;