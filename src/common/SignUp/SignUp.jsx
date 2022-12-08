import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.scss';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordGuidance from '../PasswordGuidance/PasswordGuidance';


const SignUp = () => {
  const [ signup, setSignup ] = useState(false);
  const [ isEmailFocus, setIsEmailFocus ] = useState(false);
  const [ isPasswordFocus1, setIsPasswordFocus1 ] = useState(false);
  const [ isPasswordFocus2, setIsPasswordFocus2 ] = useState(false);
  const [ isUsernameFocus, setIsUsernameFocus ] = useState(false);
  const [ isPhoneFocus, setIsPhoneFocus ] = useState(false);
  const [ emailValue, setEmailValue ] = useState('');
  const [ passwordValue1, setPasswordValue1 ] = useState('');
  const [ passwordValue2, setPasswordValue2 ] = useState('');
  const [ usernameValue, setUsernameValue ] = useState('');
  const [ phoneValue, setPhoneValue ] = useState('');
  const [ isShow, setIsShow ] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const formData = new FormData();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    if (signup) {
      formData.append('username', data.username);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('password1', data.password1);
      formData.append('password2', data.password2);

      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/register`, {
          method: 'POST',
          body: formData
        })
        const res = await fetchResponse.json();
        alert(res);
        if (res === 'Create successfully') {
          navigate('/signin')
        }
      } 
      catch (e) {
        return e;
      } 
    } 
    console.log(data)
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
            <label className={`${(errors.username || errors.phonenumber) && 'h-68'}`} onFocus={() => setIsUsernameFocus(true)} onBlur={() => setIsUsernameFocus(false)}>
              <input
                type='text'
                placeholder={!isUsernameFocus ? 'Username' : null}
                className='name'
                {...register('username', { 
                  required: {
                    value: true, 
                    message: 'Username is required!'
                  }, 
                  minLength: {
                    value: 1,
                    message: 'Your username must contain between 1 and 100 characters.'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Your username must contain between 1 and 100 characters.'
                  }
                })}
                onChange={e => setUsernameValue(e.target.value)}
              />
              <span className={`${(isUsernameFocus || usernameValue?.length > 0) ? 'active' : 'hidden' }`}>Username</span>
              { errors.username?.message && (
                <p className='error-msg'>
                  {errors.username?.message}
                </p>
              )}
            </label>
            <label className={`${(errors.username || errors.phonenumber) && 'h-68'}`} onFocus={() => setIsPhoneFocus(true)} onBlur={() => setIsPhoneFocus(false)}>
              <input
                type='tel'
                placeholder={!isPhoneFocus ? 'Phone number' : null}
                className='phone'
                {...register('phone', { 
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
              />
              <span className={`${(isPhoneFocus || phoneValue?.length > 0) ? 'active' : 'hidden' }`}>Phone number</span>
              { errors.phone?.message && (
              <p className='error-msg'>
                {errors.phone?.message}
              </p>
            )}
            </label>
          </div>
          <label onFocus={() => setIsEmailFocus(true)} onBlur={() => setIsEmailFocus(false)}>
            <input
              type='text'
              placeholder={!isEmailFocus ? 'Email address' : null}
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
            />
            <span className={`${(isEmailFocus || emailValue.length > 0) ? 'active' : 'hidden' }`}>Email address</span>
            { errors.email?.message && (
              <p className='error-msg'>
                {errors.email?.message}
              </p>
            )}
          </label>
          <label className='password-field' onFocus={() => setIsPasswordFocus1(true)} onBlur={() => setIsPasswordFocus1(false)}>
            <input
              type={isShow ? 'text' : 'password'}
              placeholder={!isPasswordFocus1 ? 'Add a password' : null}
              className=''
              {...register('password1', { 
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
              onChange={e => setPasswordValue1(e.target.value)}
            />
            <span className={`${(isPasswordFocus1 || passwordValue1.length > 0) ? 'active' : 'hidden' }`}>Add a password</span>
            { passwordValue1.length > 0 && (isShow ? <FaEye className='icon' onClick={() => setIsShow(!isShow)} /> : <FaEyeSlash className='icon' onClick={() => setIsShow(!isShow)} />) }
            { errors.password1?.message && (
              <p className='error-msg'>
                {errors.password1?.message}
              </p>
            )}
          </label>
          { (isPasswordFocus1 || passwordValue1.length > 0) && <PasswordGuidance passwordValue={passwordValue1} />}
          <label className='password-field' onFocus={() => setIsPasswordFocus2(true)} onBlur={() => setIsPasswordFocus2(false)}>
            <input
              type={isShow ? 'text' : 'password'}
              placeholder={!isPasswordFocus2 ? 'Confirm password' : null}
              className=''
              {...register('password2', { 
                required: {
                  value: true, 
                  message: 'Password confirm is required!'
                },
                validate: (val) => {
                  if (watch('password1') !== val) {
                    return "Your confirmation password does not match the original password";
                  }
                }
              })}
              onChange={e => setPasswordValue2(e.target.value)}
            />
            <span className={`${(isPasswordFocus2 || passwordValue2.length > 0) ? 'active' : 'hidden' }`}>Confirm password</span>
            { errors.password2?.message && (
              <p className='error-msg'>
                {errors.password2?.message}
              </p>
            )}
          </label>
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