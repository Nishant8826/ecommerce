import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItems from "../components/Cart-Item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "sdcsdc",
    name: "Macbook",
    price: "23234",
    stock: "10",
    quantty: "3",
    photo: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTF5lgmxR1a6b-qtP9f-eMPbK0YMBfnqqwDfqozhI06vF-Zc5YxdPlNOgvUIrpqAwoMA0Y_Die_937n8Am5WWKI5CCUOspHUUYCROtXSsbW"
  }

];
const subtotal = 3423;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 104;
const discount = 34;
const total = subtotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidCouponCode, setIsValidCoupenCode] = useState(false);

  useEffect(() => {
    Math.random() > 0.5 ? setIsValidCoupenCode(true) : setIsValidCoupenCode(false);
  }, [couponCode])

  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i, idx) => <CartItems cartItem={i} index={idx} />) : <h1>No Items added</h1>
        }
      </main>

      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>Discount : <em className="red"> - ₹{discount}</em></p>
        <p><b>Total : ₹{total}</b></p>
        <input placeholder="Coupon Code" type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        {
          couponCode && (
            isValidCouponCode ? (<span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>) : (<span className="red">
              Invalid Coupon <VscError />
            </span>)
          )
        }

        {cartItems.length > 0 && (
          <Link to={'/shipping'}>Checkout</Link>
        )}
      </aside>
    </div>
  )
}

export default Cart