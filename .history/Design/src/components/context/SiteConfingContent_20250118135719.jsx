import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
import axios, { Axios } from 'axios';
import React from 'react'

const SiteConfingContent = ({children }) => {
        const [siteConfig, setSiteConfig] = useState({
        const {} =useContext()
            navbar_title: "My Website",
            navbar_image: "/path-to-navbar-image.jpg",
            headers_name: "Welcome to My Website",
        });
    useEffect(()=>{
      const async () => {
        responce = await axios.get()
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


