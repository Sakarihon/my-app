import { useLocation, useNavigate } from 'react-router-dom';

const Single = () => {
  const { state } = useLocation();
  const item = state?.item;
  const navigate = useNavigate();

  if (!item) return <p>No item found.</p>;

  return (
    <div>
      <h2>{item.title}</h2>

      {item.media_type.startsWith("video") ? (
        <video src={item.filename} controls width="600" />
      ) : (
        <img src={item.filename} alt={item.title} width="600" />
      )}

      <p>{item.description}</p>
        <button onClick={() => navigate(-1)}>Go back</button>

    </div>
  );
};

export default Single;
