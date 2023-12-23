import React from 'react'
import { useState } from 'react';
import { storage } from '../../firebase';
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

const EditVideoContent = ({editVideoContent,setEditVideoContent,handleSubmit, handleRemoveVideo}) => {
    const [sectionTitle, setSectionTitle] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("")
    const [video, setVideo] = useState(null);
    const [videoDescription, setVideoDescription] = useState("");
    const handleAddVideo = async()=>{
      if(video){
        const videoRef = ref(storage, 'course-video/')
        console.log(videoRef)
        try{
          await uploadBytes(videoRef, video)
          alert("video uploaded")
          const videoUrl = await getDownloadURL(videoRef);
          if(sectionTitle !== "" || editVideoContent.length >= 0){
            const newVideoEntry = {
                title: sectionTitle,
                subtitle:[{
                    content:videoTitle,
                    videoLink:videoUrl,
                    videoDescription:videoDescription
                }
                ] 
            }
            console.log(newVideoEntry)
            setVideo(null)
            setEditVideoContent([...editVideoContent , newVideoEntry])
            setSectionTitle("")
            setVideoTitle("")
            setVideoLink("");
            setVideoDescription("")
          }else{
            if (editVideoContent.length >= 0) {
              const lastSectionIndex = editVideoContent.length - 1;
              const newSubtitleEntry = {
                content: videoTitle,
                videoLink: videoUrl,
                videoDescription:videoDescription

              };
        
              setEditVideoContent((prevContent) => {
                const updatedContent = [...prevContent];
                updatedContent[lastSectionIndex].subtitle.push(newSubtitleEntry);
                return updatedContent;
              });
              setVideo(null);
              setVideoTitle("");
              setVideoLink("");
              setVideoDescription("")
            }
        }
        }catch(err){
          console.log(err)
        }
      }
      
  }
    
    
  return (
    <>
    <label htmlFor="videodetails">Title of the section:</label>
    <input type="text" value={sectionTitle} onChange={(e)=>setSectionTitle(e.target.value)} placeholder='section title' />
    <label htmlFor="videocontent">Title of the video:</label>
    <input type="text" value={videoTitle} onChange={(e)=>setVideoTitle(e.target.value)} placeholder='name of the video' />
    <label htmlFor="videocontent">Video link:</label>
    <input type="file" onChange={(e)=>setVideo(e.target.files[0])} />
    <label htmlFor="videocontent">video description:</label>
    <input type="text" value={videoDescription} onChange={(e)=>setVideoDescription(e.target.value)} placeholder='add description of the video..' />
    <button type='button' onClick={()=>handleAddVideo()}> Add video </button>
    <button  className="submitbutton" role='submit' onSubmit={handleSubmit}> Submit</button>
    </>
  )
}

export default EditVideoContent