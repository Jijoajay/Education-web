import { Link } from 'react-router-dom';
import "./Courses.css";
import { IoHeart } from "react-icons/io5";
import {motion} from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const Courses = ({ courses, searchResult, favour, handleClick, user , handleRemoveCourse}) => {
  if(user){
    console.log("---->courses:",user);
  }
  return (
    <main className='course-page'>
      <div className="course-containers">
        {
          courses.map((course,index) => (
            <motion.div className="product-containers" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5,duration:index + .5 , ease:"easeInOut"}}>
                <div className="img-div">
                  <div className={ favour.includes(course.id) ? "heart-icon-black" : "heart-icon"} onClick={()=>handleClick(course.id)}>
                    <IoHeart />
                  </div>
                  { user ? (
                    user['role'] == "admin" &&
                    <div className="remove" onClick={()=>handleRemoveCourse(course.id)}>
                      <RxCross2 />
                    </div>
                  ):(
                    <div className="dv"></div>
                  )
                  }
                <Link to={`${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
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
        
        // ) : (
        //   courses.map((course) => (
        //     <Link key={course.id} to={`${course.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        //       <div className="product-con">
        //         <div className="img-div">
        //           <img src={course.img} alt={course.name} />
        //         </div>
        //         <div className="content-div">
        //           <h4>{course.name}</h4>
        //           <h5>{course.author}</h5>
        //           <p>₹{course.newPrice} <span>₹{course.oldPrice}</span></p>
        //         </div>
        //       </div>
        //     </Link>
        //   ))
        // )}
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