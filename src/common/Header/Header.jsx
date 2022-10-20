import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { BsSearch } from "react-icons/bs";


const Header = ({ link }) => {
  const [ isScrolled, setIsScrolled ] = useState(false);
  const [ navSelected, setNavSelected ] = useState(link);


  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  return (
    <header className={`${!isScrolled && link === 'Home' && 'header--scroll'} header`}>
      <nav className={`navbar ${!isScrolled && link === 'Home' && 'nav--scroll'}`}>
        <div className="left-side">
          <div className='nav-search'>
            <BsSearch className='icon' />
            Search
          </div>
          <Link to='/' className={navSelected === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Home')}>Home</Link>
          <Link to='/discover' className={navSelected === 'Discover' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Discover')}>Discover</Link>
        </div>
        <Link to='/' className='logo'>
          <img src={require ("../../assets/img/logo.png")} alt="logo" className='logo-img' />
          <span>BetterWorld</span>
        </Link>
        <div className="right-side">
          <div className='nav-link'>Sign in</div>
          <button className={`fundraise-btn ${!isScrolled && link === 'Home' && 'btn--scroll'}`}>
            Start a Fundraising
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;