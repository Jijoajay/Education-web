import React from 'react'

const Video = ({activeVideo,index,course}) => {
  return (
    <>
    {activeVideo[index] && 
        <div className="video-display">
            <iframe
                key={index}
                src={course.videoLink}
                title={course.name}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            >
            </iframe>
        </div>
    }
    </>
  )
}

export default Video