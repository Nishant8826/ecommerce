import { useState } from 'react'
import ProductCard from '../components/product-card';

const Search = () => {

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  const addToCardHandler = () => {

  }

  return (
    <div className='product-search-page'>
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ''}</h4>
          <input type='range' min={100} max={100000} value={maxPrice} onChange={(e) => e.target.value} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="">Sample 1</option>
            <option value="">Sample 2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input type="text" placeholder='Search by Name...' value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="search-product-list">
          <ProductCard price={23} productId="sdcasdc" name="Macbook" stock={343} photo="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-spacegray-config-202306?wid=840&hei=508&fmt=jpeg&qlt=90&.v=1684340991372" handler={addToCardHandler} />
        </div>

        <article>
          <button disabled={!isPrevPage} onClick={()=>setPage((prev) => prev - 1)}>Prev</button>
          <span>{page} of {4}</span>
          <button disabled={!isNextPage} onClick={()=>setPage((prev) => prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search