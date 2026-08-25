import { CloseIcon } from "./SVGs";
import Genre from "./Genre";
import no_image_found from "../assets/no_img_available.png";

function BookInfoSidePanel({ panelOpen, setPanelOpen, bookData }) {
  if (!bookData) return null;

  return (
    <div
      className={`
        w-96 px-6 py-6
        bg-[#FBF8F3] border-l border-neutral-200 shadow-xl
        min-h-0 overflow-y-auto
        transition-all duration-300
        ${panelOpen ? "block" : "hidden"}
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
            cursor-pointer
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
          src={bookData.img_link || no_image_found}
          alt={bookData.title}
          className="w-auto h-[380px] object-contain rounded-md shadow-lg"
        />
      </div>

      <div className="w-full mt-7 space-y-5">

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-600">
            Title
          </label>

          <div
            className="
              w-full min-h-12 px-4 py-3
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
            "
          >
            {bookData.title}
          </div>
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
            {bookData.book_categories?.map((genre) => (
              <Genre key={genre} text={genre} />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-600">
            Release Date
          </label>

          <div
            className="
              w-full h-12 px-3
              flex items-center
              bg-white border border-neutral-200 rounded-xl
              text-lg font-medium text-neutral-800
            "
          >
            {bookData.release_date}
          </div>
        </div>

        <div className="flex w-full gap-5">

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-neutral-600">
              Stock
            </label>

            <div
              className="
                w-20 h-12
                flex items-center justify-center
                bg-white border border-neutral-200 rounded-xl
                text-lg font-medium text-neutral-800
              "
            >
              {bookData.stock}
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label className="block text-sm font-medium text-neutral-600">
              ISBN
            </label>

            <div
              className="
                w-full h-12 px-3
                flex items-center
                bg-white border border-neutral-200 rounded-xl
                text-lg font-medium text-neutral-800
              "
            >
              {bookData.isbn}
            </div>
          </div>

        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-600">
            Availability
          </label>

          <div
            className="
              flex items-center justify-between
              w-full h-12 px-4
              bg-white border border-neutral-200 rounded-xl
            "
          >
            <span className="text-lg font-medium text-neutral-800">
              {bookData.availability ? "Available" : "Unavailable"}
            </span>

            <span
              className={`
                w-3 h-3 rounded-full
                ${bookData.availability
                  ? "bg-green-500"
                  : "bg-red-500"
                }
              `}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookInfoSidePanel;