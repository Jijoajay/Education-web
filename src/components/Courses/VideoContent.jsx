import React, { useState, useEffect } from 'react'
import "./AddCourse.css"
import { storage } from '../../firebase';
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

const VideoContent = ({videoContent,setVideoContent,handleSubmit}) => {
    const [sectionTitle, setSectionTitle] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [video, setVideo] = useState(null);
        
    useEffect(() => {
      console.log("videoLinkEffect", videoLink);
    }, [videoLink]);

    const handleAddVideo = async (e) => {
      try {
        if (video) {
          const videoRef = ref(storage, `course-video/${video.name}`);
          console.log(videoRef);
          
          try {
            await uploadBytes(videoRef, video);
            alert("video uploaded");
            
            const videoUrl = await getDownloadURL(videoRef);
            console.log(videoUrl);
    
            setVideoLink(videoUrl);
    
            if (sectionTitle !== "") {
              const newVideoEntry = {
                title: sectionTitle,
                subtitle: [
                  {
                    content: videoTitle,
                    videoLink: videoUrl,
                  },
                ],
              };
    
              console.log("videoLink1.1", videoUrl);
              setVideo(null);
              console.log("entry", newVideoEntry);
              setVideoContent([...videoContent, newVideoEntry]);
              setSectionTitle("");
              setVideoTitle("");
              setVideoLink("");
            } else {
              if (videoContent.length >= 0) {
                const lastSectionIndex = videoContent.length - 1;
                const newSubtitleEntry = {
                  content: videoTitle,
                  videoLink: videoUrl,
                };
                console.log("videoLink1.2", videoUrl);
                setVideo(null);
                setVideoContent((prevContent) => {
                  const updatedContent = [...prevContent];
                  updatedContent[lastSectionIndex].subtitle.push(newSubtitleEntry);
                  return updatedContent;
                });
                setVideoTitle("");
                setVideoLink("");
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          setVideo(null);
          setVideoTitle("");
          setVideoLink("");
        }
      } catch (error) {
        console.error("Error in handleAddVideo:", error);
      }
    };
    
    
    const handleRemoveVideo= (index) =>{
        const updatedVideoContent = [...videoContent]
        updatedVideoContent.splice(index,1)
        setVideoContent(updatedVideoContent)   
    }
    const handleVideoChange = (e) => {
      if (e.target.files[0]) {
        setVideo(e.target.files[0]);
      }
    };
  return (
    <>
    <div className="videoContentContainer">
        {videoContent.map((point,index)=>{
            return <div className="videoContent" key={index}>
            <div>
            <h3>{point.title}</h3>
            <p>{point.subtitle[0].content}</p>
            </div>
            <button  type="button" onClick={() => handleRemoveVideo(index)} className='removeButton'>Remove</button>
        </div>
        })}
    </div>
    <label htmlFor="videodetails">Title of the section:</label>
    <input type="text" value={sectionTitle} onChange={(e)=>setSectionTitle(e.target.value)} placeholder='section title' />
    <label htmlFor="videocontent">Title of the video:</label>
    <input type="text" value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)} placeholder='name of the video' />
    <label htmlFor="videocontent">Add the Video:</label>
    <input type="file" onChange={handleVideoChange} />
    
    <button type='button' onClick={(e)=>handleAddVideo(e)}> Add video </button>
    <button  className="submitbutton" type='submit'> Submit</button>
    </>
  )
}
export default VideoContent