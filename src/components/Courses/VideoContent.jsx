import React, { useState, useEffect } from 'react'
import "./AddCourse.css"
import { storage } from '../../firebase';
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

const VideoContent = ({videoContent,setVideoContent,handleRemoveVideo}) => {
    const [sectionTitle, setSectionTitle] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [video, setVideo] = useState(null);
    useEffect(() => {
      console.log("videoLinkEffect", videoLink);
    }, [videoLink]);

    const handleAddVideo = async (e) => {
      try {
        console.log(video)
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
                    videoDescription: videoDescription,
                  },
                ],
              };
    
              setVideo(null);
              console.log("entry", newVideoEntry);
              setVideoContent([...videoContent, newVideoEntry]);
              setSectionTitle("");
              setVideoTitle("");
              setVideoLink("");
              setVideoDescription("");
            } else {
              if (videoContent.length >= 0) {
                const lastSectionIndex = videoContent.length - 1;
                const newSubtitleEntry = {
                  content: videoTitle,
                  videoLink: videoUrl,
                  videoDescription: videoDescription,
                };
                console.log("newSubtitleEntry", newSubtitleEntry);
                setVideo(null);
                setVideoContent((prevContent) => {
                  const updatedContent = [...prevContent];
                  updatedContent[lastSectionIndex].subtitle.push(newSubtitleEntry);
                  return updatedContent;
                });
                setVideoTitle("");
                setVideoLink("");
                setVideoDescription("");
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          setVideo(0);
          setVideoTitle("");
          setVideoLink("");
          setVideoDescription("");
        }
      } catch (error) {
        console.error("Error in handleAddVideo:", error);
      }
    };
    
    
   
    const handleVideoChange = (e) => {
      if (e.target.files[0]) {
        setVideo(e.target.files[0]);
      }
    };
  return (
    <>
    <label htmlFor="videodetails">Title of the section:</label>
    <input type="text" value={sectionTitle} onChange={(e)=>setSectionTitle(e.target.value)} placeholder='section title' />
    <label htmlFor="videocontent">Title of the video:</label>
    <input type="text" value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)} placeholder='name of the video' />
    <label htmlFor="videocontent">Add the Video:</label>
    <input type="file" onChange={handleVideoChange} />
    <label htmlFor="videocontent">video description:</label>
    <input type="text" value={videoDescription} onChange={(e)=>setVideoDescription(e.target.value)} placeholder='add description of the video..' />
    <button type='button' onClick={(e)=>handleAddVideo(e)}> Add video </button>
    <button  className="submitbutton" type='submit'> Submit</button>
    </>
  )
}
export default VideoContent