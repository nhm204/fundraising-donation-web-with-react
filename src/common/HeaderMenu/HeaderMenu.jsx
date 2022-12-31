import './HeaderMenu.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ConfirmSignOutModal } from '../../pages/components';


const HeaderMenu = ({ user, username, navSelected, setNavSelected, setIsSelected, setIsShowMenu }) => {
  const [ isModalShow, setIsModalShow ] = useState(false);

  console.log(isModalShow)
  return (
    <div className='header-menu'>
      { !isModalShow ? (
        <>
          <IoCloseOutline className='close-icon' onClick={() => setIsShowMenu(false)} />
          <Link to='/' className='logo'>
            BetterWorld
          </Link>
          { username !== null && (
            <div className='avatar-wrapper'>
              <img src={user?.avatar} alt='' className='user-avatar' />
              <div className='info'>
                <div className='name'>
                  @{user?.name} 
                </div>
                <Link to={`/fundraiser/${username}/${user?.id}`}>View profile</Link>
              </div>
            </div>
          )}
          <div
            className='nav-search'
            onClick={() => {
                setIsShowMenu(false);
                setIsSelected(true);
            }}
          >
            Search
          </div>
          <Link to='/' className={navSelected === 'Home' && 'active'} onClick={() => setNavSelected('Home')}>Home</Link>
          <Link to='/discover' className={navSelected === 'Discover' && 'active'} onClick={() => setNavSelected('Discover')}>Discover</Link>
          <Link to='/create/fundraiser/regform' className='fundraise-btn'>
            Start a BetterWorld
          </Link>
          { username === null ? (
            <Link to='/signin' className='login-btn'>Sign in</Link>
          ) : (
            <button className='logout-btn' onClick={() => setIsModalShow(true)}>Log out</button>
          )}
        </> 
        ) :<ConfirmSignOutModal isModalShow={isModalShow} setIsModalShow={setIsModalShow} /> }
      </div>
  );
}

export default HeaderMenu;