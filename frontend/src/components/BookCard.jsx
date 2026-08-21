

function BookCard({ imgLink, title }) {
    return (
        <div className="flex flex-col w-48 h-64 rounded-lg border border-neutral-100 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="flex w-full h-40 items-center justify-center bg-neutral-50 px-4 py-2">
                <img
                    src={imgLink}
                    className="h-full w-auto object-contain rounded"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between px-3 py-3">
                <span className="font-lustria text-sm text-taupe-800 leading-snug line-clamp-2">
                    {title}
                </span>

                <button
                    type="button"
                    className="self-start w-full mt-2 px-3 py-1.5 rounded-md bg-orange-400 text-white text-xs font-medium hover:bg-orange-500 active:scale-95 transition-all duration-200 shadow-sm cursor-pointer"
                >
                    Edit
                </button>
            </div>
        </div>
    )
}

export default BookCard