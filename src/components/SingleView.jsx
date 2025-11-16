
 const SingleView = props=> {
   const {item, setSelectedItem} =props

   if (!item) return null;
   return (
    <dialog open={!!item}>
    <h2> {item.title}</h2>

    {item.media_type.startsWith("video") ? (
        <video src={item.filename} controls width="600" />
      ) : (
        <img src={item.filename} alt={item.title} width="600" />
      )}
        <p>{item.description}</p>
        <button onClick={()=> setSelectedItem(null)}>Close</button>

    </dialog>
   );
 };
export default SingleView
