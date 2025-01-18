import { useContext ,useState ,createContext, useEffect}  from 'react'
import axios, { Axios } from 'axios';
import React from 'react'
import { baseURL } from '../../app';
import { UserContext } from '../../app';
export const SiteConfig =createContext(); 
const SiteConfingContent = ({children }) => {
  
  const {baseURL} =useContext(UserContext)
  const [siteConfigData, setSiteConfig] = useState({
    navbar_title: "My Websi",
    navbar_image: ,
    headers_name: "",
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
      {siteConfigData,setSiteConfig}
    }>
  {children}
  </SiteConfig.Provider>
    )
}

export default SiteConfingContent


