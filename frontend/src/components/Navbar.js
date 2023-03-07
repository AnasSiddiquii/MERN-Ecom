import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand text-success"><b>Sellerkart</b></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            {
              auth ?  
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/add">Add Product</Link>
                    </li>
                    <li className="nav-item">
                    {/* <Link className="nav-link" to="/">Logout</Link> */}
                    <Link className="nav-link" to="/" onClick={logout} >Logout ({JSON.parse(auth).name})</Link>
                    </li>
                </ul>:
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                </ul>
            }
            </div>
        </div>
        </nav>      
    </div>
  )
}

export default Navbar
