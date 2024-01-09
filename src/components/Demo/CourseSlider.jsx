import React, { useEffect } from 'react'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import { useState } from 'react';
import { CourseItem } from '../Courses/CourseItem';

const CourseSlider = ({courses, title,favour, handleClick,controls,handleRemoveCourse}) => {

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
    const course = courses.slice(courseSlide, courseSlide + 3)
    
  return (
    <div className="course-slide" variants={slideVariants} initial="hidden" animate='visible' >
    <div className="home-course-title"> <h2>{title}</h2> </div>
        <FaArrowLeft onClick={() => handleSlideClick("left")} className='left-course-arrow'/>
      <div className="home-course-containers" animate={controls}>
        <CourseItem 
        courses={course}
        favour={favour}
        handleClick={handleClick}
        handleRemoveCourse={handleRemoveCourse}
        />
      </div>
      <FaArrowRight onClick={() => handleSlideClick("right")}  className='right-course-arrow'/>
    </div>
  )
}

export default CourseSlider