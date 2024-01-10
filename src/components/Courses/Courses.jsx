import { Link, useParams } from 'react-router-dom';
import "./Courses.css";
import { useContext, useEffect } from 'react';
import flashapi from '../api/flashapi';
import { useState } from 'react';
import { CourseItem } from './CourseItem';
import { DataContext } from '../context/DataContext';


const Courses = () => {
  const { courses, searchResult, favour, handleClick, user , handleRemoveCourse} = useContext(DataContext)
  const [courseByCategory, setCourseByCategory] = useState([]);
  const {category} = useParams();
  useEffect(() => {
    if (category) {
      const coursesByCategory = courses?.find((course) => course.category === category);
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
  console.log("favour",favour)
  return (
    <main className='course-page'>
      <div className="course-containers">
        {
          filteredCourses  ? (
            <CourseItem 
            courses={filteredCourses}
            handleClick={handleClick}
            user={user}
            favour={favour}
            handleRemoveCourse={handleRemoveCourse}
            isLearning={false}
            />
            ):(
            <CourseItem 
            courses={courses}
            handleClick={handleClick}
            user={user}
            favour={favour}
            handleRemoveCourse={handleRemoveCourse}
            isLearning={false}
            />
          )
        }
          { user ? (
            user['role'] === 'admin' &&
            <Link to='addnewcourse'><button className='add-button'>Add new Course</button></Link>
          ):(
            <div className="dv">No course</div>
          )
          }
      </div>
    </main>
  );
};

export default Courses;