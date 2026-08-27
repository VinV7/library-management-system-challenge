const API_URL = import.meta.env.VITE_UPDATE_BOOK_URL;

async function update_book(body) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Update failed");
    }

    return data;
}

export default update_book;