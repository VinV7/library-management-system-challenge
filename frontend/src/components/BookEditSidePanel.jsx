function BookEditSidePanel({ panelOpen }) {
    return (
      <div
        className={`w-96 bg-white transition-all duration-300 min-h-0 overflow-y-auto ${
          panelOpen ? "block" : "hidden"
        }`}
      >

      </div>
    )
}

export default BookEditSidePanel