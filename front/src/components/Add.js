import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {

  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [company,setCompany] = useState('')
  const navigate = useNavigate()

  const submit = async () => {
    if(name && price && company){
      let result = await fetch('http://localhost:5001/add',{
        method:'post',
        body:JSON.stringify({name,price,company}),
        headers:{'Content-Type':'application/json'}
      })
      result = await result.json()
      if(result){
        navigate('/products')
      }
    }
    else{
      alert('fill all fields')
    }
  }

  return (
    <div className='container'>
      <h2 className='text-primary mt-4'>Add Product</h2>
      <div className='row'>
      
      <div className="col-4"></div>
      <div className="col-4 mt-4">
        <input type="text" className="form-control" id="exampleInputName1" placeholder="Enter Name" 
        value={name} onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="col-4"></div>
      
      <div className="col-4"></div>
      <div className="col-4 mt-4">
        <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Price" 
        value={price} onChange={(e)=>setPrice(e.target.value)} />
      </div>
      <div className="col-4"></div>
      
      <div className="col-4"></div>
      <div className="col-4 mt-4">
        <input type="company" className="form-control" id="exampleInputPassword1" placeholder="Enter Company" 
        value={company} onChange={(e)=>setCompany(e.target.value)} />
      </div>
      <div className="col-4"></div>
      
      <div className="col-5"></div>
        <button type="submit" className="btn btn-primary col-2 mt-4" onClick={submit}>Submit</button>
      <div className="col-5"></div>
    </div>
    </div>
  )
}

export default Add
