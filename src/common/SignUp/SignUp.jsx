import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordGuidance from '../PasswordGuidance/PasswordGuidance';


const SignUp = () => {
  const [ signup, setSignup ] = useState(false);
  const [ isEmailFocus, setIsEmailFocus ] = useState(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState(false);
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isPhoneFocus, setIsPhoneFocus ] = useState(false);
  const [ emailValue, setEmailValue ] = useState('');
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ nameValue, setNameValue ] = useState('');
  const [ phoneValue, setPhoneValue ] = useState('');
  const [ isShow, setIsShow ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
 

  const onSubmit = async (data) => {
    if (signup) {
    //   await signUp(data.email, data.password);
    } 
  }

  useEffect(() => { 
    document.title = `Sign Up | BetterWorld: #1 for Donation and Fundraising Platform`;
    window.scrollTo(0, 0); 
  }, []);


  return (
    <div className='signup'>
      <header>
        <Link to='/' className='logo'>BetterWorld</Link>
        <div className="text">
          Already have an account?
          <Link to='/signin' className='nav-link'>Sign in</Link>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h1 className='heading'>Sign Up</h1>
        <div className='input-group'>
          <div className="info">
            <label className=''>
              <input
                required
                type='text'
                className='name'
                {...register('name', { 
                  required: {
                    value: true, 
                    message: 'Name is required!'
                  }, 
                  minLength: {
                    value: 1,
                    message: 'Your name must contain between 1 and 100 characters.'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Your name must contain between 1 and 100 characters.'
                  }
                })}
                onChange={e => setNameValue(e.target.value)}
                onFocus={() => setIsNameFocus(true)}
                onBlur={() => setIsNameFocus(false)}
              />
              <span className={`${(!isNameFocus && nameValue?.length === 0) ? 'placeholder' : 'active' }`}>Name</span>
              { errors.name?.message && (
                <p className='error-msg'>
                  {errors.name?.message}
                </p>
              )}
            </label>
            <label className=''>
              <input
                required
                type='tel'
                className='phone'
                {...register('phonenumber', { 
                  required: {
                    value: true, 
                    message: 'Phone number is required!'
                  }, 
                  length: {
                    value: 10,
                    message: 'Your phone number must contain 10 characters.'
                  },
                })}
                onChange={e => setPhoneValue(e.target.value)}
                onFocus={() => setIsPhoneFocus(true)}
                onBlur={() => setIsPhoneFocus(false)}
              />
              <span className={`${(!isPhoneFocus && phoneValue?.length === 0) ? 'placeholder' : 'active' }`}>Phone number</span>
              { errors.phonenumber?.message && (
              <p className='error-msg'>
                {errors.phonenumber?.message}
              </p>
            )}
            </label>
          </div>
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
            <span className={`${(!isPasswordFocus && passwordValue.length === 0) ? 'placeholder' : 'active' }`}>Add a password</span>
            { passwordValue.length > 0 && (isShow ? <FaEye className='icon' onClick={() => setIsShow(!isShow)} /> : <FaEyeSlash className='icon' onClick={() => setIsShow(!isShow)} />) }
            { errors.password?.message && (
              <p className='error-msg'>
                {errors.password?.message}
              </p>
            )}
          </label>
          { (isPasswordFocus || passwordValue.length > 0) && <PasswordGuidance passwordValue={passwordValue} />}
        </div>
        <button 
          className='signup-btn' 
          onClick={() => setSignup(true)} 
          type='submit'
        >
          Next
        </button>
        <div className="terms">
            By continuing, you agree to the GoFundMe <span>terms</span> and acknowledge receipt of our <span>privacy notice</span>.
        </div>
      </form>
    </div>
  );
}

export default SignUp;