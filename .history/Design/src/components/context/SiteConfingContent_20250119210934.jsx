import { useContext, useState, createContext, useEffect } from "react";
import axios, { Axios } from "axios";
import React from "react";
import { baseURL } from "../../app";
import { UserContext } from "../../app";
export const SiteConfig = createContext();
const SiteConfingContent = ({ children }) => {
  const { baseURL } = useContext(UserContext);
  const [siteConfigData, setSiteConfig] = useState({
    navbar_title: '',
    navbar_image: '',
    headers_name: '',
    footer_text :'',
    contact_email: "",
    social_links: "",
    homepage_banner: null,
    primary_color: "",
    secondary_color: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    about_text: "",
    about_image: null,
    phone_number: "",
    address: "",
    favicon: null,
    default_language: "en",
    privacy_policy: "",
    terms_and_conditions: "",
    is_maintenance: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      const responce = await axios.get(`${baseURL}/siteconfig/main/`);
      setSiteConfig({
        navbar_title: responce.data.navbar_title,
        navbar_image: responce.data.navbar_image,
        headers_name: responce.data.headers_name,
      });
      console.log(siteConfigData);
    };
    fetchData();
  }, []);

  return (
    <SiteConfig.Provider value={{ siteConfigData, setSiteConfig }}>
      {children}
    </SiteConfig.Provider>
  );
};

export default SiteConfingContent;
