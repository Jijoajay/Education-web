import { useState, useEffect, useRef} from "react";
import React from 'react'
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import flashapi from "../api/flashapi";
import { Link } from "react-router-dom";
const CommentBox = ({course, sectionIndex, subtitleIndex, user}) => {
    const [allMessage, setAllMessage] = useState([]);
    const [message, setMessage] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [img, setImg] = useState(null);
    const [reply, setReply] = useState("");
    const [allReply, setAllReply] = useState([]);
    
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let newMessage = null;
        if(img){
            const imgRef = ref(storage, `message/${img.name}` )
            try {
                await uploadBytes(imgRef, img);
                const imgUrl = await getDownloadURL(imgRef)
                setImgLink(imgUrl)
                if(user['role']=== "admin"){
                    newMessage = {
                        admin_id : user.id,
                        message: message,
                        img:imgUrl,
                        course_id: course.id
                    }
                }else{
                    newMessage = {
                        user_id : user.id,
                        message: message,
                        img:imgUrl,
                        course_id: course.id
                    }
                }
            } catch (error) {
                console.log("error found at imgHandling", error)
            }
        }else{
            if(user['role'] === "admin"){
                newMessage = {
                    admin_id : user.id,
                    message: message,
                    course_id: course.id
                }
            }else{
                newMessage = {
                    user_id : user.id,
                    message: message,
                    course_id: course.id
                }
            }
        }
        try {
            await flashapi.post('/add-message',newMessage);
            setImg(null)
            setImgLink(null)
            setMessage('')
        } catch (error) {
            console.log("error found at sender", error)
        }
    }
    const [replyStates, setReplyStates] = useState(allMessage.map(() => false));

    const handleReplyClick = (index) => {
        const updatedStates = [...replyStates];
        updatedStates[index] = !updatedStates[index];
        setReplyStates(updatedStates);
    };
    useEffect(()=>{
        const fetchUserMessage = async()=>{
            try {
                const res =  await flashapi.get(`/get-messages/${course.id}`);
                setAllMessage(res.data)
            } catch (error) {
                console.log("error found at gettin message", error)                
            }
        }
        fetchUserMessage();

        const fetchUserReply = async () => {
    try {
        const promises = allMessage.map(async (message) => {
            const res = await flashapi.get(`/get-reply/${message.id}`);
            console.log("worked....")
            console.log(res.data)
            return res.data;
        });

        const allReplies = await Promise.all(promises);
        const flattenedReplies = allReplies.flat(); 
        setAllReply(flattenedReplies);
    } catch (error) {
        console.error("Error fetching replies:", error);
    }
    };
    fetchUserReply();

    },[setAllMessage,setAllReply,replyStates])

    
    const handleReplySubmit = async(id,e)=>{
        let newReply = null;
        try {
            e.preventDefault();
            if(user['role'] === "admin"){
                newReply = {
                    admin_id : user['id'],
                    reply: reply,
                    course_id: course.id
                }
            }else{
                newReply = {
                    user_id : user['id'],
                    reply: reply,
                    course_id: course.id
                }
            }
            const response = await flashapi.post(`/add-reply/${id}`, newReply)
            console.log("response.data",response.data)
            setReply("");
        } catch (error) {
            console.log("error found at reply sender", error)
        }
    }


    return (
    <div className='description-container'>
        <div className="title">
            {`${course?.videoContent[sectionIndex].title}: ${course?.videoContent[sectionIndex].subtitle[subtitleIndex].content}`}
        </div>
        <div className="description">
            <div className='title'>Description:</div>
            <p style={{color:"rgb(217,52,109)"}}>{`${course?.videoContent[sectionIndex].subtitle[subtitleIndex].videoDescription}`}</p> 
        </div>
        <div className="comment-box">
            <div className="title">comment:</div>
                <div className="comment-div">
                    <div className='comment-form'>
                        <form>
                        {allMessage?.map((message, index) => (
                         <div className="message-shower" key={index}>
                                        <div className="profile-image">
                                            {message.admin && message.admin?.user_info && (
                                                <Link to={`/user/${message.admin.id}`}><img src={message.admin?.user_info[0].profile_img} alt="" /></Link>
                                            )}
                                            {message.user && message.user?.user_info && (
                                                <Link to={`/user/${message.user.id}`}><img src={message.user?.user_info[0].profile_img} alt="" /></Link>
                                            )}
                                        </div>
                                    <div>
                                    <div className="user-name">
                                        {   
                                            message.user?.id === user['id'] ||
                                            message.admin?.id === user['id'] ?
                                            <p>You</p>
                                            :
                                            <>
                                                {message.admin && message.admin?.user_info && (
                                                <p>{message.admin?.user_info[0].first_name} {"  "} {message.admin?.user_info[0].last_name}</p>
                                                )}
                                                {message.user && message.user.user_info && (
                                                <p>{message.user?.user_info[0].first_name} {"  "} {message.user?.user_info[0].last_name}</p>
                                                )}
                                            </>
                                        }
                                    </div>
                                    <div className="user-message">
                                        <p>{message.message}</p>
                                        {message.img ? <img src={message.img} alt="Message" /> : null}
                                    </div>
                                    <div className="rply">
                                        <p onClick={()=>handleReplyClick(index)}>reply</p>
                                        { replyStates[index]  &&
                                            <div className="form">
                                            {allReply.filter((reply)=>reply.message_id === message.id).map((filteredReply,replyIndex)=>{
                                            return(
                                                <div className="message-shower-reply" key={replyIndex}>
                                                    <div className="profile-image">
                                                        {filteredReply.admin && filteredReply.admin?.user_info && (
                                                            <img src={filteredReply.admin?.user_info[0].profile_img} alt="" />
                                                        )}
                                                        {filteredReply.user && filteredReply.user?.user_info && (
                                                            <img src={filteredReply.user?.user_info[0].profile_img} alt="" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="user-name">
                                                            {filteredReply.admin && filteredReply.admin?.user_info &&(
                                                                <p>{filteredReply.admin?.user_info[0].first_name}{" "}{filteredReply.admin?.user_info[0].last_name}</p>
                                                            )}
                                                            {filteredReply.user && filteredReply.user?.user_info && (
                                                            <p>{filteredReply.user?.user_info[0].first_name} {"  "} {filteredReply.user?.user_info[0].last_name}</p>
                                                            )}
                                                        </div>
                                                        <div className="user-message">
                                                            <p>{filteredReply.reply}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            })}
                                            <div className="profile-image input">
                                                <img src={user?.user_info[0].profile_img} alt="" />
                                                <input type="text" 
                                                placeholder="Enter the message here" 
                                                value={reply}
                                                onChange={(e)=>setReply(e.target.value)}
                                                />
                                            </div>
                                            <p onClick={(e)=>handleReplySubmit(message.id,e)} className="submitButton">submit</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                         ))}
                            <div className="profile-image input">
                                <img src={user?.user_info[0].profile_img} alt="" />
                                <input type="textarea" 
                                placeholder="Enter the message here" 
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)}
                                />
                            </div>
                            <label>Add a File:</label>
                            <input type="file" 
                            onChange={(e)=>setImg(e.target.files[0])}
                            />
                            <button type="submit" onClick={(e)=>handleSubmit(e)}>submit</button>
                        </form>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CommentBox