import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../../../hooks/useGlobalState';
import PaymentCheckout from './PaymentCheckout/PaymentCheckout';
import { projects, users } from '../../../constants/projects';


const Checkout = () => {
  const [ username, setUsername ] = useGlobalState('username');
  const [ projectList, setProjectList ] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ donationAmount, setDonationAmount ] = useState(0);
  const [ isAmountFocus, setIsAmountFocus ] = useState(false);
  const [ isPaid, setIsPaid ] = useState(false);
  const [ isDonated, setIsDonated ] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const paramValue = useParams();
  const projectName = paramValue.name;
  const projectId = paramValue.id;


  useEffect(() => { 
    fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then((res) => {
        setProjectList(res);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
      .then(res => res.json())
      .then((res) => {
        setUserList(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  const project = projectList?.find(project => project.id === +projectId);
  const fundraiser = userList?.find(user => user.id === project?.creatorId);
  const user = userList?.find(user => user.name === username);


  useEffect(() => {
    if (project.creatorId === user?.id) {
      navigate(`/discover/${project.name}/${project.id}`);
      alert('You cannot donate to your project!')
    }
  }, [navigate, project.creatorId, user?.id, project.name, project.id]);


  const onSubmit = async (data) => {
    if (isDonated) {
      try {
        const fetchResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/contribution`, {
          method: 'POST',
          body: JSON.stringify(data)
        })
        const res = await fetchResponse.json();
        console.log(res);
        if (res === 'Added successfully') {
          alert(`Thank you for donating to ${projectName}`);
          window.history.back();
        }
      } 
      catch (e) {
        return e;
      } 
      console.log(data);
    }
  }

  
  useEffect(() => { 
    document.title = `Donate to ${project?.name} | #${projectId}`;
    window.scrollTo(0, 0); 
  }, [project?.name, projectId]);
 

  return (
    <div className='checkout'>
      <header>
        <Link to='/' className='logo'>BetterWorld</Link>
        { username === null ? (
          <div className="text">
            Already have an account?
            <Link to='/signin' className='nav-link'>Sign in</Link>
          </div>
        ) : (
          <div className='right-side'>
            <Link to={`/fundraiser/${username}/${user?.id}`} className="avatar-wrapper">
              <img src={user?.avatar} alt="" className='user-avatar' />
            </Link>
            <Link to='/create/fundraiser/regform' className='fundraise-btn'>
              Start a Fundraising
            </Link>
          </div>
        )}
      </header>
      <div className="checkout-body">
        <div className="left">
          <button
            className='back-btn'
            onClick={() => window.history.back()}
          >
            <BsChevronLeft className='icon'/>
            Return to project
          </button>
          <div className="project-info">
            <img src={project?.image} alt={projectName} />
            <div className="content">
              <div className='title'>You're supporting <span>{projectName}</span></div>
              <div className='fundraiser'>You're donation will benefit <span>{fundraiser?.name}</span></div>
            </div>
          </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="donation-section">
                <label htmlFor="donation-amount" onFocus={() => setIsAmountFocus(true)} onBlur={() => setIsAmountFocus(false)}>
                  Enter your donation
                  <div className={`input-field ${isAmountFocus && 'focus'}`}>
                    <div className="currency">
                      <FaDollarSign className='icon' />
                      <div>USD</div>
                    </div>
                    <input
                      id='donation-amount'
                      type='number'
                      className='amount-input'
                      {...register("amount", {
                        required: {
                          value: true,
                          message: 'Donation price is required!'
                        },
                        min: {
                          value: 1,
                          message: 'Your donation price must be greater than 1 USD.'
                        },
                        max: {
                          value: project?.targetPrice - project?.currentPrice,
                          message: 'Your donation price is greater than target price.'
                        }
                      })}
                      onChange={e => setDonationAmount(e.target.value)}
                    />
                    <span className='text'>.00</span>
                  </div>
                  { errors.amount?.message && (
                    <p className='error-msg'>
                      {errors.amount?.message}
                    </p>
                  )}
                </label>
              </div>
              { !isPaid ? ( 
                <PaymentCheckout setIsPaid={setIsPaid} isPaid={isPaid} projectName={projectName} donationAmount={donationAmount} />
              ) : (
                <div className="btn-wrapper">
                  { (username === null || +donationAmount === 0 || (+donationAmount > 0 && !isPaid)) ? (
                    <button 
                      type='submit' 
                      className='next-btn disabled'
                      onClick={() => {
                        if (username === null) {
                          alert('Please login before continuing on donation');
                        }
                        if (+donationAmount > 0 && !isPaid) {
                          alert('Please pay before continuing on donation');
                        }
                      }}
                    >
                      Complete donation
                    </button>
                  ) : (
                    <button 
                      type='submit' 
                      className='next-btn'
                      onClick={() => {
                        setValue('userId', user?.id);
                        setValue('projectId', project?.id);
                        setIsDonated(true);
                      }}
                    >
                      Complete donation
                    </button>
                  )}
                </div>
              )}
            </form>
        </div>
        <div className="right">
          <h3>Your donation</h3>
          <div className="donate-price">
            <div>Your donation</div>
            <div>${donationAmount || 0}.00</div>
          </div>
          <div className="total-price">
            <div>Total amount</div>
            <div>${donationAmount || 0}.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;