import React, {useContext, useEffect, useState} from 'react'
import './User.css';
import flashapi from '../api/flashapi';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewProfile } from './ViewProfile';
import { DataContext} from '../context/DataContext';

const User = () => {
    const {user, favour, handleClick, favourite,courses,info} = useContext(DataContext)
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [headline, setHeadline] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [websiteLink, setWebsiteLink] = useState("")
    const [youtubeLink, setYoutubeLink] = useState("")
    const [instagramLink, setInstagramLink] = useState("")
    const [facebookLink, setFacebookLink] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [currentSection, setCurrentSection] = useState(0);
    const saveProfile = JSON.parse(localStorage.getItem("viewProfile")) || false;
    const [viewProfile, setViewProfile] = useState(saveProfile)
    
    useEffect(()=>{
        const fetchLocalData = ()=>{
            localStorage.setItem("viewProfile",JSON.stringify(viewProfile))
        }
        fetchLocalData();
    },[viewProfile])

    const nextSection = ()=>{
        if(currentSection === 2){
            setCurrentSection(0)
        }else{
            setCurrentSection(currentSection +1)
        }
    }

    const handleSubmit = async(e)=>{
        console.log("its working here but...");
        if(e)e.preventDefault();
        const userData = {
             "firstName":firstName,
             "lastName":lastName,
             'headline':headline,
             "phoneNumber":PhoneNumber,
             "websiteLink":websiteLink,
             'youtubeLink':youtubeLink,
             "instagramLink":instagramLink,
             "LinkedInLink":facebookLink,
             'profileImg':profileImg
         }
        try {
            const response = await flashapi.post(`/add-user-detail/${user['id']}`, userData)
            console.log(response.data);
            navigate('/')
            alert(response.data.message)
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <main className='user-page'>
        { !viewProfile  ?(
        <>
        <div className="side-content">
            <div className="profile">
                <img src={profileImg || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"} alt="profile" />
            </div>
            <div className="userInfo">
                <h1>{firstName + lastName || "Name"}</h1>
                <p>{headline || "headline"}</p>
            </div>
            <div className="dropdown-content">
                <ul>
                    <li onClick={()=>setViewProfile(!viewProfile)}>View Public Profile</li>
                    <li onClick={()=>setCurrentSection(0)}> Profile </li>
                    <li onClick={()=>setCurrentSection(1)}>Photo</li>
                </ul>
            </div>
        </div>
        <div className="user-info-form">
            <div className="title-div">
                {currentSection === 0 ? (
                    <>
                        <h4>Public Profile</h4>
                        <p>Add information about yourself</p>
                    </>
                ):(
                    <>
                        <h4>Photo</h4>
                        <p>Add a nice photo of yourself for your profile.</p>
                    </>
                )
            }
            </div>
            <div className="profile-form">
            {currentSection === 0 ? (
                    <>
                        <form>
                            <label className='links'>basic:</label>
                            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                            <input type="text" placeholder='Headline' value={headline} onChange={(e)=>setHeadline(e.target.value)}/>
                            <label>Add a professional headline like, "developer" or "Architect."</label>
                            <input type="text" placeholder='Phone Number' value={PhoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                            <label className='links'>Links:</label>
                            <input type="text" placeholder='website' value={websiteLink} onChange={(e)=>setWebsiteLink(e.target.value)} />
                            <input type="text" placeholder='Youtube Link' value={youtubeLink} onChange={(e)=>setYoutubeLink(e.target.value)} />
                            <input type="text" placeholder='Instagram Link' value={instagramLink} onChange={(e)=>setInstagramLink(e.target.value)} />
                            <input type="text" placeholder='LinkedIn Link' value={facebookLink} onChange={(e)=>setFacebookLink(e.target.value)}/>
                            <div className="div">
                                <button type='button' onClick={()=>nextSection()}>Save</button>
                            </div>
                        </form>
                    </>
                ):(
                    <>
                        <div className="img-container">
                            <div className="photo-img">
                            <img src={profileImg || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"} alt={profileImg} />
                            </div>
                            <div className="upload-form">
                                <input type="text" placeholder='Img address' value={profileImg} onChange={(e)=>setProfileImg(e.target.value)}/>
                            </div>
                            <div className="div">
                                <button type='submit' onClick={()=>handleSubmit()}>Upload</button>
                            </div>
                        </div>
                    </>
                )
            }
                
            </div>
        </div>
        </>
        ):(
            <>
                <ViewProfile 

                info={info}
                user={user}
                favour={favour}
                handleClick={handleClick}
                viewProfile = {viewProfile}
                setViewProfile={setViewProfile}
                favourite={favourite}
                courses={courses}
                />

            </>
        )
        }
    </main>
  )
}

export default User