import React, { useEffect, useState,useRef } from 'react'
import api from '../api/fetch'
import './Home.css'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import CourseSlider from '../Demo/CourseSlider';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {motion, useAnimation, AnimatePresence} from "framer-motion";

const Home = ({courses, favour, handleClick}) => {
  const [slide, setSlide] =useState([])
  const [currentImage, setCurrentImage] = useState(0)

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const containerRef = useRef(null);
  const controls = useAnimation();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.4,
        duration: 1
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const animateLeft = (delay)=>({
    initial:{x:-250, opacity: 0},
    animate:{ x: 0 , opacity: 1},
    exit:{x:-250, opacity:0},
    transition:{ delay: delay, ease: "easeInOut", duration: 1}
  })

  const verticalAnimate = (x)=>({
    initial:{x:x, opacity: 0},
    animate:{ x: 0 , opacity: 1},
    exit:{x:x, opacity:0},
    transition:{ delay: 1, type: "spring",stiffness:10, duration: .5}
  })
  


  useEffect(
    ()=>{
      const fetchData = async()=>{
        try{
          const response = await api.get('/carousel')
          setSlide(response.data)
        }catch(err){
          console.log(err.message);
        }
      }
      fetchData();
    },[])
  const nextImg = ()=>{
    setTimeout(()=>{
      setCurrentImage(currentImage === slide.length - 1 ? 0 : currentImage + 1 )
    },10)
  }
  const prevImg = ()=>{
    setTimeout(()=>{
      setCurrentImage(currentImage === 0 ? slide.length - 1 : currentImage - 1)
    },10)
  }
  const animateFromLeft = (delay) => ({
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay },
  });


  
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({x:0, opacity:1, transition:{delay:.3, duration:.5}});
          } else {
            controls.start({ opacity: 0, x: -50 });
          }
        });
      },
      { threshold: 0.3 } 
    )
    if (containerRef.current) {
      observer.observe(containerRef.current);
      console.log(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [controls]);
  
  return (
    <main className='home-page'>
    <div className="home">
      <FaArrowLeft onClick={() => prevImg()} className='left-arrow'
       />
      {slide.map((slide, id) => (
       <AnimatePresence>
        <motion.div style={{ background: `url(${slide.img})`, backgroundRepeat:'no-repeat', backgroundSize:'cover' }}  className={currentImage === id ? 'carousel' : 'no-carousel' 
      }
      key={id}
      img={slide.img}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      > 
          <div className="container">
          <motion.h3 {...verticalAnimate("-100vw")}>We Shape the country's economy by <span className='span'>Enabling You</span> to build your future </motion.h3>
                <motion.p{...verticalAnimate("100vw")}>Career shaping programs to kick start your life with <span className='span'>Edverse</span></motion.p>
                <motion.div className="button-con">
                  <motion.button {...verticalAnimate("-50vw")}>GetStarted</motion.button>
                  <motion.button {...verticalAnimate("50vw")}>To know More</motion.button>
                </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
        ))}
      <FaArrowRight onClick={() => nextImg()}  className='right-arrow'
       />
    </div>
    <motion.section className="page-2" >
      <motion.div className="page-splitter"  ref={containerRef}>
        <motion.div className="page-content" animate={controls}>
          <motion.h2 {...animateLeft(.8)} >Find Courses <br /> on almost any <br /> topic </motion.h2>
          <motion.h5 {...animateLeft(1)}>Build your library for your career <br />  and personal growth</motion.h5>
          <motion.p {...animateLeft(1.2)}><Link to={'/courses'}> View Courses -&gt; </Link></motion.p>
        </motion.div>
        <motion.div className="page-img" variants={container} initial="hidden" animate="visible" >
          <div className="first-box">
            <motion.img
              src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png"
              alt=""
              width="400px"
              height="400px"
              variants={item}
            />
            <motion.img
              src="https://cdn.pixabay.com/photo/2017/09/08/19/05/a-2729781_1280.png"
              alt=""
              variants={item}
            />
          </div>
          <div className="second-box">
            <motion.img
              src="https://cdn.pixabay.com/photo/2017/09/08/19/05/a-2729781_1280.png"
              alt=""
              variants={item}
            />
            <motion.img
              src="https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png"
              alt=""
              variants={item}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
    <CourseSlider 
    courses={courses}
    favour={favour}
    handleClick={handleClick}
    title="Popular courses"/>
    <CourseSlider 
    courses={courses}
    favour={favour}
    handleClick={handleClick}
    title="You searched for java"
    controls={controls}
    ref={containerRef}
    />

    <CourseSlider 
    courses={courses}
    favour={favour}
    handleClick={handleClick}
    title="you searched for python"
    controls={controls}
    />

    <CourseSlider 
    courses={courses}
    favour={favour}
    handleClick={handleClick}
    title="New Courses"
    controls={controls}
    />
    
    </main>
  )
}

export default Home