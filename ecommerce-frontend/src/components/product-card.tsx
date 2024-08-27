import React from 'react';
import { ProductCardProps } from '../assets/interface';
import { FaPlus } from 'react-icons/fa';


const ProductCard: React.FC<ProductCardProps> = ({ productId, photo, name, price, stock, handler }) => {
    return (
        <div className='product-card'>
            <img src={`${photo}`} alt={name} />
            <p>{name}</p>
            <span>₹{price}</span>
            <div>
                <button onClick={() => handler()}><FaPlus /></button>
            </div>
        </div>
    );
};

export default ProductCard;
