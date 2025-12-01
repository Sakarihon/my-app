import {useEffect} from "react"
import { useUserContext } from "../hooks/contextHooks";

export default function Logout () {
  const {handleLogout}= useUserContext()
  useEffect(() => {
    handleLogout();
  }, []);

return(
  <h2>Logged out</h2>
)}
