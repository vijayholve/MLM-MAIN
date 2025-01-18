import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
 
import React from 'react'

const SiteConfingContent = ({children }) => {
        const [siteConfig, setSiteConfig] = useState({
          
            navbar_title: "My Website",
            navbar_image: "/path-to-navbar-image.jpg",
            headers_name: "Welcome to My Website",
        });
    useEffect(()=>{

    },[])

  return (
    <SiteConfig.Provider value={}>

    </SiteConfig.Provider>
    )
}

export default SiteConfingContent


