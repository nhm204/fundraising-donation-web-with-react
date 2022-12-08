import React, { useEffect, useState } from 'react';
import './Checkout.scss';
import { Link, useParams } from 'react-router-dom';
import { projects, users } from '../Projects/projects';
import { BsChevronLeft } from 'react-icons/bs';
import { FaDollarSign } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const Checkout = () => {
  const [ donationAmount, setDonationAmount ] = useState(0);
  const [ isAmountFocus, setIsAmountFocus ] = useState(false);
  const [ isPaid, setIsPaid ] = useState(false);
  const [ error, setError ] = useState(null);
  const paramValue = useParams();
  const projectName = paramValue.name;
  const projectId = paramValue.id;


  const project = projects.find(element => element.id === paramValue.id);
  const fundraiser = users.find(user => user.id === project.creatorId);
  

  const handleApprove = (orderId) => {
    setIsPaid(true);
  }
  if (isPaid) {
    alert(`Thank you for donating to ${projectName}`);
    setIsPaid(false);
  }
  if (error) {
    alert(error);
    setError(null);
  }


  useEffect(() => { 
    document.title = `Donate to ${project?.name} | #${projectId}`;
    window.scrollTo(0, 0); 


    // fetch(`https://betterworld-doan.herokuapp.com/api/projects`)
    //   .then(res => res.json())
    //   .then((res) => {
    //     setProjects(res);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, [project?.name, projectId]);


  return (
    <div className='checkout'>
      <header>
        <Link to='/' className='logo'>BetterWorld</Link>
        <div className="text">
          Already have an account?
          <Link to='/signin' className='nav-link'>Sign in</Link>
        </div>
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
            <img src={project.image} alt={projectName} />
            <div className="content">
              <div className='title'>You're supporting <span>{projectName}</span></div>
              <div className='fundraiser'>You're donation will benefit <span>{fundraiser.name}</span></div>
            </div>
          </div>
          <div className="donation-section">
            <label htmlFor="donation-amount">Enter your donation</label>
            <div className={`input-field ${isAmountFocus && 'focus'}`}>
              <div className="currency">
                <FaDollarSign className='icon' />
                <div>USD</div>
              </div>
              <input
                required
                id='donation-amount'
                type='number'
                className='amount-input'
                onChange={e => setDonationAmount(e.target.value)}
                onFocus={() => setIsAmountFocus(true)}
                onBlur={() => setIsAmountFocus(false)}
              />
              <span className='text'>.00</span>
            </div>
          </div>
          <h4 className='payment-title'>Choose your payment method</h4>
          <div className="payment-section">
            <PayPalScriptProvider>
              <PayPalButtons
                createOrder = {(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        description: project.name,
                        amount: {
                          value: donationAmount,
                          currency: 'USD',
                        },
                      },
                    ],
                  });
                }}
                onApprove = { async (data, action) => {
                    const order = await action.order.capture();
                    console.log("order", order);
                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    console.log("PayPal Checkout onError", err);
                }}
              />
            </PayPalScriptProvider>
          </div>
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