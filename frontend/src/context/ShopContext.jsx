// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";


// export const ShopContext=createContext();

// // by context file we can use any function in any components

// const ShopContextProvider=(props)=>{

//     const currency='₹';
//      const delivery_fee=10
//      const [search,setSearch]=useState('')
//      const[showSearch,setShowSearch]=useState(false)
//      const[cartItems,setCartItems] =useState({});

//      const addToCart =async(itemId,size)=>{

//         let cartData =structuredClone(cartItems)

//         if(cartData[itemId]){
//             if(cartData[itemId][size]){
//                 cartData[itemId]+=1;

//             }else{
//                 cartData[itemId][size]=1;
//             }
//         }else{
//             cartData[itemId]={};
//             cartData[itemId][size]=1;
//         }
//         setCartItems(cartData)
//      }
  
//      useEffect(()=>{
//         console.log(cartItems);
        
//      },[cartItems])

    
 
//     const value={
//         products,
//         currency,
//         delivery_fee,
//         search,
//         setSearch,
//         showSearch,
//         setShowSearch,
//         cartItems,addToCart


//     }

//     return (

//         <ShopContext.Provider value={value}>

//             {props.children}
//         </ShopContext.Provider>
//     )

// }

// export default ShopContextProvider;







import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

// Context file to share state and functions across components
const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const[products,setProducts] =useState([])
    const[token,setToken]=useState("")
    const navigate=useNavigate();

   
    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error('Select Product Size')
        }
       
        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) {
           
            cartData[itemId] = {};
        }

       
        if (cartData[itemId][size]) {
           
            cartData[itemId][size] += 1;
        } else {
           
            cartData[itemId][size] = 1;
        }

       
        setCartItems(cartData);
          

        // //integrating cartAPI in frontend
        // if(token){
        //     try {

        //       const response=  await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})

        //       if(response.data.success){
        //         toast.success(response.data.message)
        //       }

        //     } catch (error) {
        //         console.log(error);
        //         toast.error(error.message)
                
        //     }
        // }


        if (token) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } } // Correct format
                );
        
                if (response.data.success) {
                    toast.success(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || 'Something went wrong');
            }
        } else {
            toast.error("User not authenticated. Please log in.");
        }
        
    };

  
     const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item]
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
     }




    //  const updateQuantity =async (itemId,size,quantity)=>{

    //     let cartData =structuredClone(cartItems);
    //     cartData[itemId][size]=quantity;
    //     setCartItems(cartData)

    //     //Integrating  Upating cartAPI

    //     if(token){
    //         try {
                
    //         await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})

    //         } catch (error) {
    //             console.log(error);
    //             toast.error(error.response?.data?.message || 'Something went wrong');
    //         }
            
    //     }


    
    //  }


    const updateQuantity = async (itemId, size, quantity) => {
        // Clone the cart data and update the quantity locally
        const updatedCartData = structuredClone(cartItems);
        updatedCartData[itemId][size] = quantity;
        setCartItems(updatedCartData);
    
        // Integrate with the updateCart API
        if (!token) {
            toast.error("User is not authenticated");
            return;
        }
    
        try {
            // Make the API call to update the cart
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity },
                { headers: { Authorization: `Bearer ${token}` } } // Use Bearer token format
            );
    
            // Check the response for success
            if (response.data.success) {
                toast.success("Cart updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update cart");
            }
        } catch (error) {
            console.error("Error updating cart:", error);
            const errorMessage =
                error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage);
    
            // Optional: Rollback the local cart data in case of an error
            const rollbackCartData = structuredClone(cartItems);
            rollbackCartData[itemId][size] = cartItems[itemId][size];
            setCartItems(rollbackCartData);
        }
    };
    





     const getCartAmount=()=>{

        let totalAmount=0;
         for(const items in cartItems){
            let itemInfo= products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalAmount +=itemInfo.price * cartItems[items][item]
                    }
                    
                } catch (error) {
                    
                }
            }
         }
         return totalAmount
     }




    const getProductsData=async()=>{
        try {
            
          const response=await axios.get(backendUrl+'/api/product/list')
           if(response.data.success){
            setProducts(response.data.products)
           } else{
            toast.error(response.data.error)
           }
            

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

//   const getUserCart =async(token)=>{
//     try {
//         const response= await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
//          if(response.data.success){
//             setCartItems(response.data.cartData)
//          }

//     } catch (error) {
//         console.log(error);
//         toast.error(error.message)
//     }
//   }


const getUserCart = async (token, userId) => {
    try {
        // Make the POST request with token in headers and userId in body
        const response = await axios.post(
            backendUrl + '/api/cart/get',
            { userId }, // Include userId in the request body
            { headers: { Authorization: `Bearer ${token}` } } // Standard Bearer token format
        );

        // Check if the response indicates success
        if (response.data.success) {
            setCartItems(response.data.cartData);
        } else {
            toast.error(response.data.message || "Failed to fetch cart data");
        }
    } catch (error) {
        // Use detailed error information if available
        console.error("Error fetching cart data:", error);
        const errorMessage =
            error.response?.data?.message || "Something went wrong";
        toast.error(errorMessage);
    }
};

  

   
    useEffect(()=>{
      getProductsData()
    },[])

 useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
        
    }
 },[token])


  
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,token,
        setCartItems
    };

    
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

