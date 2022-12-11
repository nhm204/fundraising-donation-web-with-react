import { useEffect, useState } from 'react';
import './Fundraiser.scss';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../../../common/Header/Header';
import Pagination from '../Pagination/Pagination';
import { FaFacebook, FaTwitter, FaYoutube, FaAward, FaChild, FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import FundraiserEditForm from './FundraiserEditForm/FundraiserEditForm';
import { useGlobalState } from '../../../hooks/useGlobalState';
import { users } from '../Projects/projects';


const Fundraiser = () => {
  const [ projectList, setProjectList ] = useState([]);
  const [ userList, setUserList ] = useState([]);
  const [ projectsPerPage, setProjectsPerPage ] = useState(6);
  const [ isAllSelected, setIsAllSelected ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ username, setUsername ] = useGlobalState('username');
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;
 
  
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


  const fundraiser = users?.find(user => user.id === +fundraiserId);
  const allProjects = projectList?.filter(project => project.creatorId === +fundraiserId);
  const currentProjects = allProjects?.filter(project => project.currentPrice < project.targetPrice);


  useEffect(() => { 
    document.title = `${fundraiser?.name} | BetterWorld`;
    window.scrollTo(0, 0);
  }, [fundraiser?.name]);

  console.log(username);


  return (
    <div id={fundraiserId} className={`fundraiser-section ${isEdit && 'is-fundraiser-edit'}`}>
      <Header link={'Discover'} />
      <div className="heading-container">
        <div className="cover-bg-wrapper">
          <img src={fundraiser?.coverBackground} alt="" className="cover-bg" />
          { username === fundraiserName ? (
            <button onClick={() => setIsEdit(true)} className='edit-cover-bg-btn'>
              <FaCamera className='icon' />
              Edit cover image
            </button>
          ) : null }
        </div>
        <div className="info-container">
          <div className="avatar-wrapper">
            <img src={fundraiser?.avatar} alt="" className="avatar" />
            { username === fundraiserName ? (
              <button onClick={() => setIsEdit(true)} className="edit-ava-btn">
                <FaCamera className='icon' />
              </button>
            ) : null }
          </div>
          <div className="info">
            <div>
            <h1>{fundraiserName}</h1>
              <div className="id">Fundraiser #{fundraiserId}</div>
            </div>
              <i className="bio">{fundraiser?.description}</i>
          </div>
          { username === fundraiserName ? (
            <button onClick={() => setIsEdit(true)} className="edit-profile-btn">
              <MdEdit className='icon' />
              Edit profile
            </button>
          ) : null }
        </div>
      </div>
      <div className="body-container">
        <div className="overview">
          <div className="contact">
            <h3>Contact</h3>
            <div>Phone: <a href={`tel:${fundraiser?.phone}`}>{fundraiser?.phone}</a></div>
            <div>Email: <a href={`mailto:${fundraiser?.email}`}>{fundraiser?.email}</a></div>
            <div className="social">
              { fundraiser?.facebook && <a href={fundraiser?.facebook}><FaFacebook className='icon' /></a> }
              { fundraiser?.twitter && <a href={fundraiser?.twitter}><FaTwitter className='icon' /></a> }
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
      { isEdit && <div onClick={() => setIsEdit(false)} className='edit-overlay' /> }
      { isEdit && <FundraiserEditForm fundraiser={fundraiser} setIsEdit={setIsEdit} /> }
      <Outlet />
    </div>
  );
}

export default Fundraiser;