import {createContext, useState} from 'react';
 import {useAuthentication, useUser} from '../hooks/apiHooks';
import { useLocation, useNavigate } from "react-router";

 const UserContext = createContext(null);


 const UserProvider = ({children}) => {
     const [user, setUser] = useState(null);
     const {postLogin} = useAuthentication();
     const {getUserByToken} = useUser();
     const navigate = useNavigate();
     const location=useLocation()


     const handleLogin = async (credentials) => {

      try {
        const result=await postLogin(credentials)
        localStorage.setItem("token",result.token)
        console.log("result",result)
        setUser(result.user);
        alert("login succesful")
        window.location.href = "/";
      }
      catch(error){
        console.error("error", error)
        alert("login failed")
      }}

     const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        } catch (e) {
            console.log('Logout failed:', e.message);
        }
    };

    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const userData = await getUserByToken();
            setUser(userData);
            navigate(location.pathname);

        } catch (e) {
            console.log("Auto-login failed:", e.message);
        }
    };

     return (
         <UserContext.Provider value={{ user, handleLogin, handleLogout, handleAutoLogin }}>
             {children}
         </UserContext.Provider>
     );
 };
 export {UserProvider, UserContext};
