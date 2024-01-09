import React, { useState } from 'react'
import {motion,AnimatePresence} from "framer-motion";

const VideoDropDown = ({courses,isActive,videoIndex,setSubtitleIndex,setVideoIndex,count}) => {
    const [activeVideo,setActiveVideo] = useState(Array(courses.subtitle.length).fill(false));
    const handleClick = (index)=>{
        let newActivevideo = Array(courses.subtitle.length).fill(false);
        newActivevideo[index] = !newActivevideo[index]
        setSubtitleIndex(index)
        setActiveVideo(newActivevideo)
    }
    let completedVideo = []
    if(count){
      const complete = count.map(completedCourse=>completedCourse.video_index.map(video=>video))
      completedVideo = complete[0].map(video=>video.video_id)
    }
  return (
    <AnimatePresence>
    { isActive[videoIndex] && 
        <motion.div className="dropdown-content"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}
        >
            {courses.subtitle.map((course,index)=>
               <motion.li className='dropdown-items' 
               key={index}
               transition={{ duration: 0.5 }}
               >
                {count ? (
                  <>
                    <input type="checkbox" checked={completedVideo.includes(course.id)}/>
                    <p onClick={(e)=>{handleClick(index); 
                    setVideoIndex(course.id) }}>{course.content} </p>
                    <p>1:00</p>
                  </>
                ):(
                  <>
                    <p onClick={(e)=>{handleClick(index); 
                    setVideoIndex(course.id) }}>{course.content} </p>
                    <p>1:00</p>
                  </>

                )}
               </motion.li> 
            )}
        </motion.div>
    }
    </AnimatePresence>
    
  )
}

export default VideoDropDown