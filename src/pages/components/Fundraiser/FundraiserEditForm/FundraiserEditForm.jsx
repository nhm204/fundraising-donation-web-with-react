import React, { useEffect, useState } from 'react';
import './FundraiserEditForm.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoCloseOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordGuidance } from '../../../../common';


const FundraiserEditForm = ({ fundraiser, setIsEdit }) => {
  const [ profileEdit, setProfileEdit ] = useState(false);
  const [ isPasswordFocus, setIsPasswordFocus ] = useState(false);
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isPhoneFocus, setIsPhoneFocus ] = useState(false);
  const [ isDescriptionFocus, setIsDescriptionFocus ] = useState(false);
  const [ isFacebookFocus, setIsFacebookFocus ] = useState(false);
  const [ isTwitterFocus, setIsTwitterFocus ] = useState(false);
  const [ passwordValue, setPasswordValue ] = useState('');
  const [ nameValue, setNameValue ] = useState(fundraiser.name);
  const [ phoneValue, setPhoneValue ] = useState(fundraiser.phoneNumber);
  const [ descriptionValue, setDescriptionValue ] = useState(fundraiser.description);
  const [ facebookValue, setFacebookValue ] = useState(fundraiser.facebook);
  const [ twitterValue, setTwitterValue ] = useState(fundraiser.twitter);
  const [ isShow, setIsShow ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
 

  const onSubmit = async (data) => {
    if (profileEdit) {
    //   await signIn(data.email, data.password);
    } 
  }


  return (
    <div className='fundraiser-edit'>
      <form onSubmit={handleSubmit(onSubmit)} className='edit-form'>
        <div className='edit-header'>
          <div className='blur-bg' />
          <div className='header-content'>
            <div className='header-heading'>
              <IoCloseOutline onClick={() => setIsEdit(false)} className='icon'/>
              <h3>Edit profile</h3>
            </div>
            <button onClick={() => setProfileEdit(true)} className='save-btn'>Save</button>
          </div>
        </div>
        <div className="cover-bg-container">
          <img src={fundraiser.coverBackground} alt="" className='cover-bg' />
          <button className='edit-cover-bg-btn'>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div className="info-container">
          <div className="avatar-container">
            <img src={fundraiser.avatar} alt="" className="avatar" />
            <button className="edit-ava-btn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
          <div className='input-group'>
            <label className=''>
              <input
                required
                value={nameValue}
                type='text'
                className={`edit-input ${(nameValue.length > 0 || isNameFocus) && 'input-has-value'}`}
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
              <div className={`${(!isNameFocus && nameValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${isNameFocus && 'is-focus'}`}>Name</span>
                { isNameFocus && <span className='quantity'>{nameValue?.length}/100</span> }
              </div>
              { errors.name?.message && (
                <p className='error-msg'>
                  {errors.name?.message}
                </p>
              )}
            </label>
            <label className=''>
              <input
                required
                value={phoneValue}
                type='tel'
                className={`edit-input ${(phoneValue.length > 0 || isPhoneFocus) && 'input-has-value'}`}
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
              <div className={`${(!isPhoneFocus && phoneValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${isPhoneFocus && 'is-focus'}`}>Phone number</span>
                { isPhoneFocus && <span className="quantity">{phoneValue?.length}/10</span> }
              </div>
              { errors.phonenumber?.message && (
                <p className='error-msg'>
                  {errors.phonenumber?.message}
                </p>
              )}
            </label>
            <label htmlFor="">
              <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="4"
                maxLength='160'
                className={`edit-input ${(descriptionValue?.length > 0 || isDescriptionFocus) && 'input-has-value'}`}
                onChange={(e) => setDescriptionValue(e.target.value)}
                onFocus={() => setIsDescriptionFocus(true)}
                onBlur={() => setIsDescriptionFocus(false)}
              >
                {descriptionValue}
              </textarea>
              <div className={`${(!setIsDescriptionFocus && descriptionValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${setIsDescriptionFocus && 'is-focus'}`}>Bio</span>
                { isDescriptionFocus && <span className="quantity">{descriptionValue?.length}/160</span> }
              </div>
            </label>
            <label className='password-field'>
              <input
                type={isShow ? 'text' : 'password'}
                className={`edit-input ${(passwordValue.length > 0 || isPasswordFocus) && 'input-has-value'}`}
                {...register('password', {
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
              <div className={`${(!isPasswordFocus && passwordValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${isPasswordFocus && 'is-focus'}`}>New password</span>
                { isPasswordFocus && <span className="quantity">{passwordValue?.length}/60</span> }
              </div>
              { passwordValue.length > 0 && (isShow ? <FaEye className='icon' onClick={() => setIsShow(!isShow)} /> : <FaEyeSlash className='icon' onClick={() => setIsShow(!isShow)} />) }
              { errors.password?.message && (
                <p className='error-msg'>
                  {errors.password?.message}
                </p>
              )}
            </label>
            { (isPasswordFocus || passwordValue.length > 0) && <PasswordGuidance passwordValue={passwordValue} /> }
            <label className=''>
              <input
                value={facebookValue}
                type='text'
                className={`edit-input ${(facebookValue.length > 0 || isFacebookFocus) && 'input-has-value'}`}
                {...register('facebook', {
                  pattern: {
                    value: /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/,
                    message: 'Please enter a valid facebook link.'
                  }
                })}
                onChange={e => setFacebookValue(e.target.value)}
                onFocus={() => setIsFacebookFocus(true)}
                onBlur={() => setIsFacebookFocus(false)}
              />
              <div className={`${(!isFacebookFocus && facebookValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${isFacebookFocus && 'is-focus'}`}>Facebook</span>
              </div>
              { errors.facebook?.message && (
                <p className='error-msg'>
                  {errors.facebook?.message}
                </p>
              )}
            </label>
            <label className=''>
              <input
                value={twitterValue}
                type='link'
                className={`edit-input ${(twitterValue.length > 0 || isTwitterFocus) && 'input-has-value'}`}
                {...register('twitter', {
                  pattern: {
                    value: /^(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/,
                    message: 'Please enter a valid twitter link.'
                  }
                })}
                onChange={e => setTwitterValue(e.target.value)}
                onFocus={() => setIsTwitterFocus(true)}
                onBlur={() => setIsTwitterFocus(false)}
              />
              <div className={`${(!isTwitterFocus && twitterValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
                <span className={`placeholder ${isTwitterFocus && 'is-focus'}`}>Twitter</span>
              </div>
              { errors.twitter?.message && (
                <p className='error-msg'>
                  {errors.twitter?.message}
                </p>
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FundraiserEditForm;