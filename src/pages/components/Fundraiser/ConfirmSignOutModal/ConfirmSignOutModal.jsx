import { setGlobalState } from '../../../../hooks/useGlobalState';
import './ConfirmSignOutModal.scss';


const ConfirmSignOutModal = ({ setIsConfirmModalShow }) => {
  return (
    <div className='confirm-modal'>
      <h5>Do you want to sign out?</h5>
      <div className="btn-container">
        <button 
          className='cancel-btn' 
          onClick={() => setIsConfirmModalShow(false)}
        >
            Cancel
        </button>
        <button 
          className='confirm-btn' 
          onClick={() => {
            setGlobalState('username', null);
            localStorage.removeItem('globalUsername');
            setIsConfirmModalShow(false);
          }}
        >
            Ye, sure!
        </button>
      </div>
    </div>
  );
}

export default ConfirmSignOutModal;