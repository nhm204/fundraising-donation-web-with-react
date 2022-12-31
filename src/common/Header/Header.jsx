import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { BsSearch } from "react-icons/bs";
import { DropdownSearch } from '../../pages/components';
import { useGlobalState } from '../../hooks/useGlobalState';
import { users } from '../../constants/projects';
import { HiOutlineMenu } from 'react-icons/hi';
import HeaderMenu from '../HeaderMenu/HeaderMenu';


const Header = ({ link, searchQuery, changeData }) => {
  const [ username, setUsername ] = useGlobalState('username');
  const [ userList, setUserList ] = useState([]);
  const [ navSelected, setNavSelected ] = useState(link);
  const [ isScrolled, setIsScrolled ] = useState(false);
  const [ isSelected, setIsSelected ] = useState(false);
  const [ isShowMenu, setIsShowMenu ] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)

    fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
      .then(res => res.json())
      .then((res) => {
        setUserList(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);


  const user = userList?.filter(user => user.name === username);


  return (
    <>
      <header className={`${!isScrolled && link === 'Home' && 'header--scroll'} header`}>
        <nav className={`navbar ${!isScrolled && link === 'Home' && 'nav--scroll'}`}>
          <div className="left-side">
            <div className='nav-search' onClick={() => setIsSelected(true)}>
              <BsSearch className='icon' />
              <span>Search</span>
            </div>
            {isSelected && <DropdownSearch searchQuery={searchQuery} changeData={changeData} setIsSelected={setIsSelected} link={link} />}
            <Link to='/' className={navSelected === 'Home' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Home')}>Home</Link>
            <Link to='/discover' className={navSelected === 'Discover' ? 'nav-link active' : 'nav-link'} onClick={() => setNavSelected('Discover')}>Discover</Link>
          </div>
          <Link to='/' className='logo'>
            BetterWorld
          </Link>
          <button className='menu-btn' onClick={() => setIsShowMenu(true)}>
            <HiOutlineMenu className='icon'/>
          </button>
          <div className="right-side">
            { username === null ? (
              <Link to='/signin' className='nav-link'>Sign in</Link>
              ) : (
                <Link to={`/fundraiser/${username}/${user[0]?.id}`} className="avatar-wrapper">
                <img src={user[0]?.avatar} alt="" className='user-avatar' />
              </Link>
            )}
            <Link to='/create/fundraiser/regform' className={`fundraise-btn ${!isScrolled && link === 'Home' && 'btn--scroll'}`}>
              Start a BetterWorld
            </Link>
          </div>
        </nav>
      </header>
      { isShowMenu && <HeaderMenu user={user[0]} username={username} navSelected={navSelected} setNavSelected={setNavSelected} setIsSelected={setIsSelected} setIsShowMenu={setIsShowMenu} />}
    </>
  );
}

export default Header;