import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if (auth)(
      navigate('/products')
    )
  })

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async () => {
    if(email && password){
      let result = await fetch('http://localhost:5001/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'}
      })
      result = await result.json()
      if(result){
        localStorage.setItem('user',JSON.stringify(result))
        navigate('/products')
      }
      else{
        alert('invalid')
      }
    }
    else{
      alert('fill all fields')
    }
  }

  return (
    <div className='container'>
      <h2 className='text-primary mt-4'>Login</h2>
      <div className='row'>
      
      <div className="col-4"></div>
      <div className="col-4 mt-4">
        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className="col-4"></div>
      
      <div className="col-4"></div>
      <div className="col-4 mt-4">
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" 
        value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className="col-4"></div>
      
      <div className="col-5"></div>
        <button type="submit" className="btn btn-primary col-2 mt-4" onClick={submit}>Submit</button>
      <div className="col-5"></div>
    </div>
    </div>
  )
}

export default Login
