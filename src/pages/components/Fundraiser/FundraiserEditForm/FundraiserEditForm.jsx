import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { users } from '../../Projects/projects';
import './FundraiserEditForm.scss';


const FundraiserEditForm = () => {
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;

  const onSubmit = async (data) => {
    // if (login) {
    //   await signIn(data.email, data.password);
    // } 
  }

  const fundraiser = users?.find(user => user.id === fundraiserId);

  useEffect(() => { 
    document.title = `Edit Profile | ${fundraiser?.name}`;
    window.scrollTo(0, 0); 
  }, [fundraiser?.name]);


  return (
    <div className='fundraiser-edit'>
      <form className='edit-form'>

      </form>
    </div>
  );
}

export default FundraiserEditForm;