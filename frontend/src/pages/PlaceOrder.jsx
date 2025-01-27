import React, { useContext, useState } from 'react'
import Tittle from '../components/Tittle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

 const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products}= useContext(ShopContext);
 const [method,setMethod]=useState('cod');

 const[formData,setFormData]= useState({
  firstName:'',
  lastName:'',
  email:'',
  street:"",
  city:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''
 })

 const onChangeHandler =(event)=>{
  const name=event.target.name
  const value =event.target.value

  setFormData(data=>({...data,[name]:value}))
 }

//   //function for razorPay
  
//  const initPay=(order)=>{

//    const options={

//     key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//     amount:order.amount,
//     currency:order.currency,
//     name:'Order Payment',
//     description:'Order Payment',
//     order_id :order.id,
//     receipt :order.receipt,
//     handler :async(response)=>{
//          console.log(response);
         
//          try {

//           const {data} = await axios.post(backendUrl +'/api/order/verifyRazorpay',response,{headers:{token}})

//           if(data.success){
//              navigate('/orders')
//              setCartItems({})
//           }
          
//          } catch (error) {
//            console.log(error);
//            toast.error(error.message)
           
//          }
//     }
//    }

//    const rzp=  new window.Razorpay(options)
//    rzp.open()
//  }

const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'Order Payment',
    description: 'Order Payment',
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      console.log('Razorpay Response:', response);
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/order/verifyRazorpay`,
          response,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (data.success) {
          navigate('/orders');
          setCartItems({});
          toast.success('Payment successful!');
        }
      } catch (error) {
        console.error('Error Verifying Payment:', error);
        toast.error(error.response?.data?.message || 'Payment verification failed.');
      }
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on('payment.failed', function (response) {
    console.error('Payment Failed:', response.error);
    toast.error('Payment failed. Please try again.');
  });

  rzp.open();
};

   

//  const onSubmitHandler=async(event)=>{
      
//       event.preventDefault()
//       try {
     
//         let orderItems=[]

//         for(const items in cartItems){
//            for(const item in cartItems[items]){
//             if(cartItems[items][item]>0){
//               const itemInfo =structuredClone(products.find(product=>product._id === items))
//               if(itemInfo){
//                 itemInfo.size=item
//                 itemInfo.quantity=cartItems[items][item]
//                 orderItems.push(itemInfo)
//               }
//             }
//            }
//         }

//         let orderData={
//           address:formData,
//           items:orderItems,
//           amount:getCartAmount()+delivery_fee
//         }

//         switch(method){
          
//           //API call for COD
//           case'cod': 
//           const response= await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
//            console.log(response.data);
           
//           if(response.data.success){
//             setCartItems({})
//             navigate('/orders')
//           }else{
//              toast.error(response.data.message)
//           }

//           break;

//           default:
//             break;
//         }

     
        
//       } catch (error) {
        
//       }
//  }

const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
      let orderItems = [];

      // Constructing the order items from cart data
      for (const itemId in cartItems) {
          for (const size in cartItems[itemId]) {
              if (cartItems[itemId][size] > 0) {
                  const itemInfo = structuredClone(
                      products.find((product) => product._id === itemId)
                  );

                  if (itemInfo) {
                      itemInfo.size = size;
                      itemInfo.quantity = cartItems[itemId][size];
                      orderItems.push(itemInfo);
                  }
              }
          }
      }

      // Constructing the complete order data
      const orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee,
      };

      // Handling different payment methods
      switch (method) {
          case "cod": // Cash on Delivery
              if (!token) {
                  toast.error("User is not authenticated");
                  return;
              }

              const response = await axios.post(
                  `${backendUrl}/api/order/place`,
                  orderData,
                  { headers: { Authorization: `Bearer ${token}` } }
              );

              if (response.data.success) {
                  toast.success("Order placed successfully!");
                  setCartItems({}); // Clear cart
                  navigate("/orders"); // Redirect to orders page
              } else {
                  toast.error(response.data.message || "Failed to place order");
              }
              break;

              //Integrating Stripe API
             case 'stripe': 

             const responseStripe = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              { headers: { Authorization: `Bearer ${token}` } }
            );

              if(responseStripe.data.success){
                  const{session_url}=responseStripe.data
                  window.location.replace(session_url)
              }else{
                toast.error(responseStripe.data.message)
              }
              break;

              //Integrating Razorpay APi

           case 'razorpay' : 
         
           const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
            
          if(responseRazorpay.data.success){
           initPay(responseRazorpay.data.order);
            
          }
           
           break;

          default:
              toast.error("Invalid payment method selected");
              break;
      }
  } catch (error) {
      console.error("Error placing order:", error);
      const errorMessage =
          error.response?.data?.message || "Something went wrong while placing the order";
      toast.error(errorMessage);
  }
};

 

  return (



    <form onSubmit={onSubmitHandler} className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Tittle text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required  onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
          <input required  onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Enter your email' />
        <input  required  onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          
        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required  onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Zip code' />
          <input  required  onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="Number" placeholder='Phone' />

      </div>

      {/* Right side  */}
       
       <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal/> 
        </div>

        <div className='mt-12'>
          <Tittle text1={'PAYMENT'} text2={'METHOD'}/>
          {/* .........Payment Method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3 border rounded-full ${method==='stripe' ?'bg-green-400' :''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />

            </div>

            <div  onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3 border rounded-full ${method==='razorpay' ?'bg-green-400' :''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />

            </div>

            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3 border rounded-full ${method==='cod' ?'bg-green-400' :''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              
            </div>

          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit'  className='bg-black text-white px-16 py-3 text-sm' >PLACE ORDER</button>

          </div>

        </div>

       </div>




    </form>
  )
}

export default PlaceOrder