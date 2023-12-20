import React, { useEffect, useState } from 'react'
import "./AddCourse.css"
import { useParams,Link } from 'react-router-dom'
import api from "../api/fetch"
import { useNavigate } from 'react-router-dom'
import EditCourseDetail from './EditCourseDetail'
import EditLearningDetail from './EditLearningDetail'
import EditVideoContent from './EditVideoContent'
import flashapi from '../api/flashapi'
import { storage } from '../../firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

const Edit = () => {
    const {id}  = useParams();
    const [courses, setCourses] = useState([])
    useEffect(()=>{
      const fetchCourseData = async()=>{
        try{
          const response = await flashapi.get('/courses')
          setCourses(response.data)
        }catch(err){
          console.log(err.message);
        }
      }
      fetchCourseData()
    },[])
      const course = courses.find((course)=> (course.id).toString() === id);
    

    const navigate = useNavigate();
    const [currentSection,setCurrentSection] = useState(1)
    const [editName, setEditName] = useState("")
    const [editAuthor, setEditAuthor] = useState("")
    const [editOldPrice, setEditOldPrice] = useState("")
    const [editNewPrice, setEditNewPrice] = useState("")
    const [editImg, setEditImg] = useState("")
    const [editLearningPoint, setEditLearningPoint] = useState([])
    const [editVideoContent, setEditVideoContent] = useState([])
    const [editImgFile, setEditImgFile] = useState(null)


    const handleNextSection = (e)=>{
        if(currentSection > 3){
            handleSubmit();
            navigate('/')
        }else{
            setCurrentSection(currentSection + 1)
        }
    }

    const handleSubmit = async(e)=>{
        if(editImgFile){
            const imgRef = ref(storage, "course-img/")
            try{
                await uploadBytes(imgRef, editImgFile);
                alert("uploaded submitted successfully")
                const imgUrl = getDownloadURL(imgRef)
                imgUrl.then((link)=>{
                    console.log("imgLink",link)
                    setEditImg(link)
                })
                .catch((error)=>{
                    console.log(error)
                })
            }catch(err){
                console.log(err)
            }
        }
        e.preventDefault();
        const editedCourse = {
            "name":editName,
            "author":editAuthor,
            "oldPrice":editOldPrice,
            "newPrice":editNewPrice,
            "img":editImg,
            "courseOffers": "https://dme2wmiz2suov.cloudfront.net/websitebuilder/792/utils/2329757-What_we_offer_in_this_program_(6).png",
            "whatYouLearn": editLearningPoint, 
            "videoContent": editVideoContent,
            
        }
        try{
            console.log("editedCourse",editedCourse)
            const response = await flashapi.post(`/edit-courses/${id}`, editedCourse)
            console.log("editData",response.data)
            courses.map((course)=>{
                console.log("course_id",course.id)
                console.log("params_id",id)
            })
            const editedCourses = courses.map(course => course.id === id ?{...response.data}:course)
            setCourses(editedCourses)
            console.log("setEditedCourse",editedCourses)
            setEditName("")
            setEditAuthor("")
            setEditOldPrice("")
            setEditNewPrice("")
            navigate('/courses')
        }catch(err){
            console.log(`handleSubmit:Error:${err.message}`)
        }
    

    }
    useEffect(()=>{
      console.log("pre-data")
        if(course){
            setEditName(course.name)
            setEditAuthor(course.author)
            setEditNewPrice(course.newPrice)
            setEditOldPrice(course.oldPrice)
            setEditImg(course.img)
            setEditLearningPoint(course.whatYouLearn)
            setEditVideoContent(course.videoContent)
        }
    },[course,setEditAuthor,setEditName,setEditNewPrice,setEditOldPrice,setEditImg,setEditLearningPoint])


  return (
    <main className='addCoursePage'>
        { editName &&
            <>
            <div className="shower">
                <div className="courseDetail" onClick={()=>setCurrentSection(1)}>
                    <div className='courseDetail Content'>
                        <h3>Course Details</h3>
                        <div className='div'>
                            <div className={currentSection === 1 ? "activePoint" :"point"}></div>
                        </div>
                    </div>
                </div>
                <div className={ currentSection === 2 ? "activeLeftLine" : "lineleft"}></div>
                <div className="whatyoulearn" onClick={()=>setCurrentSection(2)}>
                    <div className="learn content">
                        <h3> What They'll Learn </h3>
                    <div className="div">
                        <div className={currentSection === 2 ? "activePoint" :"point"}></div>
                    </div>
                    </div>
                </div>
                <div className={ currentSection === 3 ? "activeRightLine" : "line"}></div>
                <div className="videoContent" onClick={()=>setCurrentSection(3)}>
                    <div className='videoDetail Content'>
                        <h3>Video Details & content </h3>
                    <div className="div">
                        <div className={currentSection === 3 ?"activePoint":"point"}></div>
                    </div>
                    </div>
                </div>
            </div>
            <div className='addCourse'>
                <div className="courseFormContainer">
                    <h3>{currentSection === 1 ? "Course Details" : currentSection === 2 ? "What they'll learn" : "video details & contents"}</h3>
                    <form className='addForm' encType="multipart/form-data" onSubmit={handleSubmit}>
                        {currentSection === 1 && <EditCourseDetail 
                        editAuthor={editAuthor}
                        editName={editName}
                        editOldPrice={editOldPrice}
                        editNewPrice={editNewPrice}
                        setEditAuthor={setEditAuthor}
                        setEditName={setEditName}
                        setEditOldPrice={setEditOldPrice}
                        setEditNewPrice={setEditNewPrice}
                        editImg={editImg}
                        setEditImg={setEditImg}
                        handleNextSection = {handleNextSection}
                        setEditImgFile={setEditImgFile}
                        />} 
                        {currentSection === 2 && <EditLearningDetail 
                        editLearningPoint={editLearningPoint}
                        setEditLearningPoint={setEditLearningPoint}
                        handleNextSection = {handleNextSection}/>}
                        {currentSection === 3 &&  <EditVideoContent
                        editVideoContent={editVideoContent}
                        setEditVideoContent={setEditVideoContent}
                        handleSubmit={handleSubmit}
                        />} 
                    </form>
                </div>
            </div>
        </>
        }
        { !editName &&
            <div className='coursePage'>
            <h2>course not Found</h2>
            <p>Please go back to the 
                <Link to='/'>home page</Link>
            </p>
    </div>
        }
    </main>
  )
}

export default Edit