import React from 'react'
import { IoHeart } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import MyLearning from '../MyLearning';

export const CourseItem = ({courses,favour,isLearning, handleClick, handleRemoveCourse,user, myLearning}) => {
    return (
    <>
        {courses.map((course,index) => (
            <div className={`${isLearning ? "learning-product-con" : "product-containers "}`} key={index}>
                <div className={` ${isLearning ? "learning-img-div" : "img-div"}`}>
                <div className={ favour.includes(course.id) 
                ? ` ${isLearning ? "learning-heart-icon-blacks" : "heart-icon-black"}`
                : ` ${isLearning ? "learning-heart-icons" : "heart-icon"}`} onClick={()=>handleClick(course.id)}>
                    <IoHeart />
                </div>
                { user ? (
                    user['role'] === "admin" &&
                    <div className="remove" onClick={()=>handleRemoveCourse(course.id)}>
                    <RxCross2 />
                    </div>
                ):(
                    ""
                )
                }
                <Link to={`${ myLearning ? `/course/${course.id}` : `/courses/${course.id}`}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                <img src={course.img} alt={course.name} />
                </Link> 
                </div>
                <div className={`content-div ${isLearning ? "learning-content-div" : ""}`}>
                <h4>{course.name}</h4>
                <h5>{course.author}</h5>
                <p>₹{course.newPrice} <span>₹{course.oldPrice}</span></p>
                </div>
            </div>
        ))}
    </>
  )
}
