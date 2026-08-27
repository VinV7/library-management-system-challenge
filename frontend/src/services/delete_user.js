const API_URL = import.meta.env.VITE_DELETE_USER_URL;

async function delete_user(body) {
    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(data.message || "Deletion Failed");
    }
}

export default delete_user;