import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './DropdownSearch.scss';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineBackspace } from 'react-icons/hi';
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

        let history = JSON.parse(localStorage.getItem('history') || '[]'); // convert string to object
        history.unshift(inputValue?.toLowerCase());
        let sameSearchIndex = history?.indexOf(inputValue?.toLowerCase(), 1);
        if (sameSearchIndex !== -1) {
          history.splice(sameSearchIndex, 1);
        }
        localStorage.setItem('history', JSON.stringify(history)); // convert object to string

        navigate({ pathname: '/discover', search: `?search=${e.target.value}`});
        setIsSelected(false);
      }
      setIsSelected(false);
    }
  }

  
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);
  

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
  };


  let searchList = useMemo(() => {
    if (inputValue) {
      return projects?.filter(project => project.name.toLowerCase().includes(inputValue.toLocaleLowerCase()) || project.category.toLowerCase().includes(inputValue.toLocaleLowerCase())).slice(0, 3); 
    }
    return projects?.slice(0, 3);
  }, [inputValue]);


  let recentSearch = JSON.parse(localStorage.getItem('history'));

  
  return (
    <div className='dropdown-search'>
      <div className='searchbar-wrapper'>
        <div className='searchbar-container'>
          <div className='searchbar'>
              <BsSearch className='icon' />
              <input type='text' placeholder='Search a project...' className='search-input' value={inputValue || ''} onKeyPress={handleDirect} onChange={handleChange} />
              { inputValue?.length > 0 && <HiOutlineBackspace onClick={handleClear} className='erase-icon' />}
          </div>
          <div 
            className='cancel-btn' 
            onClick={() => {
              handleClear();
              setIsSelected(false);
            }}
          >
            Cancel
          </div>
        </div>
        <ul className='recent-search'>
          <h4>Recent search:</h4>
          { recentSearch?.slice(0, 8).map((search, index) => (
              <li key={index} className='search-keyword'>{search?.toLowerCase()}</li>
            ))
          }
        </ul>
        <ul className='search-projects'>
          { searchList.map(project => (
              <li key={project.id}>
                <Project project={project} />   
              </li> 
            ))
          }
        </ul>
      </div>
      <div className='search-overlay' onClick={() => setIsSelected(false)} />
    </div>
  );
}

export default DropdownSearch;