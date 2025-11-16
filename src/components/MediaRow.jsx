import SingleView from "./SingleView";
 const MediaRow = ({item,setSelectedItem}) => {
   return (
    <tr>
      <td>
        <img src={item.thumbnail}/>
      </td>

               <td>{item.title}</td>
               <td>{item.description}</td>
               <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
               <td>{item.filesize}</td>
               <td>{item.media_type}</td>
               <td>
                <button onClick={()=> setSelectedItem(item)}>Open</button>
               </td>
             </tr>

   );
 };
export default MediaRow


