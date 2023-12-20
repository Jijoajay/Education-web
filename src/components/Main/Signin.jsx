import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import flashapi from '../api/flashapi'
const Signin = ({setAuthenticate}) => {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response =  await flashapi.post('/login',{
        email:loginEmail,password:loginPassword
      })
      console.log(response.status);
      if(response.status === 201){
        localStorage.setItem("token",response.data.tokens);
        console.log("loggedIn:",response.data);
        setAuthenticate(true)
        navigate('/')
        setLoginEmail("")
        setLoginPassword("")
      }else{
        alert("Invalid Email or Password")
      }
    }catch(err){
      console.log(err.message);
    }
    }
  return (
    <main className='signup-page'>
      <div className="signup-container">
          <h2 className='signupH2'>Sign In</h2>
          <div className="signupform">
          <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label><br />
              <input 
              type="email" 
              placeholder='Enter your email...' 
              value={loginEmail}
              onChange={(e)=>setLoginEmail(e.target.value)}
              /><br />
              <label htmlFor="password">Password:</label><br />
              <input 
              type="password" 
              placeholder='Enter your password...' 
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
              /><br />
              <button type="submit">Submit</button>
          </form>
          </div>
      </div>
    </main>
  )
}

export default Signin