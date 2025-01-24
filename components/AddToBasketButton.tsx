'use client'
import useBasketStore from '@/app/(store)/store';
import { Product } from '@/sanity.types';

import React, { useEffect, useState } from 'react';

interface AddToBasketButtonProps {
  product: Product;
  disabled: boolean
}

export const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({
  product, disabled
}) => {
    const {addItem, removeItem, getItemCount} = useBasketStore();
    const itemCount = getItemCount(product._id);

    const [isClinet, setIsClient] = useState(false);
    // to prevent hyrdratio error, useEffect is used
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClinet) {
        return null;
    }

  return (
    <div className='flex items-center justify-center space-x-2'>
        <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors 
        duration-200 ${itemCount === 0 ? 
            "bg-gray-200 cursor-not-allowed"
            : "bg-gray-300 hover:bg-gray-300"
        }`} 
        onClick={()=> removeItem(product._id)}
        disabled={itemCount === 0 || disabled}>

        <span className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>
            -</span>
        </button>
        <span className='w-8 h-8 text-center font-semibold'>{itemCount}</span>
        <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
        duration-200 ${disabled ?
                "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={()=>addItem(product)}
            disabled={disabled}
            >
                <span className='text-xl font-bold text-white'>+</span>
        </button>
    </div>
  );
};