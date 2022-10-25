import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './Header.scss';
import { BsSearch } from "react-icons/bs";
import { HiOutlineBackspace } from "react-icons/hi";


const Header = ({ link, setSearchQuery, searchValue, setSelectedCategory, setCurrentPage }) => {
  const [ isScrolled, setIsScrolled ] = useState(false);
  const [ navSelected, setNavSelected ] = useState(link);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ inputValue, setInputValue ] = useState('');
  const [ searchDone, setSearchDone ] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  const handleDirect = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      localStorage.setItem('searchValue', e.target.value);
      navigate({ pathname: '/discover', search: `?search=${e.target.value}`});
    }
  }

  
  useEffect(() => setInputValue(searchValue), [searchValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
    setSearchParams({ search: e.target.value })
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const handleClear = () => {
    const param = searchParams.get('search');

    if (param) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    localStorage.removeItem('searchValue');
    setSearchQuery();
    setInputValue('');
    setSelectedCategory('');
  };



  return (
    <header className={`${!isScrolled && link === 'Home' && 'header--scroll'} header`}>
      <nav className={`navbar ${!isScrolled && link === 'Home' && 'nav--scroll'}`}>
        <div className="left-side">
          <label htmlFor='header-searchbar' className='header-search-btn'>
            <div className='nav-search'>
              <BsSearch className='icon' />
              Search
            </div>
          </label>
          <input type='checkbox' id='header-searchbar' className='header-searchbar-input' />
          <label htmlFor="header-searchbar" className="header-overlay" />
          <div className={`${searchDone && 'search-done'} searchbar-wrapper`} onClick={() => setSearchDone(!searchDone)}>
            <div className="searchbar">
              <BsSearch className='icon' />
              <input type='text' placeholder='Search a project...' className='search-input' value={inputValue || ''} onKeyPress={handleDirect} onChange={handleChange} />
              { inputValue?.length > 0 && <HiOutlineBackspace onClick={handleClear} className='erase-icon' />}
            </div>
            <label htmlFor="header-searchbar" className='cancel-btn' onClick={handleClear}>Cancel</label>
          </div>
          <Link to='/' className={navSelected === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Home')}>Home</Link>
          <Link to='/discover' className={navSelected === 'Discover' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Discover')}>Discover</Link>
        </div>
        <Link to='/' className='logo'>
          {/* <img src={require ("../../assets/img/logo.png")} alt="logo" className='logo-img' /> */}
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