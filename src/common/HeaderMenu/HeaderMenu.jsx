import './HeaderMenu.scss';
import { IoCloseOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';


const HeaderMenu = ({ user, username, navSelected, setNavSelected, setIsSelected, setIsShowMenu }) => {
  return (
    <div className='header-menu'>
      <IoCloseOutline className='close-icon' onClick={() => setIsShowMenu(false)} />
      <Link to='/' className='logo'>
        BetterWorld
      </Link>
      { username !== null && (
        <div className="avatar-wrapper">
          <img src={user[0]?.avatar} alt="" className='user-avatar' />
          <div className="info">
            <div className="name">
              {user[0]?.name} 
              <span className="separator">|</span>
              <span className="id">Fundraiser #{user[0]?.id}</span>
            </div>
            <Link to={`/fundraiser/${username}/${user[0]?.id}`}>View profile</Link>
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
      { username === null && (
        <Link to='/signin' className='login-btn'>Sign in</Link>
      )}
    </div>
  );
}

export default HeaderMenu;