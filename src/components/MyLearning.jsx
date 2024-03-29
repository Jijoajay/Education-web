import React, {useContext, useState } from 'react';
import IsFavourite from './Main/IsFavourite';
import './MyLearning.css';
import flashapi from './api/flashapi';
import { CourseItem } from './Courses/CourseItem';
import { DataContext} from './context/DataContext';


const MyLearning = ({coursee, favs}) => {
  const { user, title,favour, handleClick, boughtCourses, favourite, handleRemoveCourse} = useContext(DataContext)
  const [showCourse, setShowCourse ] = useState( coursee );
  const [showFavourite, setShowFavourite] = useState(favs);
  const course = boughtCourses.map((course)=>course.course)  

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
    console.log('courses',boughtCourses);
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
            {boughtCourses.length > 0 ? (
                <CourseItem 
                  myLearning={true}
                  user={user}
                  courses={course}
                  favour={favour}
                  handleClick={handleClick}
                  isLearning={false}
                  handleRemoveCourse={handleRemoveCourse}
                  />
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
