import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../common/Header/Header';
import { projects, users } from '../projects';
import './ProjectDetails.scss';


const ProjectDetails = () => {
  const paramValue = useParams();
  const projectId = paramValue.id;
  const projectName = paramValue.name;
  const navigate = useNavigate();

  const project = projects.find(element => element.id === paramValue.id);
  const fundraiser = users.find(user => user.id === project.creatorId);
  

  useEffect(() => { 
    document.title = `${project?.name}. ${project?.category} on BetterWorld`;
    window.scrollTo(0, 0); 
  }, [project?.name, project?.category]);


  const handleDonate = () => {
    if (project.currentPrice < project.targetPrice) 
      navigate(`/donate/${project.name}/${project.id}`)
    return
  }

  const progressValue = (project.currentPrice / project.targetPrice) * 100;

  
  return (
    <div id={projectId} className='project'>
      <Header link={'Discover'} />
      <div className="project-heading">
        <div className="overview">
          <div className="category">{project.category}</div>
          <div className="id">Project #{projectId}</div>
        </div>
        <h1 className='name'>{projectName}</h1>
        <div className="fundraiser">by <Link to={`/donate/${fundraiser.name}/${fundraiser.id}`}>{fundraiser.name}</Link></div>
      </div>
      <div className='project-container'>
        <div className='content'>
          <img src={project.image} alt={project.name} />
          <h3>The Story Behind</h3>
          <div className='desc'>{project.description}</div>
          <div className="fundraising-by">
            <img src={fundraiser.avatar} alt={fundraiser.name} />
            <h4>{fundraiser.name}</h4>
            <div className='bio'>{fundraiser.bio}</div>
          </div>
        </div>
        <div className="amount">
          <div>
            <span className='current-price'>${project.currentPrice}</span>
            <span className='target-price'> raised of ${project.targetPrice} goal</span>
          </div>
          <progress max={100} value={progressValue} />
          <div className="count">
            <div className="donations"><b>{project.donations}</b> donations</div>
            <div className="to-go"><b>${project.targetPrice - project.currentPrice}</b> to go</div>
          </div>
          <button className={`${project.currentPrice === project.targetPrice ? 'donate-btn disable' : 'donate-btn'}`} onClick={handleDonate}>Donate</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;