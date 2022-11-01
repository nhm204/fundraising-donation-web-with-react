import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './DropdownSearch.scss';
import { BsSearch } from "react-icons/bs";
import { HiOutlineBackspace } from "react-icons/hi";
import { projects } from '../Projects/projects';
import Project from '../Projects/ProjectCard/ProjectCard';


const DropdownSearch = ({ setSearchQuery, searchValue, setSelectedCategory, setCurrentPage, setIsSelected, link }) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ searchParams, setSearchParams ] = useSearchParams();
  const navigate = useNavigate();


  const handleDirect = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        localStorage.setItem('searchValue', e.target.value);
        navigate({ pathname: '/discover', search: `?search=${e.target.value}`});
        setIsSelected(false);
      }
      setIsSelected(false);
    }
  }

  useEffect(() => setInputValue(searchValue), [searchValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
    setSearchParams({ search: e.target.value })
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const handleClear = () => {
    const param = searchParams.get('search');

    if (param) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    localStorage.removeItem('searchValue');
    if (searchValue) {
      setSearchQuery();
      setSelectedCategory('');
    }
    setInputValue('');
    setIsSelected(false);
  };


  const handleCancel = () => {
    setInputValue('');
    setIsSelected(false);
    console.log('handleCancel')
  };

  let searchList = useMemo(() => {
    if (inputValue) {
      return projects?.filter(project => project.name.toLowerCase().includes(inputValue) || project.category.toLowerCase().includes(inputValue)).slice(0, 3); 
    }
    return projects?.slice(0, 3);
  }, [inputValue]);
console.log(link)

  return (
    <div className='dropdown-search'>
      <div className='searchbar-wrapper'>
        <div className="searchbar-container">
          <div className="searchbar">
              <BsSearch className='icon' />
              <input type='text' placeholder='Search a project...' className='search-input' value={inputValue || ''} onKeyPress={handleDirect} onChange={handleChange} />
              { inputValue?.length > 0 && <HiOutlineBackspace onClick={handleClear} className='erase-icon' />}
          </div>
          <div className='cancel-btn' onClick={() => {link !== 'Discover' ? handleCancel() : handleClear()}}>Cancel</div>
        </div>
        <ul className='search-projects'>
          { searchList.map(project => (
              <li key={project.id}>
                <Project project={project} />   
              </li> 
            ))
          }
        </ul>
      </div>
      <div className="search-overlay" onClick={() => setIsSelected(false)} />
    </div>
  );
}

export default DropdownSearch;