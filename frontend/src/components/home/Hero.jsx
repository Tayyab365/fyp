import React from 'react'

const Hero = () => {
  return (
    <section className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Build Your <span className="text-[#3B82F6]">Ultimate </span>
            Gaming Setup
          </h1>
          <p className="text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
            High performance gaming laptops, RGB mechanical keyboards, precision mice and pro headsets. 
            Everything a gamer needs, in one store.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg transition">
              Shop Now
            </button>
            <button className="border border-white hover:bg-white hover:text-[#0F172A] px-6 py-3 rounded-lg font-semibold transition">
              View Deals
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://dummyimage.com/600x400/1E293B/3B82F6&text=Gaming+Laptop+%2B+Gear"
            alt="Gaming Gear"
            className="rounded-xl shadow-2xl border border-[#3B82F6]/40"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero
