import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './EditProject.scss';
import { categories } from '../../../../constants/categories';
import { BsCheck, BsCloudUploadFill } from "react-icons/bs";
import PaymentMethods from '../../CreateProject/PaymentMethods/PaymentMethods';


const EditProject = () => {
  const [ isProjectEdit, setIsProjectEdit ] = useState(false);
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isTargetPriceFocus, setIsTargetPriceFocus ] = useState(false);
  const [ isDescriptionFocus, setIsDescriptionFocus ] = useState(false);
  const [ nameValue, setNameValue ] = useState('');
  const [ targetPriceValue, setTargetPriceValue ] = useState(0);
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ descriptionValue, setDescriptionValue ] = useState('');
  const [ projectImage, setProjectImage ] = useState(null);
  const [ projectImageName, setProjectImageName ] = useState(null);
  const [ projectImageSrc, setProjectImageSrc ] = useState('');
  const [ isFeatured, setIsFeatured ] = useState(false);
  const [ isProjectFeatured, setIsProjectFeatured ] = useState(false);
  const [ isPaid, setIsPaid ] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => { 
    // fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
    //   .then(res => res.json())
    //   .then((res) => {
    //     setUserList(res);
    //     // alert('Added successfully');
        
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, []);


  



  const onSubmit = async (data) => {
    if ((projectImageSrc?.length > 0 || projectImage !== null)) {
      // try {
      //   const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
      //     method: 'PUT',
      //     body: JSON.stringify(data)
      //   })
      //   const res = await fetchResponse.json();
      //   console.log(res);
      // } 
      // catch (e) {
      //   return e;
      // } 
      console.log(data)
    }
  }

  console.log(projectImageSrc)


  const handleChangeProjectImage = useCallback((e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProjectImage(reader.result);
        setProjectImageName(e.target.files[0].name);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    setProjectImageSrc('');
  }, [setProjectImage]);

  
  return (
    <div className='start-fundraising'>
      <div className="left">
        <Link to='/' className="logo-wrapper">
          <img src={require ('../../../../assets/img/logo.png')} alt="" className="logo" />
        </Link>
        <h1>Tell us a bit more about your fundraiser</h1>
        <div className='desc'>This information helps us get to know you and your fundraising needs.</div>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit(onSubmit)} className='create-form'>
          <label onFocus={() => setIsNameFocus(true)} onBlur={() => setIsNameFocus(false)}>
            <input
              type='text'
              value={nameValue}
              className={`edit-input ${(nameValue.length > 0 || isNameFocus) && 'input-has-value'}`}
              {...register('name', { 
                // required: {
                //   value: true,
                //   message: 'Project name is required!'
                // },
                // maxLength: {
                //   value: 100,
                //   message: 'Your project name must be less than 100 characters.'
                // }
              })}
              onChange={e => setNameValue(e.target.value)}
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
          <label className='image-label'>
            <div className='title'>Upload a photo or pass an image URL to illustrate your project</div>
            <input 
              type="text" 
              className='edit-input' 
              placeholder='Pass an image URL'
              value={projectImageSrc} 
              onChange={e => {
                setProjectImageSrc(e.target.value);
                setProjectImage(null);
                setProjectImageName('');
              }} 
            />
            { (isProjectEdit && (projectImageSrc?.length === 0 && projectImage === null)) && (
              <p className='error-msg'>
                Project image is required!
              </p>
            )}
            { (projectImage || projectImageSrc) && <img src={projectImage || projectImageSrc} alt={nameValue} className='preview-img' />}
            <div className="choose-file">
              <div className="img-name">{projectImageName}</div>
              <label htmlFor="project-image-file-chosen" className='upload-btn'>
                <BsCloudUploadFill className='icon' />
                Choose file
              </label>
            </div>
            <input type="file" accept='image/*' id='project-image-file-chosen' onChange={handleChangeProjectImage} hidden />
          </label>
          <label className='category-label'>
            What best describes why you're fundraising?
            <div className="selection">
              { categories.map((category, index) => (
                <div 
                  key={index} 
                  className={selectedCategory === category ? 'option active' : 'option'} 
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </label>
          <label className='target-amount' onFocus={() => setIsTargetPriceFocus(true)} onBlur={() => setIsTargetPriceFocus(false)}>
            <input
              type='number'
              value={targetPriceValue}
              className={`edit-input amount-input ${(targetPriceValue > 0 || isTargetPriceFocus) && 'amount-has-value'}`}
              {...register('targetPrice', { 
                min: {
                  value: 1,
                  message: 'Your target price must greater than 1 USD.'
                }
              })}
              onChange={e => setTargetPriceValue(Number(e.target.value))}
            />
            <div className="tag">USD</div>
            <div className={`${(!isTargetPriceFocus && targetPriceValue === 0) ? 'placeholder-container' : 'placeholder-container active'}`}>
              <span className={`placeholder ${isTargetPriceFocus && 'is-focus'}`}>Your target goal</span>
            </div>
            { errors.targetPrice?.message && (
              <p className='error-msg'>
                {errors.targetPrice?.message}
              </p>
            )}
            {/* { targetPriceValue < project?.currentPrice && (
              <p className='error-msg'>
                Project target price must be greater than the current price. Current price: ${project.currentPrice}
              </p>
            )} */}
          </label>
          <label onFocus={() => setIsDescriptionFocus(true)} onBlur={() => setIsDescriptionFocus(false)}>
            <textarea 
              value={descriptionValue}
              name="" 
              id="" 
              cols="30" 
              rows="10"
              maxLength='500'
              className={`edit-input ${(descriptionValue?.length > 0 || isDescriptionFocus) && 'input-has-value'}`}
              {...register("description", {
                // required: {
                //   value: true,
                //   message: 'Project description is required!'
                // },
                maxLength: {
                  value: 100,
                  message: 'Your project description must be less than 500 characters'
                }
              })}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <div className={`${(!isDescriptionFocus && descriptionValue?.length === 0) ? 'placeholder-container t-12' : 'placeholder-container active'}`}>
              <span className={`placeholder ${isDescriptionFocus && 'is-focus'}`}>Description</span>
              { isDescriptionFocus && <span className="quantity">{descriptionValue?.length}/500</span> }
            </div>
            { errors.description?.message && (
              <p className='error-msg'>
                {errors.description?.message}
              </p>
            )}
          </label>
          { !isFeatured && (
            <>
              <label htmlFor="isFeatured" className='checkbox-container'>
                <input 
                  type="checkbox" 
                  id="isFeatured" 
                  {...register('isFeatured')}
                  onChange={e => e.target.checked === true ? setIsProjectFeatured(true) : setIsProjectFeatured(false)}
                />
                <span className="checkmark">
                  { isProjectFeatured && <BsCheck className='icon' /> }
                </span>
                <div className='title'>Featured this product</div>
              </label>
              <div className='tips'>Keeps in mind that this will charge you 5 dollars fee to feature your fundraiser.</div>
              { isProjectFeatured && <PaymentMethods isPaid={isPaid} setIsPaid={setIsPaid} /> }
            </>
          )}
          { (isFeatured || isPaid) && <div className='is-paid'>You have featured this project!</div> }
          <div className='btn-container'>
            { (isProjectFeatured && !isPaid) ? (
              <button 
                type=''
                className='create-btn disabled'
                onClick={() => alert('Please pay to featured this project before submitting!')}
              >
                Submit
              </button>
            ) : (
              <button 
                className='create-btn' 
                onClick={() => {
                  setValue('creatorId', 2);
                  setValue('category', selectedCategory);
                  setValue('image', projectImage || projectImageSrc);
                  // setValue('donationCount', donationCount);
                  // setValue('currentPrice', project?.currentPrice);
                  setIsProjectEdit(true);
                }} 
                type='submit'
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;