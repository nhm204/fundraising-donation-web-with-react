import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './EditProjectModal.scss';
import { IoCloseOutline, IoLink } from "react-icons/io5";


const EditProjectModal = ({ project, setIsProjectEditModal }) => {
  const [ isProjectEdit, setIsProjectEdit ] = useState(false);
  const [ isChangeImageURL, setIsChangeImageURL ] = useState(false);
  const [ isNameFocus, setIsNameFocus ] = useState(false);
  const [ isTargetPriceFocus, setIsTargetPriceFocus ] = useState(project?.targetPrice);
  const [ isDescriptionFocus, setIsDescriptionFocus ] = useState(project?.description);
  const [ nameValue, setNameValue ] = useState(project?.name);
  const [ targetPriceValue, setTargetPriceValue ] = useState(project?.targetPrice);
  const [ selectedCategory, setSelectedCategory ] = useState(project?.category);
  const [ descriptionValue, setDescriptionValue ] = useState('');
  const [ projectImage, setProjectImage ] = useState(null);
  const [ projectImageName, setProjectImageName ] = useState(null);
  const [ projectImageSrc, setProjectImageSrc ] = useState('');
  const [ isFeatured, setIsFeatured ] = useState(project?.isFeatured);
  const [ isProjectFeatured, setIsProjectFeatured ] = useState(false);
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
    if (isProjectEdit && (projectImageSrc?.length > 0 || projectImage !== null)) {
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
    <div className='project-edit'>
      <form onSubmit={handleSubmit(onSubmit)} className='edit-form'>
        <header className='edit-header'>
          <div className='blur-bg' />
          <div className='header-content'>
            <div className='header-heading'>
              <IoCloseOutline onClick={() => setIsProjectEditModal(false)} className='icon' />
              <h3>Edit project</h3>
            </div>
            <button 
              type='submit' 
              onClick={() => {
                // setValue('avatar', String(cropAvatar || fundraiser.avatar));
                // setValue('coverBackground', String(cropBackground || fundraiser.coverBackground));
                setIsProjectEdit(true);
              }} 
              className='save-btn'
            >
              Save
            </button> 
          </div>
        </header>
        <div className="project-img-container">
          <img src={projectImage || projectImageSrc} alt="" className='project-img' />
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
            
                
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProjectModal;