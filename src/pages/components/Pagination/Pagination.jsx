import React, { useState } from 'react';
import Project from '../Projects/ProjectCard/ProjectCard';
import './Pagination.scss';


const renderProjects = (projects) => {
  return (
    <ul className='project-list'>
      { projects.length !== 0 ? projects.map((project => (
        <li key={project.id}>
          <Project project={project} />   
        </li> 
      ))) : <h2 style={{ margin: '4vh auto'}}>There is no matching project.</h2>} 
    </ul>
  );
};

const Pagination = ({ projects, projectsPerPage }) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  // const [ projectsPerPage, setProjectsPerPage ] = useState(9);
  const [ pageNumberLimit, setPageNumberLimit ] = useState(5);
  const [ maxPageNumberLimit, setMaxPageNumberLimit ] = useState(5);
  const [ minPageNumberLimit, setMinPageNumberLimit ] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const renderPageNumbers = pages.map(page => (
    (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) ? <li key={page} id={page} className={currentPage === page ? 'active' : null} onClick={handleClick}>{page}</li> : null
  ));

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
  }
      
  return (
    <>
      {renderProjects(currentProjects)}
      <ul className='pagination'>
        <li>
          <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
        </li>
      </ul>
    </>
  );
}

export default Pagination;