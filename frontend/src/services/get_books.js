const API_URL = import.meta.env.VITE_GET_BOOKS_API_URL;

async function get_books() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  

  return data.books;
}

export default get_books;