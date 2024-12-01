
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../components/Tittle';
import axios from 'axios';

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);

  const[orderData,setOrderData] =useState([])

  // const loadOrderData=async()=>{

  //   try {

  //     if(!token){
  //       return null
  //     }
  
  //     const response =await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
  //     console.log(response.data);
      
      
  //   } catch (error) {
      
  //   }
  // }

  // useEffect(()=>{
  //   loadOrderData()
  // },[token])

  const loadOrderData = async () => {
    try {
        if (!token) {
            console.warn("Token is not available");
            return null;
        }

        console.log("Token:", token);

        const response = await axios.post(
            `${backendUrl}/api/order/userorders`,
            {}, // Empty payload
            { headers: { Authorization: `Bearer ${token}` } } // Correct header format
        );

        if(response.data.success){
          let allOrdersItem=[]
          response.data.orders.map((order)=>{
            order.items.map((item)=>{
               item['status'] =order.status
               item['payment'] =order.payment
               item['paymentmethod'] =order.paymentMethod
               item['date'] =order.date

               allOrdersItem.push(item)
            })
          })
          setOrderData(allOrdersItem.reverse());
        }
        
        

        if (!response.data.success) {
            console.error("Failed to fetch orders:", response.data.message);
            return;
        }

        // Process and use response data as needed
        const orders = response.data.orders;
        console.log("User Orders:", orders);
    } catch (error) {
        console.error("Error loading order data:", error.response?.data || error.message);
    }
};

useEffect(() => {
    loadOrderData();
}, [token]);



  


  return (
    <div className="border-t pt-10 md:pt-16">
      <div className="text-2xl">
        <Tittle text1="MY" text2="ORDERS" />
      </div>

      <div className="mt-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t last:border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-4 md:gap-6 text-sm md:text-base">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover"
                src={item.image[0]}
                alt={item.name}
              />

              <div>
                <p className="font-medium">{item.name}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700">
                  <p >
                    {currency} {item.price}
                  </p>
                  <p className="whitespace-nowrap">Quantity: {item.quantity}</p>
                  <p className="whitespace-nowrap">Size: {item.size}</p>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Date: <span>{new Date (item.date).toDateString()}</span>
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Payment: <span>{item.paymentmethod}</span>
                </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
            <div className='flex items-center gap-2'>
              <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
              <p className='text-sm md:text-base'>{item.status}</p>

            </div>
            <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
