import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

    <div className='text-center text-2xl pt-10 border-t'>
      <Tittle text1={'CONTACT'} text2={'US'}/>
    </div>
     
     <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />

      <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p  className='text-gray-500'>Sectore 62 <br/>Noida,UP,IND</p>
          <p className='text-gray-500'>Tel:9853255225 <br/> Email:admin@forever.com</p>
          <p className='font-semibold text-xl text-gray-600'>Carrers at Forever</p>
          <p className='text-gray-500'>Learn more about us</p>


      </div>

     </div>
     <NewsletterBox/>


     </div>
     
  )
}

export default Contact