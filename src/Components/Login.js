import { useState } from "react"
import React  from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    
    const [crediantials, setcrediantials] = useState({email:"",password:""})
    let navigate =useNavigate();

    
    const handleSubmit= async (e)=>{
        e.preventDefault();
       
        const response = await  fetch("http://localhost:5000/api/auth/login", {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:crediantials.email,password:crediantials.password})
          });
          const json= await response.json()
          console.log(json);
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged in Successfully","success")
            navigate("/");
            
          }

          else{
            props.showAlert("Invalid Creadiantials","danger")
          }
        
    }
    const onChange =(e)=>{       
        setcrediantials({...crediantials,[e.target.name]:e.target.value}) 
    }
    return (
        <div className="container mb-3 ">
            <h2>Login to continue to iNotebook</h2>
            <form className=" my-2"onSubmit={handleSubmit}style={{ }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email </label>
                    <input type="email" value={crediantials.email}className="form-control" onChange={onChange}id="email" aria-describedby="emailHelp" name='email' placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={crediantials.password} className="form-control" onChange={onChange}i id="password" name='password' placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login