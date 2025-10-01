import React from 'react';
import "./style.css"

const FeaturedProducts = () => {

  const api_url = "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

  return (
    <div>
        <h1 className='fp-container'>Featured Products</h1>
        <div className='card-container'>
            <div className='card'>
                <img src="" alt="" />
            </div>
        </div>
    </div>
  )
}

export default FeaturedProducts