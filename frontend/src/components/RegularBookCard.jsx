// Components Import
import { InfoIcon } from "./SVGs";

// Services 
import borrow_book from "../services/borrow_book";

function BookCard({ imgLink, title, onClickBorrow, onClick }) {
  return (
    <div className="flex flex-col w-48 h-64 rounded-lg border border-neutral-100 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex w-full h-40 items-center justify-center bg-neutral-50 px-4 py-2">
        <img src={imgLink} className="h-full w-auto object-contain rounded" />
      </div>

      <div className="flex-1 flex flex-col justify-between px-3 py-3 border-t-1 border-neutral-200">
        <div className="w-full h-10">
          <span className="font-lustria text-sm text-taupe-800 leading-snug line-clamp-2">
            {title}
          </span>
        </div>

        <div className="flex mt-2 gap-3 items-center">
          <button
            type="button"
            className="self-start w-full px-3 py-1.5 rounded-md bg-green-400 text-white text-xs font-medium hover:bg-green-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
            onClick={onClickBorrow}
          >
            Borrow
          </button>
          <div onClick={onClick}>
            <InfoIcon className="w-auto h-6 text-neutral-500 hover:text-neutral-800 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
