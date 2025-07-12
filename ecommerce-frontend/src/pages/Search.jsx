import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/api";
import { domainUrl } from "../config/config";

const Search = () => {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [page, setPage] = useState(1);

  const addToCardHandler = () => { };

  const isPrevPage = false;
  const isNextPage = true;

  const getAllProduct = async () => {
    try {
      const response = await getAllProducts()
      response.data?.succes ? setProducts(response.data?.result) : setProducts([]);

    } catch (error) {
      console.log('Error occured :', error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, [])

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
        <div className="search-product-list">
          {products.length > 0 ? products.map((item, index) => (
            <ProductCard productId={item._id} name={item.name} price={item.price} stock={item.stock} handler={addToCardHandler} photo={`${domainUrl}/${item.photo}`} />
          )) :
            <p>No products available.</p>}
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