import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
  return (
    <Nav
        className='nav d-flex justify-content-center m-5'
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link className='nav' as={Link} to='/'>Blog Page</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className= 'nav' as={Link} to='/Dashboard'>Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='nav' as={Link} to='/Login'>Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='nav' as={Link} to='/CreateAccount'>Create Account</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default Navbar
