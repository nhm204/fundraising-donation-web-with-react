import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './EditProjectModal.scss';
import { IoCloseOutline, IoArrowBackOutline, IoLink } from "react-icons/io5";
import { categories } from '../../../../constants/categories';
import ProjectImageEditModal from './ProjectImageEditModal';
import { BsCheck } from "react-icons/bs";
import PaymentMethods from '../../CreateProject/PaymentMethods/PaymentMethods';


const EditProjectModal = ({ project, setIsProjectEditModal, user }) => {
  const [ isProjectEdit, setIsProjectEdit ] = useState(false);
  const [ isChangeImageURL, setIsChangeImageURL ] = useState(false);
  const [ isProjectImageEdit, setIsProjectImageEdit ] = useState(false);
  const [ cropper, setCropper ] = useState();
  const [ cropProjectImage, setCropProjectImage ] = useState(null);
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isTargetPriceFocus, setIsTargetPriceFocus ] = useState(false);
  const [ isDescriptionFocus, setIsDescriptionFocus ] = useState(false);
  const [ nameValue, setNameValue ] = useState(project?.name);
  const [ targetPriceValue, setTargetPriceValue ] = useState(project?.targetPrice);
  const [ selectedCategory, setSelectedCategory ] = useState(project?.category);
  const [ descriptionValue, setDescriptionValue ] = useState(project?.description);
  const [ projectImage, setProjectImage ] = useState(null);
  const [ projectImageName, setProjectImageName ] = useState(null);
  const [ projectImageSrc, setProjectImageSrc ] = useState('');
  const [ isFeatured, setIsFeatured ] = useState(false);
  const [ isProjectFeatured, setIsProjectFeatured ] = useState(project?.isFeatured);
  const [ isPaid, setIsPaid ] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();


  useEffect(() => { 
    document.title = `Edit ${project?.name} on BetterWorld`;
    window.scrollTo(0, 0); 

    if (project?.image.includes('https://' || 'http://')) {
      setProjectImageSrc(project?.image);
    }
    if (project?.image.includes('data:image/')) {
      setProjectImage(project?.image);
      setProjectImageName(project?.imageName);
    }
  }, [project?.name, project?.image, project?.imageName]);


  const onSubmit = async (data) => {
    if (isProjectEdit) {
      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
          method: 'PUT',
          body: JSON.stringify(data)
        })
        const res = await fetchResponse.json();
        alert(res);
        if (res === 'Update successfully') {
          setIsProjectEditModal(false);
        }
      } 
      catch (e) {
        return e;
      } 
      console.log(data)
    }
  }


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
    setIsChangeImageURL(false);
    setIsProjectImageEdit(true);
  }, [setProjectImage]);


  const handleCropProjectImage = () => {
    setIsProjectEditModal(true);
    if (typeof cropper !== "undefined") {
      setCropProjectImage(cropper.getCroppedCanvas().toDataURL());
    }
    setIsProjectImageEdit(false);
  }

  console.log(isProjectEdit)

  return (
    <div className='project-edit'>
      <form onSubmit={handleSubmit(onSubmit)} className={`edit-form ${isProjectImageEdit && 'edit-form--has-cropper'}`}>
        <header className='edit-header'>
          <div className='blur-bg' />
          <div className='header-content'>
            <div className='header-heading'>
            { (!isProjectImageEdit) ? (
                <IoCloseOutline onClick={() => setIsProjectEditModal(false)} className='icon' />
              ) : (
                <IoArrowBackOutline 
                  onClick={() => {
                    setIsProjectImageEdit(false);
                  }} 
                  className='icon' 
                />
              )}
              <h3>{(!isProjectImageEdit) ? 'Edit project' : 'Edit media'}</h3>
            </div>
            { !isProjectImageEdit ? (
              <button 
                type='submit' 
                onClick={() => {
                  setValue('id', project.id);
                  setValue('creatorId', user?.id);
                  setValue('category', selectedCategory);
                  if (projectImage !== null) {
                    setValue('image', (cropProjectImage || projectImage));
                    setValue('imageName', projectImageName);
                  }
                  else {
                    setValue('imageName', 'image');
                  }
                  setValue('createAt', project?.createAt);
                  setValue('donationCount', 0);
                  setValue('currentPrice', 0);
                  if (projectImageSrc?.length > 0 || cropProjectImage !== null || projectImage !== null) {
                    setIsProjectEdit(true);
                  }
                }} 
                className='save-btn'
              >
                Save
              </button> 
            ) : (
              <button onClick={handleCropProjectImage} className='save-btn'>Apply</button>
            )}
          </div>
        </header>
        { !isProjectImageEdit ? (
          <>
            <div className="project-img-container">
              <img src={cropProjectImage || projectImage || projectImageSrc} alt="" className='project-img' />
              <div className="btn-container">
                <label htmlFor='background-file-chosen' className='edit-project-img-btn'>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                        <path
                        d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
                        ></path>
                    </g>
                  </svg>
                </label>
                <input type="file" accept='image/*' id='background-file-chosen' onChange={handleChangeProjectImage} hidden />
                <button className='edit-project-img-btn' onClick={() => setIsChangeImageURL(true)}>
                  <IoLink className="icon" />
                </button>
              </div>
            </div>
            <div className="info-container">
              <div className='input-group'>
                { (isChangeImageURL || projectImageSrc) ? (
                  <label className='image-label'>
                    <input 
                      type="text" 
                      className='edit-input' 
                      placeholder='Pass an image URL'
                      value={projectImageSrc} 
                      {...register('image', { 
                        required: {
                          value: projectImage === null ? true : false,
                          message: 'Project image is required!'
                        }
                      })}
                      onChange={e => {
                        setProjectImageSrc(e.target.value);
                        setProjectImage(null);
                        setProjectImageName('');
                        setCropProjectImage(null);
                      }} 
                    />
                    { errors.image?.message && (
                      <p className='error-msg'>
                          {errors.image?.message}
                      </p>
                    )}
                  </label>
                ) : null }
                <label onFocus={() => setIsNameFocus(true)} onBlur={() => setIsNameFocus(false)}>
                  <input
                    type='text'
                    value={nameValue}
                    className={`edit-input ${(nameValue.length > 0 || isNameFocus) && 'input-has-value'}`}
                    {...register('name', { 
                      required: {
                        value: true,
                        message: 'Project name is required!'
                      },
                      maxLength: {
                        value: 100,
                        message: 'Your project name must be less than 100 characters.'
                      }
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
                    value={targetPriceValue}
                    type='number'
                    className={`edit-input amount-input ${(targetPriceValue > 0 || isTargetPriceFocus) && 'amount-has-value'}`}
                    {...register('targetPrice', { 
                      min: {
                        value: 1 || project?.currentPrice,
                        message: project?.currentPrice === 0 ? 'Your target price must greater than 1 USD.' : 'Your target price must greater than or euqal to your current price.'
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
                      required: {
                        value: true,
                        message: 'Project description is required!'
                      },
                      maxLength: {
                        value: 500,
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
                { !isProjectFeatured ? (
                  (!isPaid) ? (
                    <>
                      <label htmlFor="isFeatured" className='checkbox-container'>
                        <input 
                          type="checkbox" 
                          id="isFeatured" 
                          {...register('isFeatured')}
                          onChange={(e) => e.target.checked === true ? setIsFeatured(true) : setIsFeatured(false)}
                        />
                        <span className="checkmark">
                          { isFeatured && <BsCheck className='icon' /> }
                        </span>
                        <div className='title'>Featured this product</div>
                      </label>
                      <div className='tips'>Keeps in mind that this will charge you 5 dollars fee to feature your fundraiser.</div>
                      { isFeatured && <PaymentMethods isPaid={isPaid} setIsPaid={setIsPaid} /> }
                    </>
                  ) : (
                    <div className='is-paid'>You have featured this project!</div>
                  )
                ) : (
                  <div className='is-paid'>You have featured this project!</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <ProjectImageEditModal projectImageSrc={projectImage} setCropper={setCropper} />
        )}
      </form>
    </div>
  );
}

export default EditProjectModal;