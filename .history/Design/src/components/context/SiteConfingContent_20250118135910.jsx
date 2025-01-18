import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
import axios, { Axios } from 'axios';
import React from 'react'
import { baseURL } from '../../app';

const SiteConfingContent = ({children }) => {
        const [siteConfig, setSiteConfig] = useState({
        const {baseURL} =useContext()
            navbar_title: "My Website",
            navbar_image: "/path-to-navbar-image.jpg",
            headers_name: "Welcome to My Website",
        });
    useEffect(()=>{
      const async () => {
        responce = await axios.get(`${baseURL}/siteconfig/api/dashboard/`);
        setSiteConfig({
          navbar_title:setSiteConfig.responce.
navbar_image
headers_name
        })
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


