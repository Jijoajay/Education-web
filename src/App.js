import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Main/Home'
import Courses from './components/Courses/Courses'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Main/Signup';
import Signin from './components/Main/Signin';
import Contact from './components/Main/Contact';
import React from 'react'
import CoursePage from './components/Courses/CoursePage';
import AddNewCourse from './components/Courses/AddNewCourse';
import Edit from './components/Courses/Edit';
import BuyCourse from './components/Courses/BuyCourse';
import MyLearning from './components/MyLearning';
import User from './components/Main/User';
import Demo from './Demo';
import { ViewProfile } from './components/Main/ViewProfile';
import { DataProvider } from './components/context/DataContext';
function App() {
  

  return (
    <div className="App">
      <DataProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/courses'>
              <Route index element={<Courses />}/>
              <Route path=':id' element={<CoursePage />}/>
              <Route path='addnewcourse' element={<AddNewCourse />}/>
          </Route>
          <Route path='/:category/courses' element={<Courses />}/>
          <Route path='/editcourse/:id' element={<Edit />}/>
          <Route path='/course/:id' element={<BuyCourse />}/>
          <Route path='/sign-in' element={<Signup />}/>
          <Route path='/sign-up' element={<Signin />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/myLearning'  element={<MyLearning 
          coursee = {true}
          favs = {false}
          />} />
          <Route path='/user' element={<User />}/>
          <Route path='/user/:id' element={ <ViewProfile ViewProfile={false} />}/>
          <Route path="/favourites" element={<MyLearning 
          favs = {true}
          coursee = {false}
          />}/>
          <Route path='/edit-user' element={<User />}/>
          <Route path='/demo' element={<Demo />}/>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
