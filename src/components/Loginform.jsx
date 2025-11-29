import React from 'react'
import useForm from '../hooks/formHooks'
import { useAuthentication } from '../hooks/apiHooks'




export default function Loginform() {
  const {postLogin} =useAuthentication()

  const initValues={
      username:'', password:''
    }

  const doLogin=async (inputs)=>{
    try {
      const result=await postLogin(inputs)
      localStorage.setItem("token",result.token)
      console.log("result",result)
      alert("login succesful")
      window.location.href = "/~sakariho/Forms/";
    }
    catch(error){
      console.error("error", error)
      alert("login failed")
    }
  }

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

    return (
       <>
      <h2>Forms</h2>
      <form onSubmit={handleSubmit} style={{width:'400px', margin: 'auto'}}>
      <div>
      <label htmlFor="loginuser">
        Username:
        <input type="text" name="username" value={inputs.username} id="etunimi" onChange={handleInputChange} />
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



export {Loginform}
