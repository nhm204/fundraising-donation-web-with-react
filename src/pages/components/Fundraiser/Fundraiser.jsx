import { useEffect, useState } from 'react';
import './Fundraiser.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../common/Header/Header';
import { projects, users } from '../Projects/projects';
import Pagination from '../Pagination/Pagination';


const Fundraiser = () => {
  const [ projectsPerPage, setProjectsPerPage ] = useState(4);
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;
  const navigate = useNavigate();
  
  console.log(fundraiserId)
  console.log(fundraiserName)
  const fundraiser = users?.find(user => user.id === fundraiserId);
  const projectsByFundraiser = projects?.filter(project => project.creatorId === fundraiserId);
    
  
  useEffect(() => { 
    document.title = `${fundraiser?.name} | BetterWorld`;
    window.scrollTo(0, 0); 
  }, [fundraiser?.name]);


  return (
    <div id={fundraiserId} className='fundraiser-section'>
      <Header link={'Discover'} />
      <div className="container">
        <img src={fundraiser.coverBackground} alt="" className="cover-bg" />
        <div className="info">
          <img src={fundraiser.avatar} alt="" className="avatar" />
          <h1>{fundraiser.name}</h1>
          <div className="id">Fundraiser #{fundraiserId}</div>
        </div>
        <i className="bio">{fundraiser.bio}</i>
        <div className='projects-wrapper'>
          <h3>Projects ({projectsByFundraiser.length})</h3>
          <Pagination projects={projectsByFundraiser} projectsPerPage={projectsPerPage} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Fundraiser;