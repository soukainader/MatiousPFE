import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Tableau from './components/Tableau';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <HeroSection />
      <Tableau />
      <Footer />
      
    </Router>
    
   </>
  );
}

export default App;
