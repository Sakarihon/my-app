import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token= localStorage.getItem("token")

      try {
        const data = await getUserByToken(token);
        console.log("Fetched user data:", data);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
   }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>

    </div>
  );
};

export default Profile;
