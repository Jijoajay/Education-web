import React from 'react'

const EditCourseDetail = ({editName,editAuthor,editImg,editOldPrice,editNewPrice,setEditName,
setEditAuthor,setEditImg,setEditOldPrice,setEditNewPrice,handleNextSection,setEditImgFile}) => {
    const handleImg =(e)=>{
        e.preventDefault();
        setEditImgFile(e.target.files[0])
    }
      return (
            <>
                <label htmlFor="name">Course Name:</label>
                <input type="text" 
                value={editName}
                onChange={(e)=>setEditName(e.target.value)}
                    placeholder='course name'/>
                <label htmlFor="author">Course Author:</label>
                <input type="text"  
                value={editAuthor}
                onChange={(e)=>setEditAuthor(e.target.value)}
                placeholder='course author'/>
                <label htmlFor="author">New Price:</label>
                <input type="text" 
                value={editNewPrice}
                onChange={(e)=>setEditNewPrice(e.target.value)} 
                placeholder='course new Price'/>
                <label htmlFor="author">Old Price:</label>
                <input type="text"
                value={editOldPrice}
                onChange={(e)=>setEditOldPrice(e.target.value)}  
                placeholder='course old Price'/>
                <label htmlFor="img">course img:</label>
                <input type="file"  onChange={(e)=>handleImg(e)} />
                <button type='button' onClick={()=>handleNextSection()}>submit</button>
             </>
      )
    }

export default EditCourseDetail