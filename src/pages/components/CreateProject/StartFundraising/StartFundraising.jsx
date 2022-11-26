import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import './StartFundraising.scss';
import { categories } from '../../../../constants/categories';
import { BsCheck } from "react-icons/bs";
import PaymentMethods from '../../PaymentMethods/PaymentMethods';


const StartFundraising = () => {
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isTargetPriceFocus, setIsTargetPriceFocus ] = useState(false);
  const [ isDescriptionFocus, setIsDescriptionFocus ] = useState(false);
  const [ nameValue, setNameValue ] = useState('');
  const [ targetPriceValue, setTargetPriceValue ] = useState(0);
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ descriptionValue, setDescriptionValue ] = useState('');
  const [ isFeatured, setIsFeatured ] = useState(false);
  const [ isPaid, setIsPaid ] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => { 
    document.title = `Create a BetterWorld`;
    window.scrollTo(0, 0); 
  }, []);


  const onSubmit = async (data) => {
    
  }

  console.log(isFeatured)
  
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
        <nav>
          <Link to='/create/fundraiser/signin'>
            <button className='sign-in-btn'>Sign In</button>
          </Link>
        </nav>
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
          <label className='category-label'>
            What best describes why you're fundraising?
            <div className="selection">
              { categories.map((category, index) => (
                <div key={index} className={selectedCategory === category ? 'option active' : 'option'} onClick={() => setSelectedCategory(category)}>{category}</div>
              ))}
            </div>
          </label>
          <label className='target-amount'>
            <input
              required
              type='number'
              className={`edit-input amount-input ${(targetPriceValue > 0 || isTargetPriceFocus) && 'amount-has-value'}`}
              {...register('targetPrice', { 
                min: {
                  value: 1,
                  message: 'Your target price must greater than 1 USD.'
                }
              })}
              onChange={e => setTargetPriceValue(Number(e.target.value))}
              onFocus={() => setIsTargetPriceFocus(true)}
              onBlur={() => setIsTargetPriceFocus(false)}
            />
            <div className="tag">USD</div>
            <div className={`${(!isTargetPriceFocus && targetPriceValue === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
              <span className={`placeholder ${isTargetPriceFocus && 'is-focus'}`}>Your target goal</span>
            </div>
          </label>
          <label htmlFor="">
            <textarea 
              name="" 
              id="" 
              cols="30" 
              rows="10"
              maxLength='500'
              className={`edit-input ${(descriptionValue?.length > 0 || isDescriptionFocus) && 'input-has-value'}`}
              onChange={(e) => setDescriptionValue(e.target.value)}
              onFocus={() => setIsDescriptionFocus(true)}
              onBlur={() => setIsDescriptionFocus(false)}
            >
              {descriptionValue}
            </textarea>
            <div className={`${(!setIsDescriptionFocus && descriptionValue?.length === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
              <span className={`placeholder ${setIsDescriptionFocus && 'is-focus'}`}>Description</span>
              { isDescriptionFocus && <span className="quantity">{descriptionValue?.length}/500</span> }
            </div>
          </label>
          { !isPaid && (
            <>
              <label htmlFor="isFeatured" className='checkbox-container'>
                <input 
                  type="checkbox" 
                  name="" 
                  id="isFeatured" 
                  onChange={(e) => {
                    e.target.checked === true ? setIsFeatured(true) : setIsFeatured(false)
                  }}
                />
                <span class="checkmark">
                  { isFeatured && <BsCheck className='icon' /> }
                </span>
                <div className='title'>Featured this product</div>
              </label>
              <div className='tips'>Keeps in mind that this will charge you 5 dollars fee to feature your fundraiser</div>
              { isFeatured && <PaymentMethods isFeatured={isFeatured} isPaid={isPaid} setIsPaid={setIsPaid} />}
            </>
          )}
          { isPaid && <div className='is-paid'>You have featured this project!</div>}
        </form>
      </div>
    </div>
  );
}

export default StartFundraising;