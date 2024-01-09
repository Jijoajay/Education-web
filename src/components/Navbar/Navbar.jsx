import './Navbar.css'
import React, { useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import flashapi from '../api/flashapi';
import { FaUserAlt } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import Hover, { CategoryHover, InfoHover} from './Hover';

const Navbar = ({search,setSearch,handleSubmit,authenticate,setAuthenticate, courses, boughtCourses, favour,handleFavouriteClick, favourite,info}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState('home')
    const [isHover, setIsHover] = useState(false)
    const [menu, setMenu] = useState("");

    const handleClick = ()=>{
        setIsOpen(!isOpen)
    }
    const handleLogOut = async()=>{
        const token = localStorage.getItem("token")
        console.log("token",token);
        try{
            if(!token)console.log("No token found")
            await flashapi.post("/logout",{},{
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            });
            setAuthenticate(false)
            navigate('/')
        }catch(err){
            if(err.response){
                if(err.response.status === 401 || err.response.status === 404){
                    localStorage.removeItem("token")
                    setAuthenticate(false)
                    navigate('/sign-in')
                }else{
                    console.log(err.response.data);
                    console.log(err.response.status);
                }
            } else if (err.request) {
                console.error(err.request);
            } else {
                console.error(err.message);
            }

            }
    }
    const categorySet = new Set();
    courses.forEach((course) => {
    categorySet.add(course.category);
    });
    const categoryArray = Array.from(categorySet)

    const handleMouseEnter = (menuType) => {
        setIsHover(true);
        setMenu(menuType);
      };
    
      const handleMouseLeave = () => {
        setIsHover(false);
        setMenu('');
      };
    const editProfile = async()=>{
        try {
            navigate('/user')
        } catch (error) {
            console.log(error);
        }
    }
    console.log("boughtCourse",boughtCourses)
  return (
    <nav className='nav'>
        <div className="logo">
            EdVerses
        </div>
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search courses' />
            </form>
        </div>
        <div className={`nav-items ${isOpen ? 'active' : ''}`}>
            <ul>
                <li onClick={()=>setActive('home')}><Link to='/'className='link' >Home</Link>{active === 'home' ? <hr />:<></>}</li>
                <li onMouseEnter={()=>handleMouseEnter("course")}
                onMouseLeave={()=>handleMouseLeave}
                onClick={()=>{setActive('courses'); setIsHover(false)}
                }><Link to='/courses' className='link'>Courses</Link>{active === 'courses' ? <hr />:<></> }</li>
                <CategoryHover 
                isHover={isHover}
                setIsHover={setIsHover}
                menu={menu}
                categoryArray={categoryArray}
                />
                { authenticate ?(
                    <li onClick={handleLogOut} className='link'> logout{active === 'signup' ? <hr />:<></>}</li>
                ):(
                    <>
                    <li onClick={()=>setActive('signup')}><Link to='/sign-in' className='link'>Sign Up</Link>{active === 'signup' ? <hr />:<></>}</li>
                    <li onClick={()=>setActive('signin')}><Link to='/sign-up' className='link'>Sign In</Link>{active === 'signin' ? <hr />:<></>}</li>
                    </>
                )
                }
            </ul>
        </div>
        <div className="icon">
            {authenticate &&
                <>
                    <Hover 
                    title={"myLearning"}
                    courses={boughtCourses}
                    favour={favour}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    setIsHover={setIsHover}
                    setActive={setActive}
                    isHover={isHover}
                    myLearning={true}
                    menu={menu}
                    />
                    <Hover 
                    title={"favourites"}
                    courses={favourite}
                    favour={favour}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    setIsHover={setIsHover}
                    setActive={setActive}
                    isHover={isHover}
                    menu={menu}
                    />
                    <div 
                    onMouseEnter={()=>handleMouseEnter("profile")}
                    onMouseLeave={()=>handleMouseLeave}
                    onClick={()=>{setActive('user-icon'); setIsHover(false)}}
                    className="user-icon">
                    <Link to="/user"><FaUserAlt /></Link>
                    </div>
                    {isHover && menu === "profile" && (
                    <div
                        className='user-hover-container'
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    > 
                    <InfoHover 
                    info={info}
                    editProfile={editProfile}
                    />
                    </div>
                        )}
                    </>
                }
            </div>
            <div className="hamburger-menu">
            <GiHamburgerMenu onClick={handleClick} className='menu'/>
            </div>
    </nav>
  )
}

export default Navbar