import React from 'react'
import Tittle from '../components/Tittle'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tittle text1={'ABOUT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img  className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        
        <div className='flex flex-col justify-center gap-6 md:2/4 text-gray-600'>
        <p>Welcome to Forever, your go-to destination for fashion that celebrates individuality and transcends trends. From everyday chic to glamorous evening wear, our curated collection offers timeless designs crafted with quality and care. At Forever, we believe fashion is more than clothing – it’s a reflection of your confidence, personality, and unique journey.</p>
        <p>Discover Forever, where every piece is designed to celebrate your unique style. From elegant everyday wear to show-stopping outfits for special moments, we bring you fashion that blends quality, comfort, and timeless appeal. Let your wardrobe reflect the confidence and beauty that make you one of a kind.
</p>

          <b className='text-gray-800'>OUR MISSON</b>
          <p>At Forever, our mission is to empower individuals to express their unique style through fashion that is timeless, high-quality, and accessible. We are committed to creating a platform that celebrates diversity, inspires confidence, and fosters sustainability. By delivering exceptional designs that blend comfort and elegance, we aim to redefine fashion as a source of self-expression and joy for everyone.</p>
        </div>
             
      </div>

      <div className='text-xl py-4'>  
      <Tittle text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At Forever, we prioritize superior craftsmanship and use premium materials to ensure every product meets the highest standards.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With an easy-to-navigate platform, secure payments, and swift delivery, shopping at Forever is effortless and stress-free.</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated team is here to make your shopping experience seamless and enjoyable, addressing your needs with care and professionalism.</p>
        </div>

      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About