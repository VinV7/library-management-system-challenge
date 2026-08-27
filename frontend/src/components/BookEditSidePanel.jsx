// BookEditSidePanel.jsx

// Main Imports
import { useState, useEffect } from "react";

// Components Import
import { CloseIcon, AddIcon } from "./SVGs";
import Genre from "./Genre";

// File Imports
import no_image_found from "../assets/no_img_available.png";

// Service
import update_book from "../services/update_book";

const genresss = ['Sci-Fi', 'Computer', 'Fantasy', 'Science', 'Adventure'];

function BookEditSidePanel({ panelOpen, setPanelOpen, bookData, onUpdated }) {
  // Variable useStates
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [stock, setStock] = useState(0);
  const [availability, setAvailability] = useState(false);
  const [releaseDate, setReleaseDate] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState([]);
  const [imgLink, setImgLink] = useState("");

  // Functional useStates
  const [addGenreBtn, setAddGenreBtn] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(bookData?.title || "");
    setIsbn(bookData?.isbn || "");
    setStock(bookData?.stock || 0);
    setAvailability(Boolean(bookData?.availability));
    setReleaseDate(bookData?.release_date || "");
    setAuthor(bookData?.author || "");
    setGenres(bookData?.categories || []);
    setImgLink(bookData?.image_link || "");
    setError("");
  }, [bookData]);

  if (!bookData) return null;

  const removeGenre = (genre) => {
    setGenres(genres.filter((g) => g !== genre));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const updated = await update_book({
        id: bookData.id,
        title: title,
        isbn: isbn,
        stock: Number(stock),
        availability: availability ? 1 : 0,
        release_date: releaseDate,
        author: author,
        categories: genres,
        image_link: imgLink,
      });

      onUpdated?.(updated.book ?? updated);
      setPanelOpen();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`
        w-96 px-6 py-6
        bg-[#FBF8F3] border-l border-neutral-200 shadow-xl
        min-h-0 overflow-y-auto
        transition-all duration-300
        ${panelOpen === true ? "block" : "hidden"}
      `}
    >
      <div className="flex w-full h-10 justify-end items-center mb-4">
        <div
          className="
            flex items-center justify-center
            w-9 h-9 rounded-full
            text-neutral-500
            hover:text-neutral-800 hover:bg-neutral-200/70
            transition-colors duration-200
          "
          onClick={setPanelOpen}
        >
          <CloseIcon className="h-6 w-auto" />
        </div>
      </div>

      <div
        className="
          flex items-center justify-center
          w-full h-[420px]
          bg-white border border-neutral-200 rounded-2xl shadow-sm
          overflow-hidden
        "
      >
        <img
          src={imgLink || no_image_found}
          className="w-auto h-[380px] object-contain rounded-md shadow-lg"
        />
      </div>

      <div className="w-full h-5 mt-2">
        <input
          type="text"
          value={imgLink}
          onChange={(e) => setImgLink(e.target.value)}
          className="
            w-full h-full px-4
            bg-white border border-neutral-200 rounded-xl
            font-medium text-neutral-800
            outline-none
            transition-all duration-200
            focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200
          "
        />
      </div>

      <div className="w-full mt-7">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-600">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              {genres.map((genre) => (
                <Genre key={genre} text={genre} onRemove={() => removeGenre(genre)} />
              ))}
              <div className="flex flex-col justify-center">
                <div
                  className="w-fit group"
                  onClick={() => setAddGenreBtn(!addGenreBtn)}
                >
                  <AddIcon
                    className="
                      h-5 w-auto ml-2 p-0.5
                      text-neutral-600 border border-neutral-300 rounded-full
                      group-hover:border-black group-hover:text-black group-hover:bg-neutral-100
                      transition-colors
                    "
                  />
                </div>
                <div
                  className={`
                    flex flex-col mt-2 w-48 gap-1 p-1.5
                    bg-white border border-neutral-200 rounded-lg shadow-sm
                    ${addGenreBtn ? "block" : "hidden"}
                  `}
                >
                  {genresss.map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      className="
                        rounded-md px-2.5 py-1.5 text-left text-sm text-neutral-700
                        hover:bg-neutral-100 hover:text-black
                        transition-colors
                      "
                      onClick={() => {
                        if (!genres.includes(genre)) {
                          setGenres([...genres, genre]);
                          setAddGenreBtn(!addGenreBtn);
                        }
                      }}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center gap-2 flex-1">
              <label className="block text-sm font-medium text-neutral-600">
                Release Date
              </label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
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
          </div>

          <div>
            <div className="flex flex-col justify-center gap-2 flex-1">
              <label className="block text-sm font-medium text-neutral-600">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
          </div>

          <div className="flex w-full h-18 gap-5">
            <div className="flex flex-col justify-center items-center gap-2">
              <label className="block text-sm font-medium text-neutral-600">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min={0}
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

            <div className="flex flex-col justify-center gap-2 flex-1">
              <label className="block text-sm font-medium text-neutral-600">
                ISBN
              </label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
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

            <div className="flex flex-col justify-center items-center gap-2">
              <label className="block text-sm font-medium text-neutral-600">
                Availability
              </label>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
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
                ></div>
                <div
                  className="
                    absolute left-1 top-1
                    w-6 h-6
                    bg-white rounded-full shadow-md
                    transition-transform duration-200
                    peer-checked:translate-x-6
                  "
                ></div>
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full h-15 text-2xl font-medium text-white bg-orange-400 hover:bg-orange-500 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Updating..." : "Update"}
            </button>
            <span className="text-md font-extralight text-red-500">{error}</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookEditSidePanel;