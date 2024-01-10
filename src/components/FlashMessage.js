import React,{useState} from 'react'
import { RxCross1 } from "react-icons/rx";
export const FlashMessage = ({message}) => {
  return (
    <div className='flash'>
            {message}
            <RxCross1 />
    </div>
  )
}
