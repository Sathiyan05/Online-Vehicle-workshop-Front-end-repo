import { AccountCircle, GarageOutlined, Group, Home, Logout, MarkChatRead, MarkChatUnread, PowerOffOutlined, ReceiptLong, Warehouse } from '@mui/icons-material'
import React from 'react'

const NavbarAdmin = () => {

     const sessionId=localStorage.getItem("sessionId");

     const handleLogout=()=>{
          localStorage.removeItem("sessionId");
          window.location.href="/login";
     }

  return (
     <>
    <div style={{backgroundColor:"#1b2046", color:"white"}} >
     <div className='row' style={{paddingTop:"10px"}}>

          <div className='col-md-7'>
         
               <h1 style={{fontSize:"40px", fontFamily:"serif"}}>AUTO REPAIR</h1>
               </div>
               <div className='col-md-5'>
                    <div className='row'>
                         

         
          <div className='col-md-2' style={{borderRight:"1px solid white"}}><a href={`/centerRequets/${sessionId}`}style={{textDecoration:"none", color:"white", fontSize:"20px"}}><MarkChatUnread style={{fontSize:"40px"}}/></a></div>
          
          <div className='col-md-2' style={{borderRight:"1px solid white"}}><a href={`/adminServiceCenters/${sessionId}`} style={{textDecoration:"none", color:"white", fontSize:"20px"}}><Warehouse style={{fontSize:"40px"}}/></a></div>
          
          <div className='col-md-2' style={{borderRight:"1px solid white"}}><a href={`/adminCustomers/${sessionId}`}style={{textDecoration:"none", color:"white", fontSize:"20px"}}><Group style={{fontSize:"40px"}}/></a></div>
          
          <div className='col-md-2' style={{borderRight:"1px solid white"}}><a href={`/adminBills/${sessionId}`}style={{textDecoration:"none", color:"white", fontSize:"20px"}}><ReceiptLong style={{fontSize:"40px"}}/></a></div>
        
          <div className='col-md-2' style={{borderRight:"1px solid white"}}><a href={`/adminprofilePage/${sessionId}`}style={{textDecoration:"none", color:"white", fontSize:"20px"}}><AccountCircle style={{fontSize:"40px"}}/></a></div>
        
          <div className='col-md-2' ><button onClick={handleLogout} style={{backgroundColor:"transparent", color:"white", border:"none"}}><Logout style={{fontSize:"40px"}}/></button></div>

          </div>
          </div>
     </div>
     <div></div>
    </div>
    </>
  )
}

export default NavbarAdmin