import React from 'react';
import Project from '../ProjectCard/ProjectCard';
import './FeaturedProjects.scss';
import { HiChevronDoubleRight } from "react-icons/hi";
import { Link } from 'react-router-dom';


const FeaturedProjects = ({ featuredList }) => {
  return (
    <section className='featured'>
      <div className="heading">
        <h4>Where you can help</h4>
        <div className='see-all'>
          <h1>Featured projects</h1>
          <Link to='/discover' className='more'>
            See all
            <HiChevronDoubleRight className='icon' />
          </Link> 
        </div>
      </div>
      <ul className='featured-projects'>
        { featuredList?.slice(0, 4).map(project => (
          <li key={project.id}>
            <Project project={project} />   
          </li> 
        ))}
      </ul>
    </section>
  );
}

export default FeaturedProjects;