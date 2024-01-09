import React from 'react'
import { Link } from 'react-router-dom';
import { IoBookSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { SocialIcons } from '../Main/SocialIcons';
import { IoHeart } from "react-icons/io5";
import { CourseItem } from '../Courses/CourseItem';

const Hover = ({courses,favour,isHover,menu,setIsHover,title,handleMouseEnter,
    handleMouseLeave,setActive,handleFavouriteClick, handleRemoveCourse}) => {
  
        const course = courses.map((course)=>course.course)
    return (
    <>
    <div 
    onMouseEnter={()=>handleMouseEnter(title)}
    onMouseLeave={()=>handleMouseLeave}
    onClick={()=>{setActive(title); setIsHover(false)}}
    className={`${title}-icon`}
    style={{color:"White", fontSize:"30px",marginRight:"10px"}}
    >
        {title === 'myLearning' ? (
          <Link to={`/myLearning`}><IoBookSharp /></Link>
        ) : (
          <Link to="/favourites"><IoHeart /></Link>
        )}
    </div>
    {isHover && menu === title &&
        <div className={`${title}-hover-container`} onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        >
        <CourseItem courses={course} 
        favour={favour}
        isLearning={true}
        handleClick={handleFavouriteClick}
        handleRemoveCourse={handleRemoveCourse}
        />
        </div>
    }
    </>
  )
}

export default Hover


export const CategoryHover = ({isHover,setIsHover,categoryArray,menu}) => {
  return (
    <>
    {
        isHover  && menu ==="course" &&
            <div className='hover-container' onMouseEnter={()=>setIsHover(true)}
            onMouseLeave={()=>setIsHover(false)}
            >
                { categoryArray.map((category,index)=>{
                    return(
                        <div className="course-items" key={index}>
                            <Link to={`/${category}/courses`} style={{textDecoration:"none"}}><p style={{color:"rgb(217,52,109)"}}>{category}</p></Link>
                        </div>
                    )
                    })
                }
            </div>
        }
    </>
  )
}

export const InfoHover = ({info,editProfile}) => (
    <>
        {
        info ? (
            info.map((info,index) => (
            <React.Fragment key={index}>
                <div className="user-profile-title">
                <h2>My Profile</h2>
                </div>
                <div>
                <div className="user-prof">
                    <div className="user-prof-img">
                        <img src={info.profile_img} alt="" />
                    </div>
                    <div className="prof-content">
                        <div className="prof-info">
                            <div>
                                <h2>{info.first_name + " " + info.last_name}</h2>
                                <p>{info.Headline}</p>
                            </div>
                            <div>
                                <div className="user-edit-icon" onClick={()=>editProfile()}><MdEdit /></div>
                            </div>
                        </div>
                        <div className='user-social-icons '>
                            <SocialIcons item={info}/>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
            ))
        ):(
            <p>No records Found</p>
        )
        }
    </>
    )

