const API_URL = import.meta.env.VITE_CHECK_COOKIES_API_URL;

async function cookie_check() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default cookie_check;