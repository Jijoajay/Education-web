import './Navbar.css'
import React, { useState, Fragment} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import flashapi from '../api/flashapi';
import { FaUserAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { FaInstagram , FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

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
                <li onMouseEnter={()=>handleMouseEnter("course")}
                onMouseLeave={()=>handleMouseLeave()}
                onClick={()=>{setActive('courses'); setIsHover(false)}
                }><Link to='/courses' style={{textDecoration:'none',color:'white', transition: .4 }}>Courses</Link>{active === 'courses' ? <hr />:<></> }</li>
                {
                isHover  && menu ==="course" &&
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
                    <div 
                    onMouseEnter={()=>handleMouseEnter("myLearning")}
                    onMouseLeave={()=>handleMouseLeave}
                    onClick={()=>{setActive('myLearning'); setIsHover(false)}}
                    className="mylearning-icon">
                        <Link to="/myLearning" ><IoBookSharp /></Link>
                    </div>
                    {isHover && menu === "myLearning" &&
                        <div className='myLearning-hover-container' onMouseEnter={()=>setIsHover(true)}
                        onMouseLeave={()=>setIsHover(false)}
                        >
                           {boughtCourses.map((course, index)=>(
                            <div className="learning-product-con" key={index}>
                            <div className="learning-img-div">
                              <div className={ favour.length > 0 ? favour.includes(course.id) ? "learning-heart-icon-blacks" : "learning-heart-icons" : ""} onClick={()=>handleFavouriteClick(course.id)}>
                                <IoHeart />
                              </div>
                            <Link to={`/course/${course.id}`} key={course.id} style={{ textDecoration: 'none', color: 'black' }}>
                              <img src={course.img} alt={course.name} />
                            </Link>
                            </div>
                            <div className="learning-content-div">
                              <h4>{course.name}</h4>
                              <h5>Author: {course.author}</h5>
                              <p>Discounted Price: ₹{course.newPrice} Old Price: <span> ₹{course.oldPrice} </span></p>
                            </div>
                          </div>
                           ))}
                        </div>
                    }
                    <div 
                    onMouseEnter={()=>handleMouseEnter("favourites")}
                    onMouseLeave={()=>handleMouseLeave}
                    onClick={()=>{setActive('favourites'); setIsHover(false)}}
                    className="favourite">
                        <Link to="/favourites" ><IoHeart /></Link>
                    </div>
                    {isHover && menu === "favourites" &&
                        <div className='favourite-hover-container' onMouseEnter={()=>setIsHover(true)}
                        onMouseLeave={()=>setIsHover(false)}
                        >{
                            favourite ? (
                                 favourite.map((favourite)=>(
                                    <div className="learning-product-con">
                                        <div className="learning-img-div">
                                        <div className={ favour.includes(favourite.course.id) ? "heart-icon-blacks" : "heart-icons"} onClick={()=>handleFavouriteClick(favourite.course.id)}>
                                            <IoHeart />
                                        </div>
                                        <Link to={`/course/${favourite.course.id}`} key={favourite.course.id} style={{ textDecoration: 'none', color: 'black' }}>
                                        <img src={favourite.course.img} alt={favourite.course.name} />
                                        </Link>
                                        </div>
                                        <div className="learning-content-div">
                                        <h4>{favourite.course.name}</h4>
                                        <h5>Author: {favourite.course.author}</h5>
                                        <p>Discounted Price: ₹{favourite.course.newPrice} Old Price: <span> ₹{favourite.course.oldPrice} </span></p>
                                        </div>
                                    </div>
                                    ))
                                
                            ):(
                                <p>No Favorites Courses</p>
                            )
                        }
                        </div>
                    }
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
                    > {
                        info ? (
                            info.map((info,index) => (
                            <React.Fragment key={index}>
                                <div className="user-profile-title">
                                <h2>My Profile</h2>
                                </div>
                                <div className="user-prof">
                                    <div className="user-prof-img">
                                        <img src={info.profile_img} alt="" />
                                    </div>
                                    <div>
                                        <h2>{info.first_name + " " + info.last_name}</h2>
                                        <p>{info.Headline}</p>
                                    </div>
                                    <div>
                                        <div className="user-edit-icon" onClick={()=>editProfile()}><MdEdit /></div>
                                    </div>
                                </div>
                                <div className="user-social-icons">
                                    <Link to={info.youtube_link}><p><FaYoutube /></p></Link>
                                    <Link to={info.instagram_link}><p><FaInstagram /></p></Link>
                                    <Link to={info.linkedIn_link}><p><FaLinkedin /></p></Link>
                                </div>
                            </React.Fragment>
                            ))
                        ):(
                            <p>No records Found</p>
                        )
                     }
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