import React,{useEffect} from 'react'
import Sidebar from '../Components/sidebar'
import Navbar from '../Components/navbar'

function layoutadmin({children}) {
  useEffect(() => {
    const token = localStorage.getItem('admintoken')
    if (!token) {
      window.location.href = "/";
    }
  }
  , [

  ]

  )
  

  
  return (
    <>
      <div className="layoutcontainner"> 
      <div className="layoutside">  
        <Sidebar />
        </div>
        <div className="layoutcontainner__main">
            <div className="layoutnav">
        <Navbar />
           </div>
           <div className="layoutcontainner__content">
              {children}

            </div>
        </div>
      </div>
    

    </>
  )
}

export default layoutadmin