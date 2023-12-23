import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoHeart } from "react-icons/io5";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import { useState } from 'react';
import {motion} from "framer-motion";
import flashapi from '../api/flashapi';

const CourseSlider = ({courses, title,favour, handleClick,controls}) => {

    const [courseSlide, setCourseSlide] = useState(0)
    const handleSlideClick = (direction)=>{
        if(direction === "left"){
            setCourseSlide((prevIndex)=>Math.max(0, prevIndex - 3))
        }
        else if(direction === "right"){
            setCourseSlide((prevIndex)=>Math.min(courses.length - 3, prevIndex +3))
        }
    }
    const slideVariants = (delay)=>({
      hidden:{opacity:0},
      whileHover:{scale:1.2},
      visible: { opacity: 1, transition: { duration: delay + 1.5, delay: 1 } },
    })
   
  return (
    <div className="course-slide" variants={slideVariants} initial="hidden" animate='visible' >
    <div className="home-course-title"> <h2>{title}</h2> </div>
        <FaArrowLeft onClick={() => handleSlideClick("left")} className='left-course-arrow'/>
      <div className="home-course-containers" animate={controls}>
        {
          courses.slice(courseSlide, courseSlide + 3).map((course, index) => (
            <motion.div className="home-product-containers" variants={slideVariants(index)} initial="hidden" animate='visible' whileHover={{scale:1.1, boxShadow: '0 10px 10px rgba(0, 0, 0, 10)' }}>
                <div className="img-div">
                    <motion.div className={ favour.includes(course.id) ? "heart-icon-black" : "heart-icon"} animate={{transition:{duration:5, delay:5}}}  onClick={()=>handleClick(course.id)} >
                        <IoHeart />
                    </motion.div>
                    <Link to={`/courses/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <img src={course.img} alt={course.name} />
                    </Link>
                </div>
                <div className="content-div">
                    <h4>{course.name}</h4>
                    <h5>{course.author}</h5>
                    <p>₹{course.newPrice} <span className='oldPrice'>₹{course.oldPrice}</span></p>
                </div>
            </motion.div>
          ))
        }
      </div>
      <FaArrowRight onClick={() => handleSlideClick("right")}  className='right-course-arrow'/>
    </div>
  )
}

export default CourseSlider