import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
 
import React from 'react'

const SiteConfingContent = () => {
        const [siteConfig, setSiteConfig] = useState({
          title: "My Website",
          navbarImage: "/path-to-navbar-image.jpg",
          homePageHeading: "Welcome to My Website",
          footerText: "© 2025 My Website",
        });
    useEffect(()=>{

    },[])
  return (
    <>
      
    </>
  )
}

export default SiteConfingContent


