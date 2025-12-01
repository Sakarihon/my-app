import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";


const MEDIA_API=import.meta.env.VITE_MEDIA_API + '/media'
const AUTH_API=import.meta.env.VITE_AUTH_API + '/users/'

const useMedia = () => {
const [mediaArray, setMediaArray] = useState([]);

const postMedia = async (fileData, inputs, token) => {
  try {
    const body = {
      title: inputs.title,
      description: inputs.description,
      filename: fileData.data.filename,
      media_type: fileData.data.media_type,
      filesize: fileData.data.filesize,
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const result = await fetchData(import.meta.env.VITE_MEDIA_API + "/media", options);
    return result;
  } catch (e) {
    console.error("postMedia error:", e.message);
    throw e;
  }
};


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
return {mediaArray,postMedia};
};



const useAuthentication = ()=>{
const postLogin = async (inputs) => {
   const fetchOptions = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(inputs),
   };
   const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
   return loginResult;
 };
return {postLogin}}

const useUser = ()=>{
const getUserByToken=async ()=> {
  const token =localStorage.getItem("token")
  try {
      if (!token) throw new Error("No token found");

      const userData = await fetchData(import.meta.env.VITE_AUTH_API + "/users/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      return userData;
      } catch (err) {
            console.error("getUserByToken error:", err.message);
            throw err;
          }
        };

const postUser = async (inputs) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };
      const result = await fetchData(
        import.meta.env.VITE_AUTH_API + "/users",
        fetchOptions
      );
      return result;
    } catch (err) {
      console.error("postUser error:", err);
      throw err;
    }
  };

  return { getUserByToken, postUser };
};

const useFile = () => {

  const postFile = async (file, token) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const result = await fetchData(
        import.meta.env.VITE_UPLOAD_SERVER + "/upload",
        options
      );

      return result;
    } catch (e) {
      console.error("postFile error:", e.message);
      throw e;
    }
  };

  return { postFile };
};



export {useMedia,useAuthentication,useUser,useFile};
