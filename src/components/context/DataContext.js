import { createContext, useState, useEffect } from "react";
import flashapi from '../api/flashapi';
import {useNavigate, useLocation} from "react-router-dom"

export const DataContext = createContext({});

export const DataProvider = ({children})=>{
  const navigate = useNavigate();
  const title = "My Learning"
  const [user, setUser] = useState(null)
  const [search,setSearch] = useState("")
  const [courses, setCourses] = useState([])
  const [searchResult,setSearchResult] = useState([])
  const [authenticate, setAuthenticate] = useState(false)
  const location =  useLocation();
  const [favourite, setFavourite] = useState([])
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [info, setInfo] = useState([]);
  const [favour, setFavour] = useState([])
  const [flashMessage, setFlashMessage] = useState({message:"", category:""})

  const showFlashMessage = (message, category)=>{
    setFlashMessage({message,category})
    setTimeout(() => {
      hideFlashMessage()
    }, 5000);
  }
  const hideFlashMessage = ()=>{
    setFlashMessage({message:null, category:null})
  }

  useEffect(
    ()=>{
      const fetchCourseData = async()=>{
        try{
          const response = await flashapi.get("/courses");
          setCourses(response.data)
        }catch(err){
          showFlashMessage(err.message);
        }
      }
      fetchCourseData();
  },[setCourses])
  useEffect(()=>{
      const fetchUserData = async()=>{
        try{
          const token = localStorage.getItem("token")
          console.log(token);
          if(token){
            try{
              const response = await flashapi.get(`/user-data/${token}`)
              console.log(response.status);
              console.log(response.data);
              setUser(response.data)
              console.log("setUser",response.data)
            }catch(err){
              console.log(err.message);
            }
            setAuthenticate(true)
          }else{
            setAuthenticate(false)
          }
        }catch(err){
          console.log(err.message);
        }
      }
      fetchUserData();
  },[])

    const handleSubmit = (e)=>{
      e.preventDefault();
      navigate('/courses')
    }
    const handleClick = async(course_id)=>{
      if(favour.includes(course_id)){
        const response = await flashapi.post('/remove-from-favourite', {course_id:course_id, user_id:user['id']})
        showFlashMessage(response.data.message, "success")
        console.log("favour",favour)
        const removeFavourite = favour.filter((data) => data !== course_id);
        setFavour(removeFavourite);
      }
      else{
        try{
          const response = await flashapi.post('/add-to-favorite', {course_id:course_id, user_id:user['id']})
          showFlashMessage(response.data.message,"success")
          setFavour([...favour, course_id])
        }catch(err){
          showFlashMessage(err.message, "error")
        }
      }
    }
   
  const handleRemoveCourse = async(course_id)=>{
    const response = await flashapi.get(`/remove-course/${course_id}`)
    showFlashMessage("Course deleted successfully");
  }
  useEffect(() => {
    const fetchData = async () => {
      const searchedResult = courses.filter((course) => {
        return course.name.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(searchedResult);
      console.log("oooooh")
      if (search && user && location.pathname === "/courses") {
        const searchDetail = {
          user_id: user.id,
          searchResult: search,
        };
  
        try {
          const response = await flashapi.post('/user-searchresult', searchDetail);
          console.log('response: ', response);
        } catch (error) {
          console.error('Error storing user search result:', error);
        }
      }
  
      if (location.pathname !== "/" && location.pathname !== "/courses") {
        setSearch("");
      }
    };
    fetchData();
  }, [courses, user, location.pathname]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("user_id", user['id'])
            const response = await flashapi.get(`/get_course/${user["id"]}`);
            console.log("boughtCoursesResponse",response.data.course);
            setBoughtCourses(response.data.course ) 
        } catch (error) {
            console.error(error);
        }
    };
    fetchData();
    const fetchFavouriteData = async()=>{
      try {
        if(user){
          const response = await flashapi.get(`/get-favourite/${user['id']}`);
          setFavourite(response.data.favourites);
          console.log("favourites--->",response.data.favourites)
          const favorCourseIds = response.data.favourites
          .flatMap((data) => data.course.id)
          .filter((id) => id); 
          setFavour(favorCourseIds);
          console.log("favourIds:",favorCourseIds);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchFavouriteData();
  }, [user,setFavour,setFavourite]);

  useEffect(() => {
    const fetchUserInfoData = async()=>{
        try {
            const response = await flashapi.get(`/get_user_info/${user["id"]}`)
            console.log("fetchUserInfo:",Array(response.data));
            setInfo(Array(response.data))
        } catch (error) {
            console.log(error);
        }
    }
    fetchUserInfoData();
    },[user]); 

    console.log("favourites",favourite)
    return(
        <DataContext.Provider 
        value={{
            search, courses, setSearch, handleSubmit, authenticate,setAuthenticate,boughtCourses, favour,favourite,info,
            user, handleClick, handleRemoveCourse, searchResult, setCourses, title, showFlashMessage, flashMessage, hideFlashMessage
        }}
        >
            {children}
        </DataContext.Provider>
    )
}