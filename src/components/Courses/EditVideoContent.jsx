import React from 'react'
import { useState } from 'react';
import { storage } from '../../firebase';
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

const EditVideoContent = ({editVideoContent,setEditVideoContent,handleSubmit}) => {
    const [sectionTitle, setSectionTitle] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoLink, setVideoLink] = useState("")
    const [video, setVideo] = useState(null);

    const handleAddVideo = async()=>{
      if(video){
        const videoRef = ref(storage, 'course-video/')
        console.log(videoRef)
        try{
          await uploadBytes(videoRef, video)
          alert("video uploaded")
          const videoUrl = getDownloadURL(videoRef);
          videoUrl.then((link) => {
              console.log(link);
              setVideoLink(link);
          }).catch((err) => {
              console.log(err);
          });
        }catch(err){
          console.log(err)
        }
      }
      if(sectionTitle !== ""){
        const newVideoEntry = {
            "title": sectionTitle,
            "subtitle":[{
                "content":videoTitle,
                "videoLink":videoLink
            }
            ] 
        }
        console.log(newVideoEntry)
        setVideo(null)
        setEditVideoContent([...editVideoContent , newVideoEntry])
        setSectionTitle("")
        setVideoTitle("")
        setVideoLink("");
      }else{
        if (editVideoContent.length >= 0) {
          const lastSectionIndex = editVideoContent.length - 1;
          const newSubtitleEntry = {
            content: videoTitle,
            videoLink: videoLink,
          };
    
          setEditVideoContent((prevContent) => {
            const updatedContent = [...prevContent];
            updatedContent[lastSectionIndex].subtitle.push(newSubtitleEntry);
            return updatedContent;
          });
          setVideo(null);
          setVideoTitle("");
          setVideoLink("");
        }
    }
  }
    
    const handleRemoveVideo= (index) =>{
        const updatedVideoContent = [...editVideoContent]
        updatedVideoContent.splice(index,1)
        setEditVideoContent(updatedVideoContent)   
    }
  return (
    <>
    <div className="videoContentContainer">
        {editVideoContent.map((point,index)=>{
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
    <label htmlFor="videocontent">Video link:</label>
    <input type="file" onChange={(e)=>setVideo(e.target.files[0])} />

    <button type='button' onClick={()=>handleAddVideo()}> Add video </button>
    <button  className="submitbutton" role='submit' onSubmit={handleSubmit}> Submit</button>
    </>
  )
}

export default EditVideoContent