import { Link, useParams } from 'react-router-dom';
import "./Courses.css";
import { IoHeart } from "react-icons/io5";
import {motion} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from 'react';
import flashapi from '../api/flashapi';
import { useState } from 'react';


const Courses = ({ courses, searchResult, favour, handleClick, user , handleRemoveCourse}) => {
  const [courseByCategory, setCourseByCategory] = useState([]);
  const {category} = useParams();
  useEffect(() => {
    if (category) {
      const coursesByCategory = courses.find((course) => course.category === category);
      const fetchCourse = async () => {
        try {
          const response = await flashapi.get(`/course/${category}`);
          setCourseByCategory(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCourse();
    }
  }, [category, courses, setCourseByCategory]);
  const filteredCourses = courseByCategory.length > 0 ? courseByCategory : searchResult;
  return (
    <main className='course-page'>
      <div className="course-containers">
        {
          filteredCourses  ? (
            filteredCourses.map((course,index) => (
              <motion.div className="product-containers" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:index + .5 , ease:"easeInOut"}}>
                  <div className="img-div">
                    <div className={ favour.includes(course.id) ? "heart-icon-black" : "heart-icon"} onClick={()=>handleClick(course.id)}>
                      <IoHeart />
                    </div>
                    { user ? (
                      user['role'] === "admin" &&
                      <div className="remove" onClick={()=>handleRemoveCourse(course.id)}>
                        <RxCross2 />
                      </div>
                    ):(
                      <div className="dv"></div>
                    )
                    }
                  <Link to={`/courses/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <img src={course.img} alt={course.name} />
                  </Link> 
                  </div>
                  <div className="content-div">
                    <h4>{course.name}</h4>
                    <h5>{course.author}</h5>
                    <p>₹{course.newPrice} <span>₹{course.oldPrice}</span></p>
                  </div>
                </motion.div>
            ))
          ):(
            courses.map((course,index) => (
              <motion.div className="product-containers" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:index + .5 , ease:"easeInOut"}}>
                  <div className="img-div">
                    <div className={ favour.includes(course.id) ? "heart-icon-black" : "heart-icon"} onClick={()=>handleClick(course.id)}>
                      <IoHeart />
                    </div>
                    { user ? (
                      user['role'] === "admin" &&
                      <div className="remove" onClick={()=>handleRemoveCourse(course.id)}>
                        <RxCross2 />
                      </div>
                    ):(
                      <div className="dv"></div>
                    )
                    }
                  <Link to={`/courses/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                    <img src={course.img} alt={course.name} />
                  </Link>
                  </div>
                  <div className="content-div">
                    <h4>{course.name}</h4>
                    <h5>{course.author}</h5>
                    <p>₹{course.newPrice} <span>₹{course.oldPrice}</span></p>
                  </div>
                </motion.div>
            ))
          )
        }
          { user ? (
            user['role'] === 'admin' &&
            <Link to='addnewcourse'><button className='add-button'>Add new Course</button></Link>
          ):(
            <div className="dv"></div>
          )
          }
      </div>
    </main>
  );
};

export default Courses;