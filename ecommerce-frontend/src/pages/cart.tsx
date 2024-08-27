import React, { useEffect, useState } from 'react'
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/cart-items';
import { Link } from 'react-router-dom';

const cartItems = [{
  productId: 'sfadsdvger4',
  photo: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mba15-spacegray-config-202306?wid=840&hei=508&fmt=jpeg&qlt=90&.v=1684340991372',
  name: 'Macbook',
  price: 80000,
  quantity: 2,
  stock: 10
}];
const subtotal = 400;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 400;
const total = subtotal + tax + shippingCharges;

const Cart = () => {

  const [couponCode, setCouponCode] = useState<string>('');
  const [isValideCouponCode, setIsValideCouponCode] = useState<boolean>(false);


  useEffect(() => {

    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValideCouponCode(true);
      else setIsValideCouponCode(false);
    }, 1000)

    return () => {
      clearTimeout(timeOutID);
      setIsValideCouponCode(false);
    }

  }, [couponCode])

  return (
    <div className="cart">
      <main>

        {cartItems.length > 0 ? cartItems.map((i, idx) => (
          <CartItem key={idx} cartItem={i} />
        )) : <h1>No Items Added</h1>}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>Discount : <em className='red'>- ₹{discount}</em></p>
        <p><b>Total : ₹{total}</b></p>
        <input type="text" placeholder='Coupen Code' value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
        {
          couponCode && (
            isValideCouponCode ? (
              <span className='green'>₹{discount} off using the <code>{couponCode}</code></span>
            ) : (
              <span>Invalid Coupon Code <VscError /></span>
            )
          )
        }

        {
          cartItems.length > 0 && <Link to={'/shipping'}>Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart