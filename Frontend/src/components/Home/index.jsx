import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import ShopsSection from "./ShopsSection";
import AboutUs from "./AboutUs";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import { changeFetch } from "../../store/fetchSlice";
import { fetchShops } from "../../store/shopsSlice";

const Home = () => {

  const dispatch = useDispatch();
  const fetch=useSelector((state)=>state.fetch)


  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([
          
            position.coords.latitude,
            position.coords.longitude
           
          ]);
        },
        (error) => {
          console.log("Error getting user's current location:", error);
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    fetchLocation()
      .then((location) => {
      
        if (fetch){
          dispatch(fetchShops(location)); 
          dispatch(changeFetch())
        }
      
        
      })
      .catch((error) => {
        console.log("Failed to fetch location", error);
      });
  }, [dispatch]);

  return (
    <>
      <Banner />
      <ShopsSection />
      <AboutUs />
      <Testimonials />
      <ContactUs />
    </>
  );
};

export default Home;
