import { setGlobalState } from '../../../../hooks/useGlobalState';
import './ConfirmSignOutModal.scss';


const ConfirmSignOutModal = ({ isConfirmModalShow, setIsConfirmModalShow, isModalShow, setIsModalShow }) => {
  return (
    <div className='confirm-modal'>
      <h5>Do you want to sign out?</h5>
      <div className="btn-container">
        <button 
          className='cancel-btn' 
          onClick={() => {
            if (isConfirmModalShow) {
              setIsConfirmModalShow(false);
            }
            if (isModalShow) {
              setIsModalShow(false);
            }
          }}
        >
            Cancel
        </button>
        <button 
          className='confirm-btn' 
          onClick={() => {
            setGlobalState('username', null);
            localStorage.removeItem('globalUsername');
            if (isConfirmModalShow) {
              setIsConfirmModalShow(false);
            }
            if (isModalShow) {
              setIsModalShow(false);
            }
          }}
        >
            Ye, sure!
        </button>
      </div>
    </div>
  );
}

export default ConfirmSignOutModal;