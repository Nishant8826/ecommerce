import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { getLatestProducts } from '../services/api'
import { domainUrl } from '../config/config'

const Home = () => {
    const addToCardHandler = () => { }
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        const getLatestProduct = async () => {
            try {
                const response = await getLatestProducts()
                response.data?.succes ? setLatest(response.data?.result) : setLatest([]);

            } catch (error) {
                console.log('Error occured :', error);
            }
        }
        getLatestProduct();
    }, [])
    return (
        <div className='home'>
            <section></section>

            <h1>
                Latest Products
                <Link>More</Link>
            </h1>

            <main>
                {
                    latest.length > 0 ? latest.map((item, index) => (
                        <ProductCard productId={item._id} name={item.name} price={item.price} stock={item.stock} handler={addToCardHandler} photo={`${domainUrl}/${item.photo}`} />
                    )) : (
                        <p>No products available.</p>
                    )
                }
            </main>
        </div>
    )
}

export default Home