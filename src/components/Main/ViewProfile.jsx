import "./User.css"
import React, {Fragment} from 'react'
import { FaInstagram , FaLinkedin, FaYoutube } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import IsFavourite from "./IsFavourite";
import { MdEdit } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";

export const ViewProfile = ({user, handleClick, favour, viewProfile, setViewProfile, favourite,courses, info}) => {
    const navigate = useNavigate();
    const saveMyLearning = JSON.parse(localStorage.getItem("myLearning")) || false ;
    const [myLearning, setMyLearning] = useState(saveMyLearning)
    const [fav, setFav] = useState(false);

    console.log(user ? user['id']:"null");

    useEffect(()=>{
        const fetchStorageData = async()=>{
            localStorage.setItem("mylearning",JSON.stringify(myLearning))
        }
        fetchStorageData();

    },[myLearning])

    const editProfile = async()=>{
        try {
            setViewProfile(!viewProfile)
        } catch (error) {
            console.log(error);
        }
    }
    console.log("info",info)
    
    return (
        <main className="view-profile">
          {info.map((item, index) => (
            <div key={index}>
              <div className="profile-title">
                <h2>My Profile</h2>
              </div>
              <div className="prof">
                <h2>{item.first_name + " " + item.last_name}</h2>
                <p>{item.Headline}</p>
              </div>
              <div className="prof-img">
                <div>
                  <div className="edit-icon" onClick={() => editProfile()}>
                    <MdEdit />
                  </div>
                  <img src={item.profile_img} alt="" />
                </div>
                <div className="social-icons">
                  <Link to={item.youtube_link}>
                    <p>
                      <FaYoutube />
                    </p>
                  </Link>
                  <Link to={item.instagram_link}>
                    <p>
                      <FaInstagram />
                    </p>
                  </Link>
                  <Link to={item.linkedIn_link}>
                    <p>
                      <FaLinkedin />
                    </p>
                  </Link>
                </div>
              </div>
              <div className="prof-tablist">
                <ul>
                  <li onClick={() => setMyLearning(!myLearning)}>My Learning</li>
                  <div className="vl"></div>
                  <li onClick={() => setFav(!fav)}>My Favourites</li>
                </ul>
              </div>
            </div>
          ))}
          <div className="tablist-courses">
            <div className="course-container">
              {myLearning && (
                <>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div className="product-con" key={course.id}>
                        <div className="img-div">
                          <div
                            className={
                              favour.includes(course.id)
                                ? "heart-icon-black"
                                : "heart-icon"
                            }
                            onClick={() => handleClick(course.id)}
                          >
                            <IoHeart />
                          </div>
                          <Link
                            to={`/course/${course.id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <img src={course.img} alt={course.name} />
                          </Link>
                        </div>
                        <div className="content-div">
                          <h4>{course.name}</h4>
                          <h5>Author: {course.author}</h5>
                          <p>
                            Discounted Price: ₹{course.newPrice} Old Price:{" "}
                            <span> ₹{course.oldPrice} </span>
                          </p>
                        </div>
                      </div>
                    ))
                    ) : (
                        <div>
                      <h1>No Course Found</h1>
                    </div>
                  )}
                </>
              )}
              {fav && (
                <IsFavourite
                  favourite={favourite}
                  favour={favour}
                  handleClick={handleClick}
                />
              )}
            </div>
          </div>
          <div className="black"></div>
        </main>
      );
    };
