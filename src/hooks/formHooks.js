import { useState } from "react";


const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    callback(inputs);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return { inputs, handleInputChange, handleSubmit };
};




export  default useForm;
