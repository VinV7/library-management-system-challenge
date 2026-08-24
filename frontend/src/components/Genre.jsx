function Genre({ text }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-neutral-300 bg-neutral-50 px-2.5 text-xs font-medium text-neutral-700">
      {text}
    </span>
  );
}

export default Genre;