import React from 'react'
import { useState } from 'react'
const EditLearningDetail = ({editLearningPoint,setEditLearningPoint,handleNextSection, handleRemovePoint}) => {
    
    const [whatTheyLearn, setWhatTheyLearn] = useState("") 
    const handleAddPoint = async()=>{
        try{
            if(whatTheyLearn.trim() !== ""){
                    setEditLearningPoint([...editLearningPoint, { "title": whatTheyLearn }]);
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

export default EditLearningDetail