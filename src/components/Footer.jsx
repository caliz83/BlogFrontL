import React from 'react'
import logo from '../assets/leaf.png';
//const logo = ('');


const Footer = () => {

  return (
    <div className='footer d-flex justify-content-center m-5'>
      <img src={logo} alt="" height={25} width={25} />
      <p>Homosteaders, LLC</p>
    </div>
  )
}

export default Footer
