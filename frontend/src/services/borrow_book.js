const API_URL = import.meta.env.VITE_BORROW_API_URL;

async function borrow_book(bookData) {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add book.");
  }

  return data;
}

export default borrow_book;