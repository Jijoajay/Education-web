import React from 'react'
import {Link} from "react-router-dom";
import "./Footer.css"
const Footer = () => {
  return (
    <footer>
        <nav>
            <div className='footer-nav'>
                <Link to='/'>Home</Link>
                <Link to='/courses'>Courses</Link>
                <Link to='/'>About</Link>
                <Link to='/contact'>Contact us</Link>
            </div>
        </nav>
    </footer>
  )
}

export default Footer