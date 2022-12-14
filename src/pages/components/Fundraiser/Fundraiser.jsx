import { useCallback, useEffect, useState } from 'react';
import './Fundraiser.scss';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../../../common/Header/Header';
import Pagination from '../Pagination/Pagination';
import { FaFacebook, FaTwitter, FaYoutube, FaAward, FaChild, FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import FundraiserEditModal from './FundraiserEditModal/FundraiserEditModal';
import { useGlobalState } from '../../../hooks/useGlobalState';
import ConfirmSignOutModal from './ConfirmSignOutModal/ConfirmSignOutModal';
import DonateHistory from './DonateHistory/DonateHistory';
import { projects, users, contributionModel } from '../Projects/projects';


const Fundraiser = () => {
  const [ projectList, setProjectList ] = useState(projects);
  const [ userList, setUserList ] = useState(users);
  const [ contributionList, setContributionList ] = useState(contributionModel);
  const [ projectsPerPage, setProjectsPerPage ] = useState(6);
  const [ isAvatarEdit, setIsAvatarEdit ] = useState(false);
  const [ avatarSrc, setAvatarSrc ] = useState();
  const [ isBackgroundEdit, setIsBackgroundEdit ] = useState(false);
  const [ backgroundSrc, setBackgroundSrc ] = useState();
  const [ isAllSelected, setIsAllSelected ] = useState(false);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isConfirmModalShow, setIsConfirmModalShow ] = useState(false);
  const [ username, setUsername ] = useGlobalState('username');
  const paramValue = useParams();
  const fundraiserId = paramValue.id;
  const fundraiserName = paramValue.name;
 
  
  // useEffect(() => { 
  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`)
  //     .then(res => res.json())
  //     .then((res) => {
  //       setProjectList(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
  //     .then(res => res.json())
  //     .then((res) => {
  //       setUserList(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/contribution`)
  //     .then(res => res.json())
  //     .then((res) => {
  //       setContributionList(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);


  const fundraiser = userList?.find(user => user.id === +fundraiserId);
  const contributions = contributionList?.filter(contribution => contribution.userId === +fundraiserId);
  const allProjects = projectList?.filter(project => project.creatorId === +fundraiserId);
  const currentProjects = allProjects?.filter(project => project.currentPrice < project.targetPrice);


  const totalDonatedAmount = contributions?.reduce((total, contribution) => contribution.amount + total, 0);
  let totalDonatedProjectId = contributions?.map(contribution => contribution.projectId);
  let totalDonatedProject = [...new Set(totalDonatedProjectId)]?.length;
  

  const totalRaisedAmount = allProjects?.reduce((total, project) => project.currentPrice + total, 0);
  const totalSuppoters = allProjects?.reduce((total, project) => project.donationCount + total, 0);
  console.log(totalDonatedProjectId);


  



  useEffect(() => { 
    if (!isEdit && !isAvatarEdit && !isBackgroundEdit) {
      document.title = `${fundraiser?.name} | BetterWorld`;
    }
    window.scrollTo(0, 0);
  }, [fundraiser?.name, isAvatarEdit, isBackgroundEdit, isEdit]);


  const handleChangeAvatar = useCallback((e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarSrc(reader.result);
      }
    }
    console.log('read')
    reader.readAsDataURL(e.target.files[0]);
    setIsAvatarEdit(true);
  }, [setAvatarSrc, setIsAvatarEdit]);


  const handleChangeBackground = useCallback((e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBackgroundSrc(reader.result);
      }
    }
    console.log('read')
    reader.readAsDataURL(e.target.files[0]);
    setIsBackgroundEdit(true);
  }, [setBackgroundSrc, setIsBackgroundEdit]);


  return (
    <div id={fundraiserId} className={`fundraiser-section ${(isEdit || isConfirmModalShow) && 'is-fundraiser-edit'}`}>
      <Header link={'Discover'} />
      <div className="heading-container">
        <div className="cover-bg-wrapper">
          <img src={fundraiser?.coverBackground} alt="" className="cover-bg" />
          { username === fundraiserName ? (
            <>
              <label htmlFor='background-file-chosen' className='edit-cover-bg-btn'>
                <FaCamera className='icon' />
                Edit cover image
              </label>
              <input type="file" accept='image/*' id='background-file-chosen' onChange={handleChangeBackground} hidden />
            </>
          ) : null }
        </div>
        <div className="info-container">
          <div className="avatar-wrapper">
            <img src={fundraiser?.avatar} alt="" className="avatar" />
            { username === fundraiserName ? (
              <>
                <label htmlFor='avatar-file-chosen' className="edit-ava-btn">
                  <FaCamera className='icon' />
                </label>
                <input type="file" accept='image/*' id='avatar-file-chosen' onChange={handleChangeAvatar} hidden />
              </>
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
            <div className='btn-container'>
              <button onClick={() => setIsEdit(true)} className="edit-profile-btn">
                <MdEdit className='icon' />
                Edit profile
              </button>
              <button onClick={() => setIsConfirmModalShow(true)} className="sign-out-btn">
                Sign out
              </button>
            </div>
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
            <h2>${totalDonatedAmount}</h2>
            <div>donated for <span>{totalDonatedProject} projects</span></div>
            <FaAward className='icon' />
          </div>
          <div className="support">
            <h2>${totalRaisedAmount}</h2>
            <div>raised of <span>{allProjects.length} projects</span></div>
            <div>by <span>{totalSuppoters} supporters</span></div>
            <FaChild className='icon' />
          </div>
        </div>
        { username === fundraiserName ? (
          <DonateHistory totalDonatedProjectId={totalDonatedProjectId} projects={projectList} contributions={contributions?.reverse()} />
        ) : null }
        <div className='projects-wrapper'>
          <div className="project-selection">
            <div className={isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(true)}>All</div>
            <div className={!isAllSelected ? 'selection active' : 'selection'} onClick={() => setIsAllSelected(false)}>Projects ({currentProjects.length})</div>
          </div>
          <Pagination projects={isAllSelected ? allProjects : currentProjects} projectsPerPage={projectsPerPage} />
        </div>
      </div>
      { (isEdit || isAvatarEdit || isBackgroundEdit) && (
        <>
          <div 
            onClick={() => {
              setIsEdit(false);
              setIsAvatarEdit(false);
              setIsBackgroundEdit(false);
            }} 
            className='profile-overlay' 
          /> 
          <FundraiserEditModal 
            fundraiser={fundraiser} 
            setIsEdit={setIsEdit} 
            isAvatarEdit={isAvatarEdit} 
            setIsAvatarEdit={setIsAvatarEdit} 
            avatarSrc={avatarSrc}
            handleChangeAvatar={handleChangeAvatar}
            isBackgroundEdit={isBackgroundEdit} 
            setIsBackgroundEdit={setIsBackgroundEdit} 
            backgroundSrc={backgroundSrc}
            handleChangeBackground={handleChangeBackground}
          /> 
        </>
      )}
      { isConfirmModalShow && (
        <>
          <div onClick={() => setIsConfirmModalShow(false)} className='profile-overlay' /> 
          <ConfirmSignOutModal setIsConfirmModalShow={setIsConfirmModalShow} />
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Fundraiser;