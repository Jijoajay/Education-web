import { useState, useEffect} from "react";
import React from 'react'
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import flashapi from "../api/flashapi";
const CommentBox = ({course, sectionIndex, subtitleIndex, user}) => {
    const [allMessage, setAllMessage] = useState([]);
    const [message, setMessage] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [img, setImg] = useState(null);
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let newMessage = null;
        if(img){
            const imgRef = ref(storage, `message/${img.name}` )
            try {
                await uploadBytes(imgRef, img);
                const imgUrl = await getDownloadURL(imgRef)
                setImgLink(imgUrl)
                newMessage = {
                    user_id : user.id,
                    message: message,
                    img:imgUrl
                }
            } catch (error) {
                console.log("error found at imgHandling", error)
            }
        }else{
            newMessage = {
                user_id : user.id,
                message : message
                };
        }
        try {
            const response = await flashapi.post('/add-message',newMessage);
            const messages = [...allMessage, response.data]
            setAllMessage(messages)
            setImg(null)
            setImgLink(null)
            setMessage(null)
        } catch (error) {
            console.log("error found at sender", error)
        }
    }

  return (
    <div className='description-container'>
        <div className="title">
            {`${course.videoContent[sectionIndex].title}: ${course.videoContent[sectionIndex].subtitle[subtitleIndex].content}`}
        </div>
        <div className="description">
            <div className='title'>Description:</div>
            <p style={{color:"rgb(217,52,109)"}}>{`${course.videoContent[sectionIndex].subtitle[subtitleIndex].videoDescription}`}</p> 
        </div>
        <div className="comment-box">
            <div className="title">comment:</div>
                <div className="comment-div">
                    <div className='comment-form'>
                        <form>
                            {allMessage?.map((message, index)=>{
                                <div className="message-shower" key={index}>
                                    <p>{message.message}</p>
                                    {message.img ? 
                                    <p>{message.img}</p>
                                    : ""}
                                </div>
                            })}
                            <input type="textarea" 
                            placeholder="Enter the message here" 
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            />
                            <label>Add a File:</label>
                            <input type="file" 
                            onChange={(e)=>setImg(e.target.files[0])}
                            />
                            <button type="submit" onSubmit={handleSubmit}>submit</button>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CommentBox