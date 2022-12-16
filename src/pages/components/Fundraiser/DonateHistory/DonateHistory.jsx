import React from 'react';
import { Link } from 'react-router-dom';
import './DonateHistory.scss';


const DonateHistory = ({ totalDonatedProjectId, projects, contributions }) => {
  let donatedProjects = [];
  for (let i = 0; i < totalDonatedProjectId?.length; i++) {
    let temp = projects?.find(project => project.id === totalDonatedProjectId[i]);
    donatedProjects.unshift(temp);
  }
    
  console.log(donatedProjects)
  console.log(contributions)

  return (
    <div className='donate-history'>
      <h1>Donation History</h1>
      <ul>
        { donatedProjects?.length > 0 ? donatedProjects?.map((project, index) => (
          <li key={index} className='contribution'>
            <img src={project?.image} alt={project?.name} />
            <div className="info-wrapper">
              <div className='title'>Donate for <Link to={`/discover/${project?.name}/${project?.id}`}>{project?.name}</Link></div>
              <div className="info">
                <div className='amount'>${contributions[index]?.amount}</div>
                { contributions[index]?.createAt !== null && <div className='time'>at {contributions[index]?.createAt?.slice(0, 10)}</div> }
              </div>
            </div>
          </li>
        )) : null }
      </ul>
    </div>
  );
}

export default DonateHistory;