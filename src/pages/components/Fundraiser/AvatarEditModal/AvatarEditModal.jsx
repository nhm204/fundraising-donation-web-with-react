import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css";


const AvatarEditModal = ({ avatarSrc, setCropper }) => {
  return (
    <div className='avatar-edit-section'>
      <Cropper 
        src={avatarSrc}
        autoCropArea={1}
        aspectRatio={1}
        viewMode={3}
        background={false}
        highlight={false}
        responsive={true}
        guides={false}
        cropBoxResizable={false}
        onInitialized={instance => {
          setCropper(instance);
        }}
        className='cropper'
      />
    </div>
  );
}

export default AvatarEditModal;