import './ProjectCard.scss';
import { Link } from 'react-router-dom';
import { FaGreaterThan } from 'react-icons/fa';


const Project = ({ project }) => {


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
      {/* { project.stock !== 0 ? <button className='add' onClick={handleAdd}>Add to Bag</button> : <button className='add disable'>Out of Stock</button> } */}
      <Link to='/discover' className='more'>
        <h4>See all</h4>
        <FaGreaterThan className='icon' />
        <FaGreaterThan className='icon' />
      </Link>
    </div>
  )
}

export default Project;