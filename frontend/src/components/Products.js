import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Products = () => {

  const [product,setProduct] = useState([])

  useEffect(()=>{
    getProduct()
  },[])

  const getProduct = async () => {
    let result = await fetch('http://localhost:5001/products')
    result = await result.json()
    if(result){
      setProduct(result)
    }
  }

  const remove = async (id) => {
    let result = await fetch(`http://localhost:5001/remove/${id}`,{
      method:'delete'
    })
    result = await result.json()
    if(result){
      getProduct()
    }
  } // not working

  const search = async(e) => {
    let key = e.target.value
    if(key){
      let result = await fetch(`http://localhost:5001/search/${key}`)
      result = await result.json()
      if(result){
        setProduct(result)
      }
    }
    else{
      getProduct()
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-4'> </div>
        <h2 className='text-primary col-4 mt-4'>Products</h2>
        <div className='col-4'>
        <input type="text" className="form-control mt-4" id="exampleInputSearch1" placeholder="Search Product" 
        onChange={search} />
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='col-1'>S no.</th>
            <th className='col-2'>Name</th>
            <th className='col-2'>Price</th>
            <th className='col-2'>Company</th>
            <th className='col-1'>Edit</th>
            <th className='col-1'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            product.length>0?
            product.map((i,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>{i.company}</td>
                <td><Link to={'/update/'+i._id}><button className='btn btn-info'>&nbsp; Edit &nbsp;</button></Link></td>
                <td><button className='btn btn-danger' onClick={()=>{remove(i._id)}}>Remove</button></td>
              </tr>
            )):
            (
              <tr>
                <td colSpan={6}><h4 className='text-danger'>No Data Found</h4></td>
              </tr>
            )
          }
        
        </tbody>
      </table>
    </div>
  )
}

export default Products
