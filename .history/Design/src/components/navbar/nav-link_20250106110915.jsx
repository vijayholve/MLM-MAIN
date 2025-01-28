import React from 'react'
import { NavLink } from 'react-router-dom'
const Nav_link = ({title,link,icon}) => {
  return (
    <>
      <NavLink className={(e) =>
                      e.isActive ? "nav-link active" : "nav-link"
                    } to={link}>
                        
                     
                        {({ isActive }) => (
    <>
      <i className={`${isActive ? `${icon}-fill me-2` : icon} me-2`}></i>
      {title}
    </>
  )}

                  </NavLink>
    </>
  )
}

export default Nav_link
