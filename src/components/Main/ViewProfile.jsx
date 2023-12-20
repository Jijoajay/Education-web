import "./User.css"
import React from 'react'
import { FaInstagram , FaLinkedin, FaYoutube } from "react-icons/fa";
import { useState, useEffect } from "react";
import flashapi from "../api/flashapi";
import { Link, Navigate } from "react-router-dom";
import IsFavourite from "./IsFavourite";
import { MdEdit } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const ViewProfile = ({user, handleClick, favour, viewProfile, setViewProfile}) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const saveMyLearning = JSON.parse(localStorage.getItem("myLearning")) || false ;
    const [myLearning, setMyLearning] = useState(saveMyLearning)
    const [favourite, setFavourite] = useState([]);
    const [info, setInfo] = useState([]);
    const [fav, setFav] = useState(false);

    console.log(user ? user['id']:"null");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await flashapi.get(`/get_course/${user["id"]}`);
                console.log(response.data.course)  
                setCourses(Array(response.data.course))  
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        const fetchStorageData = async()=>{
            localStorage.setItem("mylearning",JSON.stringify(myLearning))
        }
        fetchStorageData();
        
        const fetchUserInfoData = async()=>{
            try {
                const response = await flashapi.get(`/get_user_info/${user["id"]}`)
                console.log("fetchUserInfo:",response.data);
                setInfo(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserInfoData();

        const fetchFavouriteData = async()=>{
            try {
              const response = await flashapi.get("/get-favourite");
              setFavourite(response.data)
            } catch (error) {
              console.log(error);
            }
          }
          fetchFavouriteData();
    }, [user, myLearning]); 

    const editProfile = async()=>{
        try {
            setViewProfile(!viewProfile)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <main className="view-profile">
        <div className="profile-title">
            <h2>My Profile</h2>
        </div>
        <div className="prof">
            <h2>{info.first_name + info.last_name}</h2>
            <p>{info.Headline}</p>
        </div>
        <div className="prof-img">
            <div>
                <div className="edit-icon" onClick={()=>editProfile()}><MdEdit /></div>
                <img src={info.profile_img} alt="" />
            </div>
            <div className="social-icons">
                <Link to={info.youtube_link}><p><FaYoutube /></p></Link>
                <Link to={info.instagram_link}><p><FaInstagram /></p></Link>
                <Link to={info.linkedIn_link}><p><FaLinkedin /></p></Link>
            </div>
        </div>
        <div className="prof-tablist">
            <ul>
                <li onClick={()=>setMyLearning(!myLearning)}>My Learning</li>
                <div className="vl"></div>
                <li onClick={()=>setFav(!fav)}>My Favourites</li>
            </ul>
        </div>
        <div className="tablist-courses">
            <div className="course-container">
            { myLearning &&
                <>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <div className="product-con">
                            <div className="img-div">
                                <div className={ favour.includes(course.id) ? "heart-icon-black" : "heart-icon"} onClick={()=>handleClick(course.id)}>
                                    <IoHeart />
                                </div>
                                <Link to={`/course/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                                    <img src={course.img} alt={course.name} />
                                </Link>
                            </div>
                            <div className="content-div">
                            <h4>{course.name}</h4>
                            <h5>Author: {course.author}</h5>
                            <p>Discounted Price: ₹{course.newPrice} Old Price: <span> ₹{course.oldPrice} </span></p>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div><h1>No Course Found</h1></div>
                        )}
                </>
                
            }
            {
                fav &&
                <IsFavourite favourite={favourite} favour={favour} handleClick={handleClick}/>
            }
            </div>
        </div>
    </main>
  )
}
