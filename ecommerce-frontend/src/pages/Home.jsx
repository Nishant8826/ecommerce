import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const addToCardHandler = () => {

    }
    return (
        <div className='home'>
            <section></section>

            <h1>
                Latest Products
                <Link>More</Link>
            </h1>

            <main>
                <ProductCard productId={"sdcsdc"} name={"Macbook"} price={"23234"} stock={"3"} handler={addToCardHandler} photo={"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTF5lgmxR1a6b-qtP9f-eMPbK0YMBfnqqwDfqozhI06vF-Zc5YxdPlNOgvUIrpqAwoMA0Y_Die_937n8Am5WWKI5CCUOspHUUYCROtXSsbW"} />
            </main>
        </div>
    )
}

export default Home