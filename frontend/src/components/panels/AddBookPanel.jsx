import { useState } from "react";

import { AddIcon } from "../SVGs";
import Genre from "../Genre";

import add_book from "../../services/add_book";

const validGenres = [
  "Sci-Fi",
  "Computer",
  "Fantasy",
  "Science",
  "Adventure",
];

function AddBookPanel() {
  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    author: "",
    release_date: "",
    stock: 1,
    availability: false,
    genre: [],
    img_link: "",
  });

  const [addGenreBtn, setAddGenreBtn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGenre = (genre) => {
    if (!formData.genre.includes(genre)) {
      setFormData((prev) => ({
        ...prev,
        genre: [...prev.genre, genre],
      }));
    }

    setAddGenreBtn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!formData.title.trim()) {
        throw new Error("Title is required.");
      }

      if (!formData.author.trim()) {
        throw new Error("Author is required.");
      }

      if (!formData.isbn.trim()) {
        throw new Error("ISBN is required.");
      }

      if (!formData.release_date) {
        throw new Error("Release date is required.");
      }

      if (formData.genre.length === 0) {
        throw new Error("At least one genre is required.");
      }

      if (Number(formData.stock) < 1) {
        throw new Error("Stock must be at least 1.");
      }

      const bookData = {
        title: formData.title.trim(),
        isbn: Number(formData.isbn),
        author: formData.author.trim(),
        release_date: formData.release_date,
        stock: Number(formData.stock),
        availability: formData.availability,
        genre: formData.genre,
        img_link: formData.img_link.trim(),
      };

      const result = await add_book(bookData);

      console.log("Book added:", result);

      // Reset form after successful submission
      setFormData({
        title: "",
        isbn: "",
        author: "",
        release_date: "",
        stock: 1,
        availability: false,
        genre: [],
        img_link: "",
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="px-6 py-6 space-y-5 bg-white"
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-600">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="
              w-full h-12 px-4
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
              outline-none
              transition-all duration-200
              focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
            "
          />
        </div>

        {/* Genres */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-600">
            Genres
          </label>

          <div
            className="
              flex flex-wrap gap-2 p-3
              bg-white border border-neutral-200 rounded-xl
            "
          >
            {formData.genre.map((genre) => (
              <Genre key={genre} text={genre} />
            ))}

            <div className="flex flex-col justify-center relative">
              <div
                className="w-fit group cursor-pointer"
                onClick={() => setAddGenreBtn((prev) => !prev)}
              >
                <AddIcon
                  className="
                    h-5 w-auto ml-2 p-0.5
                    text-neutral-600 border border-neutral-300 rounded-full
                    group-hover:border-black group-hover:text-black
                    group-hover:bg-neutral-100
                    transition-colors
                  "
                />
              </div>

              <div
                className={`
                  absolute top-full left-0 z-10
                  flex flex-col mt-2 w-48 gap-1 p-1.5
                  bg-white border border-neutral-200 rounded-lg shadow-sm
                  ${addGenreBtn ? "block" : "hidden"}
                `}
              >
                {validGenres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    disabled={formData.genre.includes(genre)}
                    className="
                      rounded-md px-2.5 py-1.5 text-left text-sm
                      text-neutral-700
                      hover:bg-neutral-100 hover:text-black
                      disabled:text-neutral-300
                      disabled:hover:bg-white
                      transition-colors
                    "
                    onClick={() => handleAddGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Release Date */}
        <div className="flex flex-col justify-center gap-2">
          <label className="block text-sm font-medium text-neutral-600">
            Release Date
          </label>

          <input
            type="date"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            className="
              w-full h-12 px-3
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
              outline-none
              transition-all duration-200
              focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
            "
          />
        </div>

        {/* Author */}
        <div className="flex flex-col justify-center gap-2">
          <label className="block text-sm font-medium text-neutral-600">
            Author
          </label>

          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="
              w-full h-12 px-3
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
              outline-none
              transition-all duration-200
              focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
            "
          />
        </div>

        {/* Stock / ISBN / Availability */}
        <div className="flex w-full h-18 gap-5">
          {/* Stock */}
          <div className="flex flex-col justify-center items-center gap-2">
            <label className="block text-sm font-medium text-neutral-600">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min={1}
              className="
                w-16 h-12 px-3
                bg-white border border-neutral-200 rounded-xl
                text-lg font-medium text-neutral-800 text-center
                outline-none
                transition-all duration-200
                focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
              "
            />
          </div>

          {/* ISBN */}
          <div className="flex flex-col justify-center gap-2 flex-1">
            <label className="block text-sm font-medium text-neutral-600">
              ISBN
            </label>

            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="
                w-full h-12 px-3
                bg-white border border-neutral-200 rounded-xl
                text-lg font-medium text-neutral-800
                outline-none
                transition-all duration-200
                focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
              "
            />
          </div>

          {/* Availability */}
          <div className="flex flex-col justify-center items-center gap-2">
            <label className="block text-sm font-medium text-neutral-600">
              Availability
            </label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="sr-only peer"
              />

              <div
                className="
                  w-14 h-8
                  bg-neutral-300 rounded-full
                  peer-checked:bg-orange-400
                  transition-colors duration-200
                  peer-focus:ring-2 peer-focus:ring-neutral-200
                "
              />

              <div
                className="
                  absolute left-1 top-1
                  w-6 h-6
                  bg-white rounded-full shadow-md
                  transition-transform duration-200
                  peer-checked:translate-x-6
                "
              />
            </label>
          </div>
        </div>

        {/* Image Link */}
        <div className="flex flex-col justify-center gap-2">
          <label className="block text-sm font-medium text-neutral-600">
            Image Link
          </label>

          <input
            type="text"
            name="img_link"
            value={formData.img_link}
            onChange={handleChange}
            className="
              w-full h-12 px-3
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
              outline-none
              transition-all duration-200
              focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
            "
          />
        </div>

        {/* Submit */}
        <div className="flex flex-col justify-center items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-15
              text-2xl font-medium text-white
              bg-orange-400
              hover:bg-orange-500
              disabled:bg-neutral-300
              cursor-pointer
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Adding..." : "Add Book"}
          </button>

          {error && (
            <span className="text-md font-extralight text-red-500">
              {error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddBookPanel;