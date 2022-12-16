import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../common/Header/Header';
import './ProjectDetails.scss';
import { HiChevronDoubleRight } from "react-icons/hi";
import { Banner2 } from '../../Banner/Banner';
import { useGlobalState } from '../../../../hooks/useGlobalState';
import EditProjectModal from '../EditProjectModal/EditProjectModal';


const ProjectDetails = () => {
  const [ username, setUsername ] = useGlobalState('username');
  const [ projectList, setProjectList ] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ isProjectEditModal, setIsProjectEditModal ] = useState(false);
  const paramValue = useParams();
  const projectId = paramValue.id;
  const projectName = paramValue.name;
  const navigate = useNavigate();

  
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
  

  useEffect(() => { 
    document.title = `${project?.name} | ${project?.category} on BetterWorld`;
    window.scrollTo(0, 0); 
  }, [project?.name, project?.category]);


  const handleDonate = () => {
    if (project.currentPrice < project.targetPrice) 
      navigate(`/discover/${project.name}/${project.id}/donate`)
    return
  }

  const progressValue = (project?.currentPrice / project?.targetPrice) * 100;

  let relatedProjects = projectList?.reverse().filter(element => element.category === project?.category && element.id !== project.id).slice(0, 4);

  
  return (
    <div id={projectId} className={`project ${isProjectEditModal && 'is-project-edit'}`}>
      <Header link={'Discover'} />
      <div className="project-heading">
        <div className="overview">
          <div className="category">{project?.category}</div>
          <div className="id">Project #{projectId}</div>
        </div>
        <h1 className='name'>{projectName.charAt(0).toUpperCase() + projectName.slice(1)}</h1>
        <div className="fundraiser">by <Link to={`/fundraiser/${fundraiser?.name}/${fundraiser?.id}`}>{fundraiser?.name}</Link></div>
      </div>
      <div className='project-container'>
        <div className='content'>
          <img src={project?.image} alt={project?.name} />
          <h3>The Story Behind</h3>
          <div className='desc'>{project?.description}</div>
          <div className="fundraising-by">
            <Link to={`/fundraiser/${fundraiser?.name}/${fundraiser?.id}`} className="user">
              <img src={fundraiser?.avatar} alt='' />
              <h4>{fundraiser?.name}</h4>
            </Link>
            <div className='bio'>{fundraiser?.description}</div>
          </div>
        </div>
        <div className="sidebar">
          <div className="amount">
            <div>
              <span className='current-price'>${project?.currentPrice}</span>
              <span className='target-price'> raised of ${project?.targetPrice} goal</span>
            </div>
            <progress max={100} value={progressValue} />
            <div className="count">
              <div className="donations"><b>{project?.donationCount}</b> donations</div>
              <div className="to-go"><b>${+project?.targetPrice - project?.currentPrice}</b> to go</div>
            </div>
            { username !== fundraiser?.name ? (
              <button 
                className={`${project?.currentPrice === +project?.targetPrice ? 'donate-btn disable' : 'donate-btn'}`} 
                onClick={handleDonate}
              >
                {project?.currentPrice === project?.targetPrice ? 'Funded' : 'Donate'}
              </button>
            ) : (
              <button 
                className='donate-btn' 
                onClick={() => setIsProjectEditModal(true)}
              >
                Edit project
              </button>
            )}
          </div>
          { relatedProjects?.length !== 0 && <div className="related">
            <h3>Related Projects</h3>
            <ul>
              { relatedProjects?.map(project => (
                <Link to={`/discover/${project.name}/${project.id}`} key={project.id} className="related-project">
                  <img src={project.image} alt={project.name} />
                  <div className="info">
                    <div className="name">{project.name}</div>
                    <div>
                      <span className='current-price'>${project.currentPrice}</span>
                      <span className='target-price'> raised of ${project.targetPrice} goal</span>
                    </div>
                  </div>
                </Link>
              ))}
            </ul>
            <Link to='/discover' className='more'>
              Discover
              <HiChevronDoubleRight className='icon' />
            </Link>
          </div>
          }
        </div>
      </div>
      { isProjectEditModal ? (
        <>
          <div className='modal-overlay' onClick={() => setIsProjectEditModal(false)} /> 
          <EditProjectModal project={project} setIsProjectEditModal={setIsProjectEditModal} user={fundraiser} />
        </>
      ) : null }
      <Banner2 />
      <Outlet />
    </div>
  );
}

export default ProjectDetails;