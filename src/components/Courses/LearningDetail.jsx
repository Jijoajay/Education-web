import React, { useState } from 'react'
import "./AddCourse.css"

const LearningDetail = ({learningPoint, setLearningPoint, handleNextSection}) => {
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
    const handleRemovePoint = (index)=>{
        const editedWhatTheyLearn = [...learningPoint]
        editedWhatTheyLearn.splice(index,1)
        setLearningPoint(editedWhatTheyLearn)
    }
  return (
    <>
    <label htmlFor="what they'll learn "> What they'll learn by your course</label>
    <div className='learningPointContainer'>
        {learningPoint.map((point,index)=>{
            return <div className="learningPoint" key={index}>
                <p>{point.title}</p>
                <button  type="button" onClick={() => handleRemovePoint(index)} className='removeButton'>Remove</button>
            </div>
        })}
    </div>
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