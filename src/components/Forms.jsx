import { useState } from "react"

const Forms = () =>{

const [name, setName] = useState ('')

const handleChange = (e) => {
  console.log(e.target.value)
  setName(e.target.value)

}
const handleSumbit = (e) => {
  e.preventDefault()
  console.log(name)
}
  return (
  <>
    <h2>Forms</h2>
    <form onSubmit={handleSumbit} style={{width:'400px', margin: 'auto'}}>
    <label htmlFor="name">
      Etunimi:
      <input type="text" value={name} id="name" onChange={handleChange} />
    </label>
    <button type="submit">Send data</button>
    </form>
    </>
  )
}


export default Forms
