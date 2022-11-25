import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import './StartFundraising.scss';


const StartFundraising = () => {
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ nameValue, setNameValue ] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    
  }

  
  return (
    <div className='start-fundraising'>
      <div className="left">
        <div className="logo-wrapper">
          <img src={require ('../../../../assets/img/logo.png')} alt="" className="logo" />
        </div>
        <h1>Tell us a bit more about your fundraiser</h1>
        <div className='desc'>This information helps us get to know you and your fundraising needs.</div>
      </div>
      <div className="right">
        <Link to='/create/fundraiser/signin' className='sign-in-btn'>Sign in</Link>
        <form onSubmit={handleSubmit(onSubmit)} className='create-form'>
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
              <span className={`placeholder ${isNameFocus && 'is-focus'}`}>Project name</span>
              { isNameFocus && <span className='quantity'>{nameValue?.length}/100</span> }
            </div>
            { errors.name?.message && (
              <p className='error-msg'>
                {errors.name?.message}
              </p>
            )}
          </label>
          <label htmlFor="">What best describes why you're fundraising?</label>
          <div className="selection-group">
            <div className="selection">
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StartFundraising;