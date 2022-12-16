import { Cropper } from 'react-cropper';
import "cropperjs/dist/cropper.css";


const ProjectImageEditModal = ({ projectImageSrc, setCropper }) => {
  return (
    <div className='project-img-edit-section'>
      <Cropper 
        src={projectImageSrc}
        autoCropArea={1}
        aspectRatio={16 / 9}
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

export default ProjectImageEditModal;