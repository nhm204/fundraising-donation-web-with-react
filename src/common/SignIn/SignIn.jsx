import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import { setGlobalState } from '../../hooks/useGlobalState';


const SignIn = () => {
  const [ login, setLogin ] = useState(false);
  const [ isUsernameFocus, setIsUsernameFocus ] = useState(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState(false);
  const [ usernameValue, setUsernameValue ] = useState(localStorage.getItem('username') || '' );
  const [ passwordValue, setPasswordValue ] = useState(localStorage.getItem('password') || '' );
  const [ isRemember, setIsRemember ] = useState(false);
  const [ isShow, setIsShow ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formData = new FormData();
  const navigate = useNavigate();

  
  const onSubmit = async (data) => {
    if (login) {
      formData.append('username', data.username);
      formData.append('password', data.password);
      
      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
          method: 'POST',
          body: formData
        })
        const res = await fetchResponse.json();
        alert(res.charAt(0).toUpperCase() + res.slice(1));
        if (res === 'login successfully') {
          localStorage.setItem('globalUsername', data.username);
          if (isRemember) {
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
          }
          navigate('/');
        }
      } 
      catch (e) {
        return e;
      } 
    } 
    console.log(data)
  }


  useEffect(() => { 
    document.title = `Sign In | BetterWorld: #1 for Donation and Fundraising Platform`;
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className='signin'>
      <header>
        <Link to='/' className='logo'>BetterWorld</Link>
        <div className="text">
          Don't have an account?
          <Link to='/signup' className='nav-link'>Sign up</Link>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h1 className='heading'>Sign In</h1>
        <div className='input-group'>
          <label onFocus={() => setIsUsernameFocus(true)} onBlur={() => setIsUsernameFocus(false)}>
            <input
              type='text'
              value={usernameValue}
              placeholder={!isUsernameFocus ? 'Username' : null}
              {...register('username', { 
                required: {
                  value: true,
                  message: 'Username is required!'
                }
              })}
              onChange={e => {
                setUsernameValue(e.target.value);
                setGlobalState('username', e.target.value);
              }}
            />
            <span className={`${(isUsernameFocus || usernameValue.length > 0) ? 'active' : 'hidden' }`}>Username</span>
            { errors.username?.message && (
              <p className='error-msg'>
                {errors.username?.message}
              </p>
            )}
          </label>
          <label className='password-field' onFocus={() => setIsPasswordFocus(true)} onBlur={() => setIsPasswordFocus(false)}>
            <input
              type={isShow ? 'text' : 'password'}
              value={passwordValue}
              placeholder={!isPasswordFocus ? 'Password' : null}
              className=''
              {...register('password', { 
                required: {
                  value: true, 
                  message: 'Password is required!'
                }, 
                minLength: {
                  value: 8,
                  message: 'Your password must contain between 8 and 60 characters.'
                },
                maxLength: {
                  value: 60,
                  message: 'Your password must contain between 8 and 60 characters.'
                }
              })}
              onChange={e => setPasswordValue(e.target.value)}
            />
            <span className={`${(isPasswordFocus || passwordValue.length > 0) ? 'active' : 'hidden' }`}>Password</span>
            { passwordValue.length > 0 && (isShow ? <FaEye className='icon' onClick={() => setIsShow(!isShow)} /> : <FaEyeSlash className='icon' onClick={() => setIsShow(!isShow)} />) }
            { errors.password?.message && (
              <p className='error-msg'>
                {errors.password?.message}
              </p>
            )}
          </label>
          <label htmlFor="isRemember" className='checkbox-container'>
            <input 
              type="checkbox" 
              id="isRemember" 
              onChange={(e) => e.target.checked === true ? setIsRemember(true) : setIsRemember(false)}
            />
            <span className="checkmark">
              { isRemember && <BsCheck className='icon' /> }
            </span>
            <div className='title'>Remember me</div>
          </label>
        </div>
        <button 
          className='signin-btn' 
          onClick={() => setLogin(true)} 
          type='submit'
        >
          Sign in to BetterWorld
        </button>
      </form>
    </div>
  );
}

export default SignIn;