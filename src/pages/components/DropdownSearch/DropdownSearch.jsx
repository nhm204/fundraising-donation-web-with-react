import React, { useEffect, useMemo, useState } from 'react';
import { Router, useNavigate, useSearchParams } from 'react-router-dom';
import './DropdownSearch.scss';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineBackspace } from 'react-icons/hi';
import { projects } from '../Projects/projects';
import Project from '../Projects/ProjectCard/ProjectCard';


const DropdownSearch = ({ searchQuery, changeData, setIsSelected, link }) => {
  const [ inputValue, setInputValue ] = useState('');
  const [ searchParams, setSearchParams ] = useSearchParams();
  const navigate = useNavigate();


  const handleRecentSearch = () => {
    let history = JSON.parse(localStorage.getItem('history') || '[]'); // convert string to object
    history.unshift(inputValue?.toLowerCase());
    let sameSearchIndex = history?.indexOf(inputValue?.toLowerCase(), 1);
    if (sameSearchIndex !== -1) {
      history.splice(sameSearchIndex, 1);
    }
    localStorage.setItem('history', JSON.stringify(history.filter(el => el))); // convert object to string
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        localStorage.setItem('searchValue', e.target.value);

        handleRecentSearch();

        navigate({ pathname: '/discover', search: `?search=${e.target.value}`});
        setIsSelected(false);
      }
      setIsSelected(false);
    }
  }

  
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);
  

  const handleChange = (e) => {
    setInputValue(e.target.value);
    changeData(e.target.value, '', 1);
    setSearchParams({ search: e.target.value })
  };

  const handleClear = () => {
    const param = searchParams.get('search');

    if (param) {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
    localStorage.removeItem('searchValue');
    if (searchQuery) {
      changeData(null, '')
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
              <input type='text' placeholder='Search a project...' className='search-input' value={inputValue || ''} onKeyPress={handleSearch} onChange={handleChange} />
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
              <li key={index}>
                <button 
                  className='search-keyword'
                  onClick={() => {
                    // link !== 'Discover' ? navigate({ pathname: '/discover', search: `?search=${search}`}) : setSearchParams({search: search});
                    if (link !== 'Discover') {
                      
                    }
                    setSearchParams({search: search})
                    changeData(search);
                    setInputValue(search);
                    console.log(inputValue)
                    handleRecentSearch();
                    setIsSelected(false);
                    console.log('end')
                  }}
                >
                  {search?.toLowerCase()}
                </button>
              </li>
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