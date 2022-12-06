import './PasswordGuidance.scss';
import { BsCircleFill, BsCheck2 } from "react-icons/bs";


const PasswordGuidance = ({ passwordValue }) => {
  const isValidLength = /^.{6,60}$/;
  const isWhitespace = /^(?=.*\s)/;
  const isContainsUppercase = /^(?=.*[A-Z])/;
  const isContainsLowercase = /^(?=.*[a-z])/;
  const isContainsNumber = /^(?=.*[0-9])/;
  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;


  return (
    <div className="guidance">
      <h5>Your password must have:</h5>
      <div className={`${(passwordValue?.length > 0 && isValidLength.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && isValidLength.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>Between 6 and 60 characters</span>
      </div>
      <div className={`${(passwordValue?.length > 0 && !isWhitespace.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && !isWhitespace.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>No whitespaces</span>
      </div>
      <div className={`${(passwordValue?.length > 0 && isContainsUppercase.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && isContainsUppercase.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>1 uppercase letter</span>
      </div>
      <div className={`${(passwordValue?.length > 0 && isContainsLowercase.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && isContainsLowercase.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>1 lowercase letter</span>
      </div>
      <div className={`${(passwordValue?.length > 0 && isContainsNumber.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && isContainsNumber.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>1 number</span>
      </div>
      <div className={`${(passwordValue?.length > 0 && isContainsSymbol.test(passwordValue)) ? 'guidance-text pass' : 'guidance-text'}`}>
        { (passwordValue.length > 0 && isContainsSymbol.test(passwordValue)) ? <BsCheck2 className='check-icon' /> : <BsCircleFill className='icon' /> }
        <span>1 symbol</span>
      </div>
    </div>
  );
}

export default PasswordGuidance;