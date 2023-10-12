import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";



function Signup(props) {
  const [crediantials, setcrediantials] = useState({name:"", email: "", password: "",cpassword: "" })
  let navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = crediantials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully","success")
    }else{
      props.showAlert("Invalid Details","danger")
    }
  }
  const onChange = (e) => {
    setcrediantials({ ...crediantials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mb-3">
      <h2>Signup for your new INotebook</h2>
      <form className='container my-3' onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name"onChange={onChange} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name="email" onChange={onChange} placeholder="Enter email" />

        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange}name="password" placeholder="Password" minLength={5}required/>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword"placeholder="Password"minLength={5}required />
        </div>

        <button type="submit" className="btn btn-primary my-3">Submit</button>
      </form>
    </div>
  )
}

export default Signup