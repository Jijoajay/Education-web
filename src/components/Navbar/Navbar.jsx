import './Navbar.css'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import flashapi from '../api/flashapi';
import { FaUserAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

const Navbar = ({search,setSearch,handleSubmit,authenticate,setAuthenticate, courses}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState('home')
    const [isHover, setIsHover] = useState(false)
    const handleClick = ()=>{
        setIsOpen(!isOpen)
    }
    const handleLogOut = async()=>{
        const token = localStorage.getItem("token")
        console.log("token",token);
        // localStorage.removeItem("token")
        try{
            if(!token)console.log("No token found")
            
            await flashapi.post("/logout",{},{
                headers: {
                    "Authorization":`Bearer ${token}`
                }
            });
            localStorage.removeItem("token")
            setAuthenticate(false)
            navigate('/')
        }catch(err){
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
            }
            else if(err.request){
                console.error(err.request)
            }else{
                console.error(err.message);
            }
        }
    }
    const categorySet = new Set();

    courses.forEach((course) => {
    categorySet.add(course.category);
    });
    const categoryArray = Array.from(categorySet)

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
                <li onClick={()=>setActive('home')}><Link to='/' style={{textDecoration:'none',color:'white'}}>Home</Link>{active === 'home' ? <hr />:<></>}</li>
                <li onMouseEnter={()=>setIsHover(true)} 
                onMouseLeave={()=>setIsHover(false)}
                onClick={()=>{setActive('courses'); setIsHover(false)}
                }><Link to='/courses' style={{textDecoration:'none',color:'white', transition: .4 }}>Courses</Link>{active === 'courses' ? <hr />:<></> }</li>
                {isHover &&
                    <div className='hover-container' onMouseEnter={()=>setIsHover(true)}
                    onMouseLeave={()=>setIsHover(false)}
                    >
                        { categoryArray.map((category,index)=>{
                            return(
                                <div className="course-items" key={index}>
                                    <Link to={`/${category}/courses`} style={{textDecoration:"none"}}><p style={{color:"rgb(217,52,109)"}}>{category}</p></Link>
                                </div>
                            )
                            })
                        }
                    </div>
                }
                { authenticate ?(
                    <li onClick={handleLogOut} style={{textDecoration:'none',color:'white'}} > logout{active === 'signup' ? <hr />:<></>}</li>
                ):(
                    <>
                    <li onClick={()=>setActive('signup')}><Link to='/sign-in' style={{textDecoration:'none',color:'white'}}>Sign Up</Link>{active === 'signup' ? <hr />:<></>}</li>
                    <li onClick={()=>setActive('signin')}><Link to='/sign-up' style={{textDecoration:'none',color:'white'}}>Sign In</Link>{active === 'signin' ? <hr />:<></>}</li>
                    </>
                )
                }
            </ul>
        </div>
        <div className="icon">
            {authenticate &&
                <>
                    <div className="mylearning-icon">
                        <Link to="/myLearning" ><IoBookSharp /></Link>
                    </div>
                    <div className="favourite">
                        <Link to="/favourites" ><IoHeart /></Link>
                    </div>
                    <div className="user-icon">
                    <Link to="/user"><FaUserAlt /></Link>
                    </div>
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