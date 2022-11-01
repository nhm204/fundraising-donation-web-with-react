import { useEffect, useState } from 'react';
import './Fundraiser.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../common/Header/Header';
import { projects, users } from '../Projects/projects';
import Pagination from '../Pagination/Pagination';


const Fundraiser = () => {
  const [ projectsPerPage, setProjectsPerPage ] = useState(4);
  const [ isAllSelected, setIsAllSelected ] = useState(false);
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;
  const navigate = useNavigate();
  
  console.log(fundraiserId)
  console.log(fundraiserName)
  const fundraiser = users?.find(user => user.id === fundraiserId);
  const allProjects = projects.filter(project => project.creatorId === fundraiserId);
  const currentProjects = allProjects?.filter(project => project.currentPrice < project.targetPrice);
    
  
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
          <div className="project-selection">
            <div className={isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(true)}>All</div>
            <div className={!isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(false)}>Projects ({currentProjects.length})</div>
          </div>
          <Pagination projects={isAllSelected ? allProjects : currentProjects} projectsPerPage={projectsPerPage} />
        </div>
        <div className="contact">
          <h3>Contact Information</h3>
          <div>Facebook: <a href={fundraiser.facebook}>{fundraiser.facebook}</a></div>
          <div>Phone: <a href={`tel:${fundraiser.phone}`}>{fundraiser.phone}</a></div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Fundraiser;