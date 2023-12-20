import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IsFavourite from './Main/IsFavourite';
import './MyLearning.css';
import flashapi from './api/flashapi';
import { IoHeart } from "react-icons/io5";


const MyLearning = ({ user, title, coursee, favs, favour, handleClick}) => {
  console.log(favour);
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse ] = useState( coursee );
  const [favourite, setFavourite] = useState([]);
  const [showFavourite, setShowFavourite] = useState(favs);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await flashapi.get(`/get_course/${user["id"]}`);
                console.log("response",response.data.course);
                setCourses(response.data.course ) 
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        
        const fetchFavouriteData = async()=>{
          try {
            const response = await flashapi.get(`/get-favourite/${user['id']}`);
            setFavourite(response.data.favourites)
          } catch (error) {
            console.log(error);
          }
        }
        fetchFavouriteData();
        
    }, [user]);
    const handleCourseClick = ()=>{
      if(showFavourite){
        setShowFavourite(!showFavourite)
        setShowCourse(!showCourse)
      }else{
        setShowCourse(!showCourse)
      }
    }
    const handleFavClick = ()=>{
      if(showCourse){
        setShowCourse(!showCourse)
        setShowFavourite(!showFavourite)
      }else{
        setShowFavourite(!showFavourite)
      }
    }
    console.log('showCourse:', showCourse);
    console.log('showFavourite:', showFavourite);
    console.log('courses',courses);
    return (
    <main className='myLearning-page'>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="tabList">
        <div className="all-course">
          <p onClick={()=>handleCourseClick()}>All courses</p>
        </div>
        <div className="vl"></div>
        <div className="favourite">
          <p onClick={()=>handleFavClick()}>favourites</p>
        </div>
      </div>
      <div className="course">
        {
          showCourse &&
          <>
            {courses.length > 0 ? (
              courses.map((course) => (
                <div className="product-con" key={course.id}>
                    <div className="img-div">
                      <div className={ favour.length > 0 ? favour.includes(course.id) ? "heart-icon-black" : "heart-icon" : ""} onClick={()=>handleClick(course.id)}>
                        <IoHeart />
                      </div>
                    <Link to={`/course/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                      <img src={course.img} alt={course.name} />
                    </Link>
                    </div>
                    <div className="content-div">
                      <h4>{course.name}</h4>
                      <h5>Author: {course.author}</h5>
                      <p>Discounted Price: ₹{course.newPrice} Old Price: <span> ₹{course.oldPrice} </span></p>
                    </div>
                  </div>
              ))
            ) : (
              <div><h1>No Course Found</h1></div>
            )}
          </>
        }
        {
          showFavourite &&
          <IsFavourite favourite={favourite} favour={favour} handleClick={handleClick} />
        }
      </div>
      <div className="extra"></div>
    </main>
  );
}

export default MyLearning;
