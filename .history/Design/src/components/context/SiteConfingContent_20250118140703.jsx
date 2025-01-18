import { useContext,useState ,createContext, useEffect}  from 'react'
export const SiteConfig =createContext(); 
import axios, { Axios } from 'axios';
import React from 'react'
import { baseURL } from '../../app';
import { UserContext } from '../../app';
const SiteConfingContent = ({children }) => {
  const {baseURL} =useContext(UserContext)
        const [siteConfig, setSiteConfig] = useState({
            navbar_title: "My Website",
            navbar_image: "/path-to-navbar-image.jpg",
            headers_name: "Welcome to My Website",
        });
    useEffect(()=>{
      const fetchData = async  () => {
         const responce = await axios.get(`${baseURL}/siteconfig/api/dashboard/`);
        setSiteConfig({
          navbar_title:responce.data.navbar_title ,
navbar_image: responce.data.navbar_image ,
headers_name: responce.data.headers_name
        })
      }
    fetchData()
    },[]) 


  return (
    <SiteConfig.Provider value={
      {siteConfig,setSiteConfig}
    }>

    </SiteConfig.Provider>
    )
}

export default SiteConfingContent


