import React, { useState } from 'react'

const CourseDetail = ({setCourseAuthor,setCourseName,setNewPrice,setOldPrice,
courseAuthor,courseName,oldPrice,newPrice, handleNextSection,setImgFile, category, setCategory}) => {
  const handleImg =(e)=>{
    e.preventDefault();
    setImgFile(e.target.files[0])
  }
  return (
        <>
            <label htmlFor="name">Course Name:</label>
            <input type="text" 
            value={courseName}
            onChange={(e)=>setCourseName(e.target.value)}
                placeholder='course name'/>
            <label htmlFor="author">Course Author:</label>
            <input type="text"  
            value={courseAuthor}
            onChange={(e)=>setCourseAuthor(e.target.value)}
            placeholder='course author'/>
            <label htmlFor="author">New Price:</label>
            <input type="text" 
            value={newPrice}
            onChange={(e)=>setNewPrice(e.target.value)} 
            placeholder='course new Price'/>
            <label htmlFor="author">Old Price:</label>
            <input type="text"
            value={oldPrice}
            onChange={(e)=>setOldPrice(e.target.value)}  
            placeholder='course old Price'/>
            <input type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}  
            placeholder="Enter the Course's category "/>
            <label htmlFor="img">course img:</label>
            <input type="file"  onChange={handleImg} />
            <button type='button' onClick={()=>handleNextSection()}>submit</button>
         </>
  )
}

export default CourseDetail