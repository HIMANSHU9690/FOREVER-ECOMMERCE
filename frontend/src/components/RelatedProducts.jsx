// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import ProductItem from './ProductItem'
// import Tittle from './Tittle'

// const RelatedProducts = ({category,subCategory}) => {

//     const{products}= useContext(ShopContext)
//     const[related,setRelated]=useState([])

//     useEffect(()=>{
//         if(products.length>0){
//             let productsCopy =products.slice();

//             productsCopy=productsCopy.filter((item)=>category===item.category);
//             productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)

//            setRelated(productsCopy.slice(0,5));
            
//         }

//     },[products])


//   return (
//     <div  className='my-24'>
//         <div className='text-center text-3xl py-2'>
//             <Tittle text1={'RELATED'} text2={'PRODUCTS'} />
//         </div>

//         <div className='grid grid-cols sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//             {
//                 related.map((item,index)=>(
//                     <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}  />

//                 ))
//             }

//         </div>

//     </div>
//   )
// }

// export default RelatedProducts


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Tittle from './Tittle';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]);

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Tittle text1="RELATED" text2="PRODUCTS" />
            </div>

            <div className="grid grid-cols sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        to={`/product/${item._id}`} // Pass the link as a prop
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
