import React, { useState } from 'react';
import { useFile } from "../hooks/apiHooks";
import { useMedia } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/formHooks";



const Upload = () => {
  const [file, setFile] = useState(null);
  const { postFile } = useFile();
  const { postMedia } = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {

  try {

    const token = localStorage.getItem("token");

    const fileData = await postFile(file, token);
    console.log("fileData from upload server:", fileData);
    // eslint-disable-next-line react-hooks/immutability
    const mediaData = await postMedia(fileData, inputs, token);
    console.log(mediaData)

    navigate("/");
  } catch (e) {
    console.log(e.message);
  }
};

const { inputs, handleInputChange, handleSubmit } = useForm(doUpload, {
    title: "",
    description: "",
  })

const handleFileChange = (evt) => {


     if (evt.target.files) {
         console.log(evt.target.files[0]);
         setFile(evt.target.files[0]);
     }
 };


     return (
         <>
             <h1>Upload</h1>
             <form onSubmit={handleSubmit}>
                 <div>
                     <label htmlFor="title">Title</label>
                     <input
                         name="title"
                         type="text"
                         id="title"
                         onChange={handleInputChange}
                     />
                 </div>
                 <div>
                     <label htmlFor="description">Description</label>
                     <textarea
                         name="description"
                         rows={5}
                         id="description"
                         onChange={handleInputChange}
                     ></textarea>
                 </div>
                 <div>
                     <label htmlFor="file">File</label>
                     <input
                         name="file"
                         type="file"
                         id="file"
                         accept="image/*, video/*"
                     onChange={handleFileChange}
                     />
                 </div>
                 <img
                     src={
                         file
                         ? URL.createObjectURL(file)
                         : 'https://placehold.co/200?text=Choose+image'
                     }
                     alt="preview"
                     width="200"
                 />
                 <button
                     type="submit"
                     disabled={file && inputs.title.length > 3 ? false : true}
                 >
                     Upload
                 </button>
             </form>
         </>
     );
 };
export default Upload;
