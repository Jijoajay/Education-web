import React, { useState } from 'react'
import Video from './Video';
import Demo from '../../Demo';
import {motion,AnimatePresence} from "framer-motion";

const VideoDropDown = ({courses,isActive,videoIndex,setSubtitleIndex,setVideoIndex}) => {
    const [activeVideo,setActiveVideo] = useState(Array(courses.subtitle.length).fill(false));
    const handleClick = (index)=>{
        console.log(`videoIndex:${index}`)
        let newActivevideo = Array(courses.subtitle.length).fill(false);
        console.log("newActivevideo",newActivevideo);
        newActivevideo[index] = !newActivevideo[index]
        setSubtitleIndex(index)
        setActiveVideo(newActivevideo)
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
               onClick={(e)=>{handleClick(index); 
                 setVideoIndex(course.id) }}
               transition={{ duration: 0.5 }}
               >
                   {course.content} 
               </motion.li> 
            )}
        </motion.div>
    }
    </AnimatePresence>
    
  )
}

export default VideoDropDown