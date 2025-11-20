import React, { useState } from 'react'

export default function PizzaForms() {
  const [inputs,setInputs]=useState({
    firstname:''
  })

const handleChange = (e) => {
  const target = e.target

  const value = target.value
  const name= target.name
  console.log(value,name)
  setInputs((values)=>({...values, [name]: value}))

}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs.firstname)
  alert(JSON.stringify(inputs,null,2))
}



  return (
     <>
    <h2>Forms</h2>
    <form onSubmit={handleSubmit} style={{width:'400px', margin: 'auto'}}>
    <label htmlFor="etunimi">
      Etunimi:
      <input type="text" name="firstname" value={inputs.firstname} id="etunimi" onChange={handleChange} />
    </label>

    //option,checkbox,radiobutton
    <button type="submit">Send data</button>
    </form>
    </>

  )
}
