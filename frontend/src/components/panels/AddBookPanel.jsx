// Main Imports
import { useState } from "react";

// Components Import
import { AddIcon } from "../SVGs";
import Genre from "../Genre";

const genresss = ["Sci-Fi", "Adventure", "Fantasy", "Epic", "Shounen"];

function AddBookPanel() {
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [stock, setStock] = useState(0);
  const [availability, setAvailability] = useState(false);
  const [genres, setGenres] = useState([]);

  const [addGenreBtn, setAddGenreBtn] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="">
      <form className="w-full h-full px-6 py-6 space-y-5 bg-white">
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
              <Genre key={genre} text={genre} />
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
            type="button"
            className="w-full h-15 text-2xl font-medium text-white bg-orange-400 hover:bg-orange-500 cursor-pointer"
          >
            Add Book
          </button>
          <span className="text-md font-extralight text-red-500">{error}</span>
        </div>
      </form>
    </div>
  );
}

export default AddBookPanel;