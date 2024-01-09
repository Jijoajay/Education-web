import React from 'react'
import { FaInstagram , FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const SocialIcons = ({item}) => {
  return (
    <>
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
    </>
  )
}
