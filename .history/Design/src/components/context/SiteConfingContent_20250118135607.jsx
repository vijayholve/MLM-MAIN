import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
import axios
import React from 'react'

const SiteConfingContent = ({children }) => {
        const [siteConfig, setSiteConfig] = useState({
          
            navbar_title: "My Website",
            navbar_image: "/path-to-navbar-image.jpg",
            headers_name: "Welcome to My Website",
        });
    useEffect(()=>{
      const async () => {
        
      }
 
    },[]) 


  return (
    <SiteConfig.Provider value={
      {siteConfig,setSiteConfig}
    }>

    </SiteConfig.Provider>
    )
}

export default SiteConfingContent


