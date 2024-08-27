import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

const Home = () => {

  const addToCardHandler = () => {

  }

  return (
    <div className="home">
      <section></section>
      <h1>Latest Products
        <Link to={'/search'} className="findmore">More</Link>
      </h1>
      <main>
        <ProductCard price={23} productId="sdcasdc" name="Macbook" stock={343} photo="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-spacegray-config-202306?wid=840&hei=508&fmt=jpeg&qlt=90&.v=1684340991372" handler={addToCardHandler} />
      </main>
    </div>
  )
}

export default Home