import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignIn = () => {
  const [ login, setLogin ] = useState(false);
  const [ isEmailFocus, setIsEmailFocus ] = useState(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState(false);
  const [ emailValue, setEmailValue ] = useState('');
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ isShow, setIsShow ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (login) {
    //   await signIn(data.email, data.password);
    } 
  }

  console.log(emailValue)

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
          <label className=''>
            <input
              type='text'
              className=''
              {...register('email', { 
                required: {
                  value: true,
                  message: 'Email is required!'
                }, 
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email.'
                }
              })}
              onChange={e => setEmailValue(e.target.value)}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
            <span className={`${(!isEmailFocus && emailValue.length === 0) ? 'placeholder' : 'active' }`}>Email address</span>
            { errors.email?.message && (
              <p className='error-msg'>
                {errors.email?.message}
              </p>
            )}
          </label>
          <label className='password-field'>
            <input
              type={isShow ? 'text' : 'password'}
              className=''
              {...register('password', { 
                required: {
                  value: true, 
                  message: 'Password is required!'
                }, 
                minLength: {
                  value: 6,
                  message: 'Your password must contain between 6 and 60 characters.'
                },
                maxLength: {
                  value: 60,
                  message: 'Your password must contain between 6 and 60 characters.'
                }
              })}
              onChange={e => setPasswordValue(e.target.value)}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
            />
            <span className={`${(!isPasswordFocus && passwordValue.length === 0) ? 'placeholder' : 'active' }`}>Password</span>
            { passwordValue.length > 0 && (isShow ? <FaEye className='icon' onClick={() => setIsShow(!isShow)} /> : <FaEyeSlash className='icon' onClick={() => setIsShow(!isShow)} />) }
            { errors.password?.message && (
              <p className='error-msg'>
                {errors.password?.message}
              </p>
            )}
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