import React from 'react';
import '../App.css';
import './HeroSection.css';
import { Button } from './Button';
import {  useNavigate } from "react-router-dom";
import shop from './images/shop.jpg';

function HeroSection() {
  const history =  useNavigate();
  const routeChange = () =>{ 
    let path = `/Table`; 
    history.push(path);
  }
  return (
    <div className='hero-container' styles={{ backgroundImage:`url(${shop})`}}>
      <h1>Matious Online Shop</h1>
      <p>IT'S AN ADD TO CARD KINDA DAY!</p>
      <div className='hero-btns'>
      <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={routeChange}
        >
          <i className='fas fa-cart-plus' />&nbsp;&nbsp;Buy Now
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;