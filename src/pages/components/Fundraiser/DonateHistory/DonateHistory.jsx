import React from 'react';
import { contributionModel, projects } from '../../Projects/projects';


const DonateHistory = ({ contributions }) => {
  

  return (
    <div className='donate-history'>
      { contributions?.length > 0 ? contributions?.map(contribution => (
        <li key={contribution.id} className='contribution'>
          
        </li>
      )) : null }
    </div>
  );
}

export default DonateHistory;