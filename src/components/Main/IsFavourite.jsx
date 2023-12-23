import React from 'react'
import { Link } from 'react-router-dom'
import { IoHeart } from "react-icons/io5";


const IsFavourite = ({favourite, favour, handleClick}) => {
  console.log("favourite in is", favourite)
  return (
    <>
            { favourite.length> 0  ? (
              favourite.map((favourite)=>(
                <div className="product-con">
                    <div className="img-div">
                      <div className={ favour.includes(favourite.course.id) ? "heart-icon-black" : "heart-icon"} onClick={()=>handleClick(favourite.course.id)}>
                          <IoHeart />
                      </div>
                    <Link to={`/course/${favourite.course.id}`} key={favourite.course.id} style={{ textDecoration: 'none', color: 'black' }}>
                      <img src={favourite.course.img} alt={favourite.course.name} />
                    </Link>
                    </div>
                    <div className="content-div">
                      <h4>{favourite.course.name}</h4>
                      <h5>Author: {favourite.course.author}</h5>
                      <p>Discounted Price: ₹{favourite.course.newPrice} Old Price: <span> ₹{favourite.course.oldPrice} </span></p>
                    </div>
                  </div>
              ))
            ) : (
              <div className='no-favourite'><h1>No Favourites</h1></div>
            )}
    </>
  )
}

export default IsFavourite