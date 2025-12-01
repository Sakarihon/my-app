import React from 'react'
import useForm from '../hooks/formHooks'
import { useAuthentication, useUser} from '../hooks/apiHooks'





export default function Registerform() {
const { postUser} = useUser();
const {postLogin}=useAuthentication()

  const initValues={
      username:'',email:'', password:''
    }

  const doRegister=async (inputs)=>{
    try {
      const result = await postUser(inputs);
      console.log("Registered user:", result);

      const loginResult = await postLogin({
      username: inputs.username,
      password: inputs.password
    });
      console.log("Login result:", loginResult);
      localStorage.setItem("token", loginResult.token);
      alert("Registeration succesful")
      window.location.href = "/~sakariho/Context/";
    }
    catch(error){
      console.error("error", error)
      alert("registeration failed")
    }
  }

  const {inputs, handleInputChange, handleSubmit} = useForm(doRegister, initValues);

    return (
       <>
      <h2>Forms</h2>
      <form onSubmit={handleSubmit} style={{width:'400px', margin: 'auto'}}>
      <div>
      <label htmlFor="registeruser">
        Username:
        <input type="text" name="username" value={inputs.username} id="etunimi" onChange={handleInputChange} />
      </label>
      </div>
      <div>
      <label htmlFor="registeremail">
        Email:
        <input type="text" name="email" value={inputs.email} id="email" onChange={handleInputChange} />
      </label>
       </div>
      <div>
      <label htmlFor="loginpassword">
        Password:
        <input type="password" name="password" value={inputs.password} id="loginpassword" onChange={handleInputChange} />
      </label>
      </div>

      <button type="submit">Send data</button>
      </form>
      </>

    )
  }



export {Registerform}
