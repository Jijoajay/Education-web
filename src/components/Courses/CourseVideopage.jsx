import React from 'react'
import {BsFillCaretDownFill} from 'react-icons/bs'
import VideoDropDown from './VideoDropDown';
import {motion} from 'framer-motion';

const CourseVideopage = ({course,handleDropdownToggle,isActive,setSubtitleIndex,sectionIndex, setVideoIndex}) => {
   
  return (
    
    <div className="course-video-page">
                <div className="course-video">
                    <div className="content">
                       <h4>Course Content</h4>
                    </div>
                </div>
                <div className="course-video-link">
                    {course.videoContent.map((courses,videoIndex)=>
                    <div className="dropdown">
                        <div className="dropdown-btn" onClick={()=> handleDropdownToggle(videoIndex)} >
                            <h5 key={videoIndex}>
                                {courses.title}
                            </h5>
                            <span className='arrow'><BsFillCaretDownFill /></span>
                        </div>
                        <VideoDropDown 
                        setVideoIndex={setVideoIndex}
                        sectionIndex={sectionIndex}
                        courses={courses}
                        videoIndex={videoIndex}
                        isActive={isActive}
                        setSubtitleIndex={setSubtitleIndex}
                        />
                    </div>
                    )}
        </div>
        <div className="blank"></div>
   </div>             
  )
}

export default CourseVideopage