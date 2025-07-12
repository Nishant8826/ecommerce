import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard";
import { getAllCategories, getAllProducts } from "../services/api";
import { domainUrl } from "../config/config";

const Search = () => {

  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [page, setPage] = useState(1);

  const addToCardHandler = () => { };

  const isPrevPage = page > 1;
  const isNextPage = page < totalPage;

  const getAllProduct = async () => {
    try {
      const query = { search, sort, maxPrice, category, page };
      const response = await getAllProducts(query)
      response.data?.succes ? setProducts(response.data?.result) : setProducts([]);
      response.data?.succes ? setTotalPage(response.data?.totalPage) : setTotalPage(0);

    } catch (error) {
      console.log('Error occured :', error);
    }
  }

  const getAllCategory = async () => {
    try {
      const response = await getAllCategories()
      response.data?.succes ? setCategories(response.data?.result) : setCategories([]);

    } catch (error) {
      console.log('Error occured :', error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  useEffect(() => {
    getAllProduct();
  }, [search, sort, maxPrice, category, page])

  return (
    <div className="product-search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="desc">(High to Low)</option>
            <option value="asc">(Low to High)</option>
          </select>
        </div>
        <div>
          <h4>Max Price :{maxPrice || ""}</h4>
          <input type="range" min={1000} max={1000000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {categories.length > 0 && (
              categories.map((cat) => (
                <option value={cat}>{cat.toUpperCase()}</option>
              ))
            )}
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
          <span>{page} of {totalPage}</span>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>

        </article>
      </main>

    </div>

  )
}

export default Search