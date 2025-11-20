import { useState, useEffect } from "react";
import MediaRow from "../components/MediaRow";
import { fetchData } from "../utils/fetchData";

const MEDIA_API=import.meta.env.VITE_MEDIA_API + '/media'
const AUTH_API=import.meta.env.VITE_AUTH_API + '/users/'

const Home = () => {

const [mediaArray, setMediaArray] = useState([]);

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

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
