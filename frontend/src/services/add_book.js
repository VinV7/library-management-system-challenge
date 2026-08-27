const API_URL = import.meta.env.VITE_ADD_BOOK_URL;

async function add_book(bookData) {
  const response = await fetch(API_URL, {
    method: "POST",
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

export default add_book;