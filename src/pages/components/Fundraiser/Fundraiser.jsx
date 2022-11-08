import { useEffect, useState } from 'react';
import './Fundraiser.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../common/Header/Header';
import { projects, users } from '../Projects/projects';
import Pagination from '../Pagination/Pagination';
import { FaFacebook, FaTwitter, FaYoutube, FaAward, FaChild } from "react-icons/fa";


const Fundraiser = () => {
  const [ projectsPerPage, setProjectsPerPage ] = useState(6);
  const [ isAllSelected, setIsAllSelected ] = useState(false);
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;
  const navigate = useNavigate();
  

  const fundraiser = users?.find(user => user.id === fundraiserId);
  const allProjects = projects.filter(project => project.creatorId === fundraiserId);
  const currentProjects = allProjects?.filter(project => project.currentPrice < project.targetPrice);
  console.log(fundraiser.description)
  
  useEffect(() => { 
    document.title = `${fundraiser?.name} | BetterWorld`;
    window.scrollTo(0, 0); 
  }, [fundraiser?.name]);

  console.log(fundraiserName.length)


  return (
    <div id={fundraiserId} className='fundraiser-section'>
      <Header link={'Discover'} />
      <div className="heading-container">
        <img src={fundraiser.coverBackground} alt="" className="cover-bg" />
        <div className="info-container">
          <img src={fundraiser.avatar} alt="" className="avatar" />
          <div className="info">
            <div>
            <h1>{fundraiserName}</h1>
              <div className="id">Fundraiser #{fundraiserId}</div>
            </div>
              <i className="bio">{fundraiser.description}</i>
          </div>
        </div>
      </div>
      <div className="body-container">
        <div className="overview">
          <div className="contact">
            <h3>Contact</h3>
            <div>Phone: <a href={`tel:${fundraiser.phone}`}>{fundraiser.phone}</a></div>
            <div>Email: <a href={`mailto:${fundraiser.phone}`}>{fundraiser.email}</a></div>
            <div className="social">
              { fundraiser.facebook && <a href={fundraiser.facebook}><FaFacebook className='icon' /></a> }
              { fundraiser.twitter && <a href={fundraiser.twitter}><FaTwitter className='icon' /></a> }
              <FaYoutube className='icon' />
            </div>
          </div> 
          <div className="donate-count">
            <h2>$500,000</h2>
            <div>donated for <span>243 projects</span></div>
            <FaAward className='icon' />
          </div>
          <div className="support">
            <h2>$12,868</h2>
            <div>raised of <span>{allProjects.length} projects</span></div>
            <div>by <span>312,000 supporters</span></div>
            <FaChild className='icon' />
          </div>
        </div>
        <div className='projects-wrapper'>
          <div className="project-selection">
            <div className={isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(true)}>All</div>
            <div className={!isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(false)}>Projects ({currentProjects.length})</div>
          </div>
          <Pagination projects={isAllSelected ? allProjects : currentProjects} projectsPerPage={projectsPerPage} />
        </div>
      </div>

        
      
      <Outlet />
    </div>
  );
}

export default Fundraiser;