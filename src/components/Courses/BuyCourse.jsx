import React, { useEffect, useRef } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import "./BuyCourse.css"
import CourseVideopage from './CourseVideopage';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentBox from './CommentBox';
import { FaStar } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import flashapi from '../api/flashapi';

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
    const [videoWatched, setVideoWatched] = useState(0)
    const [count, setCount] = useState([]);
    const [hoverStar, setHoverStar] = useState(null);
    const [hoverProgress, setProgress] = useState(false);
    const [courseCompleted, setCourseCompleted] = useState(false);
    const [videoIndex, setVideoIndex] = useState(0);

    const videoRef = useRef(null);
    const watchedFully = useRef(false);
    
    const handleVideoEnded = ()=>{
        watchedFully.current = true;
    }

    useEffect(()=>{
        const fetchVideoCount = async()=>{
            const response = await flashapi.get(`/get-completed-video/${user['id']}/${course.id}`)
            console.log(response.data)
            setCount(response.data)
        }
        fetchVideoCount();
    },[]);

    useEffect(()=>{
        const updateVideoProgress = async()=>{
            try {
                console.log("first.....,")
                const response = await flashapi.post(`/add-completed-video/${videoIndex}/${user['id']}`,{course_id:course.id})
                console.log("response of adding completed video: ",response.data)
            } catch (error) {
                console.log('error at adding: ',error)
            }
        }
        if(watchedFully && videoWatched > videoCount){
            setVideoWatched((prevCount)=> prevCount + 1)
            updateVideoProgress();
        }
    },[watchedFully,setVideoCount,setVideoWatched, subtitleIndex]);

    const handleStarHover = (index)=>{
        setHoverStar(index)
    }
    const handleStarLeave = () => {
        setHoverStar(null);
      };


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
                        setVideoIndex={setVideoIndex}
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
                        {console.log("videovount:",videoCount)}
                        <div className='progress-bar-container'><CircularProgressbar className='progress-bar' value={count.length} maxValue={videoCount} text={`${Math.ceil((count.length/videoCount) * 100)}%`} /></div>
                        <p onMouseEnter={()=>setProgress(true)} onMouseLeave={()=>setProgress(false)}>Your Progress</p>
                        {course && hoverProgress &&
                            <div className='hoveredProgressContainer'>
                                <p>{ count.length + " of " + videoCount + " complete" }</p>
                                <p>Finish course to get your certificate</p>
                            </div>                        
                        }
                     </div>
                </nav>
                { activeRating && course &&
                    <div className='ratingContainer'>
                        <p className='rating-cross' onClick={()=>setActiveRating(false)}><RxCross2 /></p>
                        <div className="rating-content">
                            <h3>How would you rate this course?</h3>
                            <p>Select rating</p>
                            <p className='stars' onMouseLeave={()=>handleStarLeave}>
                                {console.log(hoverStar)}
                                {[...Array(5)].map((_,index)=>(
                                    <FaStar 
                                    key={index}
                                    onMouseEnter={()=>handleStarHover(index)}
                                    className={index <= hoverStar ? 'star-hovered' : ''}
                                    />
                                ))}
                            </p>
                        </div>
                    </div>
                }
                <div className={`video-display ${isSideActive ? 'video-display-active':"video-display-notActive"}`}>
                    <div className='video'>
                        <video src={course.videoContent[sectionIndex].subtitle[subtitleIndex].videoLink} 
                        title={course.name}
                        ref={videoRef}
                        onEnded={handleVideoEnded}
                        controls
                        >
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