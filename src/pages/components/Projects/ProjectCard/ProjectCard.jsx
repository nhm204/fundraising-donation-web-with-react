import './ProjectCard.scss';
import { Link, useNavigate } from 'react-router-dom';


const Project = ({ project }) => {
  const navigate = useNavigate();

  const handleDonate = () => {
    if (project.currentPrice === project.targetPrice) {
      navigate(`/discover/${project.name}/${project.id}`)
    } 
    else {
      navigate(`/donate/${project.name}/${project.id}`)
    }
  }

  return (
    <div className='project-wrapper'>
      <Link to={`/discover/${project.name}/${project.id}`} className='project'>
        <img src={project.image} alt={project.name} />
        <div className='info'>
          <div className='description'>{project.isFeatured ? 'Featured' : project.category}</div>
          <h5 className='name'>{project.name}</h5>
          <div className='current-price'>Achieved ${project.currentPrice}</div>
          <div className='target-price'>Target of ${project.targetPrice}</div>
        </div>
      </Link>
      <button className={`${project.currentPrice === project.targetPrice ? 'donate-btn disable' : 'donate-btn'}`} onClick={handleDonate}>Donate</button>
    </div>
  )
}

export default Project;