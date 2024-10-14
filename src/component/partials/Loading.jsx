import React from 'react'

const Loading = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 h-screen w-full px-5 md:px-0  bg-gradient-to-br from-[#f1f8ee] to-[#fff] backdrop-blur-lg flex items-center justify-center">
        {/* Loading animation gif */}

        <div className="randomBg blur-sm absolute opacity-30 top-0 left-0 w-full md:h-[100vh] h-[60vh] aspect-square object-cover">
                    <i className="absolute ri-shopping-bag-fill text-5xl" style={{ top: `40%`, left: `90%` }}></i>
                    <i className="absolute ri-shopping-cart-2-fill text-3xl" style={{ top: `20%`, left: `70%` }}></i>
                    <i className="absolute ri-money-rupee-circle-fill text-6xl" style={{ top: `60%`, left: `20%` }}></i>
                    <i className="absolute ri-heart-3-fill text-5xl" style={{ top: `30%`, left: `10%` }}></i>
                </div>
        <img draggable="false" 
           
          className='absolute z-10 scale-[.4]' 
          src="https://cdn.dribbble.com/users/807926/screenshots/3629667/loadingtwo.gif" 
          alt="Loading animation" 
        />
      </div>
    </div>
  )
}

export default Loading