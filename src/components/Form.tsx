import React, { useState } from 'react'

const Form = () => {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
  const {
      currentTarget: {value}
    } = event;
    setValue(value);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello", value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input 
        value={value} 
        onChange={onChange} 
        type="text" 
        placeholder="username" 
      />
      <button>Log in</button>
    </form>
  )
}

export default Form