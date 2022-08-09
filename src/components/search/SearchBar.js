import "./SearchBar.css";

export default function SearchBar() {
  const searchItem = (event) => {
    event.preventDefault();
  };
  return (
    <div className="search-bar">
      <form onSumbit={searchItem}>
        <label htmlFor="search">Search</label>
        <input type="text" onChange={(event) => {}} required />
      </form>
    </div>
  );
}
