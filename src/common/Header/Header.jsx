import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { BsSearch } from "react-icons/bs";
import { DropdownSearch } from '../../pages/components';


const Header = ({ link, searchQuery, changeData }) => {
  const [ navSelected, setNavSelected ] = useState(link);
  const [ isScrolled, setIsScrolled ] = useState(false);
  const [ isSelected, setIsSelected ] = useState(false);


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
          <div className='nav-search' onClick={() => setIsSelected(true)}>
            <BsSearch className='icon' />
            Search
          </div>
          {isSelected && <DropdownSearch searchQuery={searchQuery} changeData={changeData} setIsSelected={setIsSelected} link={link} />}
          <Link to='/' className={navSelected === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Home')}>Home</Link>
          <Link to='/discover' className={navSelected === 'Discover' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Discover')}>Discover</Link>
        </div>
        <Link to='/' className='logo'>
          BetterWorld
        </Link>
        <div className="right-side">
          <Link to='/signin' className='nav-link'>Sign in</Link>
          <button className={`fundraise-btn ${!isScrolled && link === 'Home' && 'btn--scroll'}`}>
            Start a Fundraising
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;