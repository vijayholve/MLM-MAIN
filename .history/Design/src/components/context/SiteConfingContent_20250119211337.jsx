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
        navbar_title: response.data.navbar_title,
        navbar_image: response.data.navbar_image,
        headers_name: response.data.headers_name,
        footer_text: response.data.footer_text,
        contact_email: response.data.contact_email,
        social_links: response.data.social_links,
        homepage_banner: response.data.homepage_banner,
        primary_color: response.data.primary_color,
        secondary_color: response.data.secondary_color,
        meta_title: response.data.meta_title,
        meta_description: response.data.meta_description,
        meta_keywords: response.data.meta_keywords,
        about_text: response.data.about_text,
        about_image: response.data.about_image,
        phone_number: response.data.phone_number,
        address: response.data.address,
        favicon: response.data.favicon,
        default_language: response.data.default_language,
        privacy_policy: response.data.privacy_policy,
        terms_and_conditions: response.data.terms_and_conditions,
        is_maintenance: response.data.is_maintenance,
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
