import React, { useState } from 'react'
import "./AddCourse.css"

const LearningDetail = ({learningPoint, setLearningPoint, handleNextSection, handleRemovePoint}) => {
    const [whatTheyLearn, setWhatTheyLearn] = useState("") 
    const handleAddPoint = async()=>{
        try{
            if(whatTheyLearn.trim() !== ""){
                    setLearningPoint([...learningPoint, { "title": whatTheyLearn }]);
                    setWhatTheyLearn("");
            }
        }catch(err){
            console.log(err.message);
        }
    }
    
  return (
    <>
    <label htmlFor="what they'll learn "> What they'll learn by your course</label>
    <input className='inputbox'
    type="text"
    value={whatTheyLearn || ""}
    onChange={(e)=>setWhatTheyLearn(e.target.value)}
    placeholder='what the student know from your course...' />
    <button type="button" onClick={(e) => handleAddPoint(e) }>
        Add Point
    </button>
    <button type="button" onClick={()=>handleNextSection()}>Next Page</button>
    </>
  )
}

export default LearningDetail