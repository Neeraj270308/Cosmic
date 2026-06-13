function SearchInput({
  searchTerm,
  setSearchTerm
}) {
  return (
    <input
      type="text"
      placeholder="Search bike"
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />
  );
}

export default SearchInput;