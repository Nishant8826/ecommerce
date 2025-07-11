import { FaPlus } from "react-icons/fa"

const server = 'http://localhost:3000/'

const ProductCard = ({ productId, name, photo, stock, price, handler }) => {
    return (
        <div className="productcard">
            <img src={photo} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>

            <div>
                <button onClick={handler}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductCard