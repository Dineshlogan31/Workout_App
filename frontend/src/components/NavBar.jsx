import React from 'react'
import {Link} from 'react-router-dom'
import {UseLogout} from '../hooks/UseLogout'
import {UseAuthContext} from '../hooks/UseAuthContext'

const NavBar = () => {
const {user}=UseAuthContext()
  const {logout}=UseLogout()
  const handleClick=()=>{
logout()
  }
  return (
    <header>
        <div className='container'>
          <Link to='/'>
          {user ?<h1>Welcome <span style={{color:'#1aac83'}}>{user.email.split('@')[0]}</span></h1>:<h1>Welcome Buddy</h1>}
          </Link>
            <nav>
              {user && (
               <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
               </div>
              )}
              
               {!user && (
                <div>
                <Link to="/login">Login</Link>
                 <Link to="/signup">Sign up</Link>
                </div>
               )}
            </nav>
        </div>
    </header>
  )
}

export default NavBar