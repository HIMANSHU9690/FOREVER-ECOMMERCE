// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets'
// import Tittle from '../components/Tittle'
// import ProductItem from '../components/ProductItem'

// const Collection = () => {
//   const{products}= useContext(ShopContext)
//   const[showFilter,setShowFilter]= useState(false)
//   const[filterProducts,setFilterProducts]=useState([])
//   const[Category,setCategory] =useState([]);
//   const[subCategory,setSubCategory] =useState([]);

//   const toggleCategory=(e)=>{
//     if(Category.includes(e.target.value)){
//       setCategory(prev=>prev.filter(item=> item !== e.target.value))
//     }else{

//        setCategory(prev=>[...prev,e.target.value])
//     }
//   }

  
//   const toggleSubCategory=(e)=>{
//     if(subCategory.includes(e.target.value)){
//       setSubCategory(prev=>prev.filter(item=> item !== e.target.value))
//     }else{

//        setSubCategory(prev=>[...prev,e.target.value])
//     }
//   }

//   const applyFilter=()=>{

//      let productsCopy=products.slice();

//      if(Category.length>0){
//       productsCopy=productsCopy.filter(item=>Category.includes(item.Category))
//      }
//      setFilterProducts(productsCopy)
//   }

//   useEffect(()=>{
//     applyFilter();

//   },[Category,subCategory])




//   useEffect(()=>{
//     setFilterProducts(products)

//   },[])


//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
 
//       {/* Filter options */}
//       <div className='min-w-60'>
//         <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
//           <img className={`h-3 sm:hidden ${showFilter ?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
//         </p>
//         {/* Category fiter */}

//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ?'':'hidden'}m:block `}>
          
//           <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
//              </p>

//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
//              </p>

//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
//              </p>

//           </div>
//         </div>

//         {/* Subcategory filter */}

//         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ?'':'hidden'}m:block `}>
          
//           <p className='mb-3 text-sm font-medium'>TYPE</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Topwear
//              </p>

//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Botoomwear'} onChange={toggleSubCategory}  />Bottomwear
//              </p>

//              <p className='flex gap-2'>
//               <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}  />Winterwear
//              </p>

//           </div>
//         </div>

//       </div>

//       {/* Right Side */}

//       <div className='flex-1'>
//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//                 <Tittle text1={'ALL'} text2={'COLLECTIONS'}/>
//                 {/* product sort */}
//                 <select className='border-2 border-gray-300 text-sm px-2'>
                    
//                     <option value="relavent">Sort by: Relavent</option>
//                     <option value="low-high">Sort by: Low to High</option>
//                     <option value="high-low">Sort by: High to Low</option>
//                 </select>

//         </div>

//         {/* ALL products */}
           
//            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
             
//              {
               
//                filterProducts.map((item,index)=>(
//                 <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />

//                ))
//              }
//            </div>


//       </div>



//     </div>
//   )
// }

// export default Collection


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products ,search,showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products); // Set initial state with all products
  const [Category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const[sortType,setSortType]=useState('relavent')

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (Category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products;

    // creating logic for search bar
    if(showSearch && search){
     productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Filter by Category
    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) => Category.includes(item.category));
    }

    // Filter by SubCategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

   const sortProduct=()=>{
    let fpCopy=filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price -b.price)))
        break;

        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price -a.price)))
          break;
       
          default:
            applyFilter();
            break;
    }
   }
   



  useEffect(() => {
    applyFilter(); // Apply filter when Category or SubCategory changes
  }, [Category, subCategory, products,search,showSearch]);

  useEffect(()=>{
    sortProduct();
  },[sortType])



  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Men" onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Women" onChange={toggleCategory} />Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Kids" onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Topwear" onChange={toggleSubCategory} />Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Bottomwear" onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value="Winterwear" onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1="ALL" text2="COLLECTIONS" />
          {/* Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* ALL products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
