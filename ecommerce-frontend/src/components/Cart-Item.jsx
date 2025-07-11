import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartItems = ({ cartItem, index }) => {
  const { productId, name, photo, price, quantty } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>

      <div>
        <button>-</button>
        <p>{quantty}</p>
        <button>+</button>
      </div>

      <button>
        <FaTrash />
      </button>

    </div>
  )
}

export default CartItems