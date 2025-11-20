import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

// TODO: add necessary imports

const MEDIA_API=import.meta.env.VITE_MEDIA_API + '/media'
const AUTH_API=import.meta.env.VITE_AUTH_API + '/users/'

const useMedia = () => {
// TODO: move mediaArray state here
const [mediaArray, setMediaArray] = useState([]);
// TODO: move getMedia function here
useEffect(() => {
const getMedia = async () => {
  try{
    const mediaData = await fetchData(MEDIA_API);

    const newArray = await Promise.all(
      mediaData.map(async (item) => {
     const user = await fetchData(AUTH_API + item.user_id);
     console.log(user)
     return {...item, username: user.username};
    }));

    console.log(newArray);

    setMediaArray(newArray);
 } catch(err){
  console.error("failed to fetch media",err)
 }
}
  getMedia();
}, []);

useEffect(() => {
    console.log("Media array updated:", mediaArray);
  }, [mediaArray]);
// TODO: move useEffect here
return {mediaArray};
};

export {useMedia};
