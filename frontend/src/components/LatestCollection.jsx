import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Tittle';
import ProductItem from './ProductItem';

const LatestCollection = () => {

const {products}= useContext(ShopContext)
const[latestProducts,setLatestProducts]=useState([]);

useEffect(()=>{
    setLatestProducts(products.slice(0,10));
},[products])

console.log(products);


  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Tittle text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            "Unveiling the latest trends: Our new collection is here to redefine your style with timeless elegance and bold designs. Shop now and step into fashion that speaks your story!"</p>
        </div>

        {/* Rendring products */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
             
             latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
             ))

            }
        </div>




    </div>
  )
}

export default LatestCollection