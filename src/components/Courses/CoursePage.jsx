import { useParams } from 'react-router-dom'
import './CoursePage.css'
import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import CourseVideopage from './CourseVideopage';
import flashapi from '../api/flashapi';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DataContext } from '../context/DataContext';

const CoursePage = () => {
    const {courses, user, handleRemoveCourse, boughtCourses,favour,handleClick} = useContext(DataContext)
    const navigate = useNavigate();
    const [paidUser, setPaidUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
    
    const course = courses.find((course)=> (course.id).toString() === id)
    const videoContent = course ? course.videoContent : [];
    const [isActive, setIsActive] = useState(Array(videoContent.length).fill(false))
    
    const handleDropdownToggle = (index) => {
        const newIsActive = [...isActive];
        newIsActive[index] = !newIsActive[index];
        setIsActive(newIsActive);
    };
    
    useEffect(() => {
        boughtCourses?.forEach((course) => {
          if (course.course_id === id) setPaidUser(course.course_id);
        });
      }, [boughtCourses, id]);

    useEffect(() => {
        if (!course || !user) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      }, [course, user]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if(paidUser === course.id){
            navigate(`/course/${course.id}`);
        }
        else if(course.admin_id === user['id']){
            navigate(`/course/${course.id}`);
        }
        else{
        try{
            var options ={
                key:"rzp_test_b61GWwvFBY9Xya",
                key_secret: "KzIfcmeCDDTmwPfYyvEVI28l",
                amount : course.newPrice * 100,
                currency: "INR",
                name: course.name,
                description:"for testing purpose",
                handler: function (response){
                    try {
                        const response =  flashapi.post('/purchase_course', {user_id:user['id'], course_id:course.id})
                        navigate(`/course/${course.id}`);
                    } catch (error) {
                        console.error(error);
                    }
                },
                prefill:{
                    name:"ajay",
                    email:course.email
                },
                notes:{
                    address:"Razorpay Corporate Office"
                },
                themes:{
                    color:"#D8346D"
                },
                checkout_behavior: 'NO_CONTACTLESS',
            }
            if (window.Razorpay) {
                const razorpayInstance = new window.Razorpay(options);
                console.log("razorpayInstance",razorpayInstance)
                razorpayInstance.open();
              } else {
                console.error('Razorpay script not loaded.');
              }
        }
        catch(err){
            console.log(err)
        }}
    };

    

    const fadeAnimate = (delay)=>({
        initial:{opacity:0.3},
        animate:{opacity:1},
        transition:{duration:2, delay:delay},
    })

    const verticalAnimate = (number) => ({
        initial: { x: number, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 2, delay: 0.8 },
      });
    
    const rotateAnimation = ()=>( {
        initial:{y:"-100vh", opacity:0},
        animate:{y:0, opacity:1},
        transition:{
            type:"spring",
            stiffness:50,
            delay:.5,
            duration:5
        }
    })
    const imgAnimation = ()=>({
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: {
          type: 'spring',
          damping: 10,
          stiffness: 100,
        },
    })
    const buttonAnimation = (number)=>({
        initial: { x: number, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition:{
            type:"spring",
            stiffness:50,
            damping:20,
            duration:1
        }
    })
    const favourId = favour.includes(id);
  return (
    <main>
            { loading ? (
                    <div className='loadingContainer'>
                        <motion.p initial={{rotate:0}} animate={{rotate:360}} transition={{duration:2, repeat: Infinity,ease:"linear"}}>
                            <AiOutlineLoading3Quarters />
                        </motion.p>
                        <p className='loading'> Loading</p>
                        <motion.p className='loading-dots' initial={{opacity:0, x:-20}} animate={{opacity:1,x:10}} transition={{repeat:Infinity, ease:"linear", duration:2}}>
                            {[...Array(4)].map((_, index)=>(
                                <p>.</p>
                            ))}
                        </motion.p>
                    </div>
                 ): course ? (
                    <>
                            <div className="coursePage">
                            <div className="product-container">
                                <div className="contentDiv">
                                    <motion.h4 {...rotateAnimation()} >{course.name}</motion.h4>
                                    <motion.h5 {...rotateAnimation()}><span className='course-instructor'>Course Instructor: </span> {course.author}</motion.h5>
                                    <motion.p {...rotateAnimation()}>₹{course.newPrice} <span>₹{course.oldPrice}</span></motion.p>
                                    <div className='buttons'>
                                        { paidUser === course.id || course.admin_id === user['id'] ? (
                                            <motion.button {...buttonAnimation("-100vw")} className='button buy' onClick={handlePayment}>Continue</motion.button>
                                            ):(
                                                <motion.button  {...buttonAnimation("-100vw")}className='button buy' onClick={(e)=>handlePayment(e)}>Buy Now</motion.button>
                                                )
                                            }
                                        {
                                            favourId ?
                                            <motion.button {...buttonAnimation("400vw")} className='button trail' onClick={()=>handleClick(id)}>Remove to Favourite</motion.button>
                                            :
                                            <motion.button {...buttonAnimation("400vw")} className='button trail' onClick={()=>handleClick(id)}>Add to Favourite</motion.button>
                                        }
                                    </div>
                                    <div className='buttons'>
                                        { 
                                        course.admin_id === user['id']
                                        &&
                                            <>
                                            <Link to={`/editcourse/${course.id}`}>
                                                <motion.button {...buttonAnimation("-10vw")} className='button course'>Edit Course</motion.button>
                                            </Link>
                                            <motion.button {...buttonAnimation("10vw")} className='button course' onClick={()=>{handleRemoveCourse(course.id)}}>Remove Course</motion.button>
                                            </>
                                        
                                        }
                                    </div>
                                </div>
                                <motion.div className="imgDiv" {...imgAnimation()}>
                                    <motion.img src={course.img} alt={course.name} {...imgAnimation()}/>
                                </motion.div>
                            </div>
                            </div>
                            
                        
                        <div className='offer-detail-page'>
                            <div className="offer-details">
                                <motion.div className="offer" {...fadeAnimate(1)} >
                                    <h3>What We Offers?</h3>
                                </motion.div>
                                <div className="details">
                                    <motion.img src={course.courseOffers} alt="offerings"
                                        initial={{opacity:0, x:500}}
                                        animate={{ x:10, opacity:1 }}
                                        transition={{ ease: "linear", duration: 2 , delay:1}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="course-detail-page">
                            <div className="course-detail">
                                <motion.div className="title" {...verticalAnimate(-500)}>
                                    <h3>What You'll learn</h3>
                                </motion.div>
                                <div className="detail" {...verticalAnimate(-500)}>
                                    <ul>
                                    {course.whatYouLearn.map((point,index)=>
                                        <motion.li key={index} {...verticalAnimate(300)}>{point.title}</motion.li>
                                    )}   
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <CourseVideopage 
                        course={course}
                        handleDropdownToggle={handleDropdownToggle}
                        isActive={isActive}
                        />
                </>
                 ):(
                    <div className='coursePage'>
                    <h2>course not Found</h2>
                    <p>
                        Please go back to the <Link to='/'>home page</Link>
                    </p>
                </div>
                 )
            }
    </main>
  )
}

export default CoursePage
