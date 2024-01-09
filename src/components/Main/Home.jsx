import React, { useEffect, useState,useRef } from 'react'
import flashapi from '../api/flashapi';
import './Home.css'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import CourseSlider from '../Demo/CourseSlider';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {motion, useAnimation, AnimatePresence} from "framer-motion";
// import { useInView } from 'framer-motion';
import {animateLeft, container, item, verticalAnimate} from '../AnimationUtils';



const Home = ({courses, favour, handleClick,user}) => {
  const [slide, setSlide] =useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0)
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredCourse, setFilteredCourses] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  

  const containerRef = useRef(null);
  const controls = useAnimation();
  
  useEffect(
    ()=>{
      const fetchData = async()=>{
        try{
          console.log("ooooo")
          const response = await flashapi.get('/get-carousel')
          console.log("first", response.data)
          setSlide(response.data)
        }catch(err){
          console.log("error at getting carousel", err.message);
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
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries)=>{
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({x:0, opacity:1, transition:{delay:.5, duration:2}});
          } else {
            controls.start({ opacity: 0, x: -50 });
          }
        });
      },
      { threshold: 0.3 } 
    )
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    

    return () => {
      observer.disconnect();
    };
  }, [controls]);
  
  useEffect(()=>{
    const getUserSearchHistory = async()=>{
      try {
        const response = await flashapi.post("/get-searchHistory",{user_id : user['id']});
        console.log("searchHistory", response.data)
        setSearchHistory(response.data)
        console.log("searchHistory", response.status)
      } catch (error) {
        console.log("error at getting user history")
      }
    }
    getUserSearchHistory();
    
    
  },[user,courses])

  useEffect(() => {
    const allSearchResults = searchHistory.flatMap(history => history.search_result);
    setFilteredCourses(allSearchResults);
  }, [searchHistory]);
  console.log("searchHisory",searchHistory)
  console.log("filteredCourse",filteredCourse)
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
          <motion.div className="page-img" variants={container} initial="hidden" animate="visible">
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
    title={`You searched for ${searchHistory}`}
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