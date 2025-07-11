import { useState } from "react"
import ProductCard from "../components/ProductCard";

const Search = () => {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);

  const addToCardHandler = () => { };

  const isPrevPage = false;
  const isNextPage = true;

  return (
    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">(High to Low)</option>
            <option value="desc">(Low to High)</option>
          </select>
        </div>
        <div>
          <h4>Max Price :{maxPrice || ""}</h4>
          <input type="range" min={100} max={10000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="camera">Camera</option>
            <option value="game">Game</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div>
          <ProductCard productId={"sdcsdc"} name={"Macbook"} price={"23234"} stock={"3"} handler={addToCardHandler} photo={"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTF5lgmxR1a6b-qtP9f-eMPbK0YMBfnqqwDfqozhI06vF-Zc5YxdPlNOgvUIrpqAwoMA0Y_Die_937n8Am5WWKI5CCUOspHUUYCROtXSsbW"} />
        </div>

        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>{page} of 4</span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>

        </article>
      </main>

    </div>

  )
}

export default Search