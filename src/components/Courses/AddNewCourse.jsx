import React, { useContext, useState } from 'react'
import "./AddCourse.css"
import CourseDetail from './CourseDetail'
import LearningDetail from './LearningDetail'
import VideoContent from './VideoContent'
import { useNavigate } from 'react-router-dom'
import flashapi from '../api/flashapi'
import { storage } from '../../firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { DataContext} from '../context/DataContext'

const AddNewCourse = () => {
    const {courses,setCourses, user} = useContext(DataContext)
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(1)
    const [courseName , setCourseName] = useState("")
    const [courseAuthor , setCourseAuthor] = useState("")
    const [oldPrice , setOldPrice] = useState("")
    const [newPrice , setNewPrice] = useState("")
    const [learningPoint, setLearningPoint] = useState([])
    const [videoContent, setVideoContent] = useState([])
    const [img, setImg] = useState("")
    const [imgFile, setImgFile] = useState(null)
    const [category, setCategory] = useState("")

    const handleNextSection = (e)=>{
        if(currentSection > 3){
            handleSubmit();
            navigate('/')
        }else{
            setCurrentSection(currentSection + 1)
        }
    }
    const handleRemoveVideo= (index) =>{
        const updatedVideoContent = [...videoContent]
        updatedVideoContent.splice(index,1)
        setVideoContent(updatedVideoContent)   
    }
    const handleRemovePoint = (index)=>{
        const editedWhatTheyLearn = [...learningPoint]
        editedWhatTheyLearn.splice(index,1)
        setLearningPoint(editedWhatTheyLearn)
    }

    const handleSubmit = async(e)=>{
        if(e)e.preventDefault();
        console.log("handleSubmit process started");
        let newCourse = null;
        if(imgFile){
            const imgRef = ref(storage, `course-img/${imgFile.name}`)
            try{
                await uploadBytes(imgRef, imgFile);
                const imgUrl = await getDownloadURL(imgRef)
                console.log("imgLink", imgUrl);
                setImg(imgUrl);
                alert("uploaded submitted successfully")
                const id = courses.length ? courses[courses.length -1].id + 1 : 0 ;
                console.log("img1",img)
                newCourse = {
                    "id":id,
                    "admin_id": user['id'],
                    "category":category,
                    "name":courseName,
                    "author":courseAuthor,
                    "oldPrice":oldPrice,
                    "newPrice":newPrice,
                    "img":imgUrl,
                    "courseOffers": "https://dme2wmiz2suov.cloudfront.net/websitebuilder/792/utils/2329757-What_we_offer_in_this_program_(6).png",
                    "whatYouLearn": learningPoint, 
                    "videoContent": videoContent
                }
                console.log("saving details in the database");
            }catch(err){
                console.log(err)
            }
        }
        try {
            if (newCourse) {
              const response = await flashapi.post('/add-courses', newCourse);
              const allCourses = [...courses, response.data];
              setCourses(allCourses);
              setCourseName("");
              setCourseAuthor("");
              setOldPrice("");
              setNewPrice("");
              console.log(newCourse);
              navigate('/courses');
            } else {
              // Handle the case when there is no imgFile
              console.log("No imgFile, cannot create newCourse");
            }
          } catch (err) {
            console.log(`handleSubmit:Error:${err}`);
          }
    }
  return (
    <main className='addCoursePage'>
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
                <div className="videoContenT Content" onClick={()=>setCurrentSection(3)}>
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
                    <form className='addForm' onSubmit={handleSubmit}>
                        {currentSection === 1 && <CourseDetail 
                        courseAuthor={courseAuthor}
                        category = {category}
                        setCategory = {setCategory}
                        courseName={courseName}
                        oldPrice={oldPrice}
                        newPrice={newPrice}
                        setCourseAuthor={setCourseAuthor}
                        setCourseName={setCourseName}
                        setOldPrice={setOldPrice}
                        setNewPrice={setNewPrice}
                        imgFile={imgFile}
                        setImgFile={setImgFile}
                        handleNextSection = {handleNextSection}
                        />}
                        {currentSection === 2 && <LearningDetail 
                        learningPoint={learningPoint}
                        setLearningPoint={setLearningPoint}
                        handleNextSection = {handleNextSection}/>}
                        {currentSection === 3 &&  <VideoContent 
                        videoContent={videoContent}
                        setVideoContent={setVideoContent}
                        handleSubmit={handleSubmit}
                        handleRemoveVideo = {handleRemoveVideo}
                        />}
                    </form>
                </div>
            </div>
            {
                currentSection === 2 &&
                <div className="display-container">
                    <div className="display-videoItems">
                        {learningPoint.map((point,index)=>{
                            return <div key={index}>
                                        <p>{point.title}</p>
                                        <button  type="button" onClick={() => handleRemovePoint(index)} className='removeButton'>Remove</button>
                                    </div>
                            
                        })}
                    </div>
                </div>
            }
            {currentSection === 3 &&
                <div className="display-container">
                <div className="display-videoItems">
                    {videoContent.map((point,index)=><div className="videoContent" key={index}>
                    <div>
                        <h3>{point.title}</h3>
                        <p>{point.subtitle[0].content}</p>
                        <p>{point.subtitle[0].videoDescription}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveVideo(index)} className='removeButton'>Remove</button>
                    </div>)}
                </div>
                </div>
            }
    </main>
  )
}

export default AddNewCourse