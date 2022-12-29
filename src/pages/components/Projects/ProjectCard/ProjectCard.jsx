import './ProjectCard.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../hooks/useGlobalState';
import { useState } from 'react';
import { users } from '../../../../constants/projects';


const Project = ({ project }) => {
  const [ userList, setUserList ] = useState(users);
  const [ username, setUsername ] = useGlobalState('username');
  const navigate = useNavigate();


  // useEffect(() => { 
  //   fetch(`${process.env.REACT_APP_BASE_URL}/api/users`)
  //     .then(res => res.json())
  //     .then((res) => {
  //       setUserList(res);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);


  const user = userList?.filter(user => user.name === username);

  const handleDonate = () => {
    if (project.currentPrice === project.targetPrice || project.creatorId === user[0].id) {
      navigate(`/discover/${project.name}/${project.id}`);
    } 
    else {
      navigate(`/discover/${project.name}/${project.id}/donate`);
    }
  }


  return (
    <div className='project-wrapper'>
      <Link to={`/discover/${project.name}/${project.id}`} className='project'>
        <img src={project.image} alt={project.name} />
        <div className='info'>
          <div className='description'>{project.isFeatured ? 'Featured' : project.category}</div>
          <h5 className='name'>{project.name.charAt(0).toUpperCase() + project.name.slice(1)}</h5>
          <div className='current-price'>Achieved ${project.currentPrice}</div>
          <div className='target-price'>Target of ${project.targetPrice}</div>
        </div>
      </Link>
      <button className={`${project.currentPrice === project.targetPrice ? 'donate-btn disable' : 'donate-btn'}`} onClick={handleDonate}>{project.currentPrice === project.targetPrice ? 'Funded' : 'Donate'}</button>
    </div>
  )
}

export default Project;