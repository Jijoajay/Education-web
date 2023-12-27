import React, { useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import "./BuyCourse.css"
import CourseVideopage from './CourseVideopage';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from "react-player";
import CommentBox from './CommentBox';
import { FaStar } from "react-icons/fa";
import { LuStar } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

const BuyCourse = ({courses, user}) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const course = courses?.find((course) => (course.id).toString() === id);
    const [sectionIndex, setSectionIndex] = useState(0)
    const[subtitleIndex,setSubtitleIndex] = useState(0)
    const [isSideActive, setIsSideActive] = useState(false)
    const videoContent = course?.videoContent || [];
    const [isActive, setIsActive] = useState(Array(videoContent.length).fill(false))
    const [activeRating, setActiveRating] = useState(false)
    const [videoCount, setVideoCount] = useState(0);


    const handleDropdownToggle = (index) => {
        setSectionIndex(index)
        const newIsActive = [...isActive];
        newIsActive[index] = !newIsActive[index];
        setIsActive(newIsActive);
      }; 
    const handleClick = ()=>{
        setIsSideActive(!isSideActive)
    }
    const handleActiveRating = ()=>{
            setActiveRating(!activeRating)
        }
    useEffect(() => {
        const fetchVideoCount = () => {
          let count = 0;
            if (course.videoContent && Array.isArray(course.videoContent)) {
            for (let subIndex = 0; subIndex < course.videoContent.length; subIndex++) {
                const videoContent = course.videoContent[subIndex];
                if( videoContent.subtitle && Array.isArray(videoContent.subtitle)){
                    for (let videoIndex = 0; videoIndex < videoContent.subtitle.length; videoIndex++) {
                        const videoLink = course.videoContent[subIndex].subtitle[videoIndex]?.videoLink;
                        if (videoLink) {
                            count++;
                        }
                    }
                }
            }
            }
            setVideoCount(count);
          console.log("count", count);
        };
      
        fetchVideoCount();
      }, [courses, subtitleIndex, sectionIndex]); 
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
                        <div className="review" onClick={()=>handleActiveRating()}>
                            <FaStar /> Leave a rating
                        </div>
                        <p>Your Progress</p>
                     </div>
                </nav>
                { activeRating && course &&
                    <div className='ratingContainer'>
                        <p className='rating-cross' onClick={()=>setActiveRating(false)}><RxCross2 /></p>
                        <div className="rating-content">
                            <h3>How would you rate this course?</h3>
                            <p>Select rating</p>
                            <p className='stars'><LuStar /> <LuStar /> <LuStar /> <LuStar /> <LuStar /></p>
                        </div>
                    </div>
                }
                <div className={`video-display ${isSideActive ? 'video-display-active':"video-display-notActive"}`}>
                    <div className='video'>
                        <video src={course.videoContent[sectionIndex].subtitle[subtitleIndex].videoLink} title={course.name} controls>

                        </video>
                    </div>
                </div>
                <CommentBox 
                course={course}
                videoContent={videoContent}
                sectionIndex={sectionIndex}
                subtitleIndex={subtitleIndex}
                user={user}
                />
            </div>
            
        </div>
        <div className="black"></div>
        
           
    </main>
  )
}

export default BuyCourse