import React from 'react'
import Sidebar from '../Components/sidebar'
import Navbar from '../Components/navbar'

function layoutadmin({children}) {
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