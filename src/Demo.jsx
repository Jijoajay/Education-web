import React, {useRef, useEffect} from 'react'
import {motion,useAnimation,useInView} from 'framer-motion'
const Demo = () => {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const isInView = useInView(ref,{once:false});
  const isImgInView = useInView(ref,{once:false});
  const mainControl = useAnimation();
  const imgControl = useAnimation();

  useEffect(()=>{
    if(isInView){
      mainControl.start("visible")
    }

    if(isImgInView){
      imgControl.start("visible")
    }
    
  },[isInView])
  return (
    <div>
    <div style={{height:"100vh"}}></div>
    <div
    // ref={ref}
    style={{backgroundColor:"black"}}
    >
       <motion.div 
       ref={ref}
       variants={{
        hidden:{opacity:0, y:50},
        visible:{opacity:1, y:0}
       }}
       initial="hidden"
       animate={mainControl}
       transition={{duration:1, delay:.5}}
       className="profile"
       style={{color:"white"}}>
          <p>asfasdfasfsafsafsfsafasfasfda</p><br/>
          <p>asfasdfasfsafsafsfsafasfasfda</p><br/>
          <p>asfasdfasfsafsafsfsafasfasfda</p><br/>
          <p>asfasdfasfsafsafsfsafasfasfda</p><br/>
       </motion.div>
       <motion.div
       ref={imgRef}
       variants={{
        hidden:{opacity:0,scale:0},
        visible:{opacity:1,scale:1}
       }} 
       initial="hidden"
       animate={imgControl}
       transition={{duration:1,delay:1}}
       className="img">
          <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
          <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
          <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
          <img src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
       </motion.div>
    </div>
    </div>
  )
}

export default Demo