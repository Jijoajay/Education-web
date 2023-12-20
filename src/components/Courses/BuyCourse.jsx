import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import "./BuyCourse.css"
import CourseVideopage from './CourseVideopage';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
const BuyCourse = ({courses}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const course = courses.find((course) => (course.id).toString() === id);
    const [sectionIndex, setSectionIndex] = useState(0)
    const[subtitleIndex,setSubtitleIndex] = useState(0)
    const [isSideActive, setIsSideActive] = useState(false)
    const videoContent = course ? course.videoContent : []
    const [isActive, setIsActive] = useState(Array(videoContent.length).fill(false))

   
    const handleDropdownToggle = (index) => {
        setSectionIndex(index)
        const newIsActive = [...isActive];
        newIsActive[index] = !newIsActive[index];
        setIsActive(newIsActive);
      }; 
    const handleClick = ()=>{
        setIsSideActive(!isSideActive)
    } 

  return (
    <main>
        <div className="buycourse-container">
            <div className='sidebar-content'>
                {   isSideActive && course &&
                        <CourseVideopage 
                        course={course}
                        handleDropdownToggle={handleDropdownToggle}
                        isActive={isActive}
                        sectionIndex={sectionIndex}
                        setSubtitleIndex={setSubtitleIndex}
                        />
                }
            </div>
            <div className='buycourse-menu'>
                <nav className='buycourse-nav'>
                    <div className="hamburger-menu">
                        <div className="div">
                            <GiHamburgerMenu onClick={handleClick}/>
                        </div>
                        <div className="name">
                        {course?.name || 'Course Name Not Available'}
                        </div>
                    </div>
                    <div className='progress'>
                        Your Progress
                    </div>
                </nav>
                <div className={`video-display ${isSideActive ? 'video-display-active':"video-display-notActive"}`}>
                    <div className='video'>
                        {/* {course  && course.videoContent && course.videoContent[sectionIndex] &&  (
                            <iframe 
                            src={course.videoContent[sectionIndex].subtitle[subtitleIndex].videoLink}
                            title={course.name}
                            frameborder="2"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            >
                            </iframe>
                        )} */}
                        <video src={course.videoContent[sectionIndex].subtitle[subtitleIndex].videoLink} title={course.name} controls>

                        </video>
                    </div>
                </div>
                <div className='description-container'>
                    <div className="title">
                            {`${course.videoContent[sectionIndex].title}: ${course.videoContent[sectionIndex].subtitle[subtitleIndex].content}`}
                    </div>
                    <div className="description">
                            <div className='title'>Description:</div>
                            <div className='des-content'>In this chapter we going to see about mern introduction</div>
                    </div>
                    <div className="comment-box">
                            <div className="title">comment:</div>
                            <div className='comment-form'>
                                <form>
                                    <input type="textarea" />
                                    <input type="file" />
                                    <button>submit</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
            
        </div>
        
           
    </main>
  )
}

export default BuyCourse