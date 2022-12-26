import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './ProjectList.scss';
import { BsSliders } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Pagination from '../Pagination/Pagination';
import { Footer, Header } from '../../../common';
import { categories } from '../../../constants/categories';
import { projects } from '../../../constants/projects';
import { HiOutlineAdjustments } from 'react-icons/hi';


const Projects = () => {
  const [ projectList, setProjectList ] = useState(projects);
  const [ searchQuery, setSearchQuery ] = useState(() => localStorage.getItem('searchValue'));
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ selectedPrice, setSelectedPrice ] = useState(0);
  const [ sortProject, setSortProject ] = useState();
  const [ projectsPerPage, setProjectsPerPage ] = useState(6);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ isShowFilter, setIsShowFilter ] = useState(false);

  
  useEffect(() => { 
    document.title = `Discover. BetterWorld: #1 for Donation and Fundraising Platform`;
    window.scrollTo(0, 0); 

    // fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`)
    //   .then(res => res.json())
    //   .then((res) => {
    //     setProjectList(res);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  }, []);

  // console.log(process.env.REACT_APP_BASE_URL)

  
  let filteredList = useMemo(() => {
    if (sortProject === 'Newest' && selectedCategory === 'Newest') {
      return [...projectList]?.reverse();
    }
    return [...projectList];
  }, [selectedCategory, sortProject, projectList]);
  
  
  let featuredList = filteredList?.filter(project => project.isFeatured === true);


  filteredList = filteredList?.filter(project => !featuredList.includes(project));
  filteredList = featuredList?.concat(filteredList);


  filteredList = useMemo(() => {
    if (searchQuery) {
      return projectList?.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()) || project.category.toLowerCase().includes(searchQuery.toLowerCase())); 
    }
    return filteredList;
  }, [searchQuery, projectList, filteredList]);


  filteredList = useMemo(() => {
    if (selectedCategory && selectedCategory !== 'Featured' && selectedCategory !== 'Newest') {
      return filteredList?.filter(project => project.category === selectedCategory); 
    }
    return filteredList;
  }, [selectedCategory, filteredList]);


  filteredList = useMemo(() => {
    if (selectedPrice !== 0) {
      return filteredList?.filter(project => project.targetPrice >= parseInt(selectedPrice, 10));
    }
    return filteredList;
  }, [selectedPrice, filteredList]);


  featuredList = filteredList?.filter(project => project.isFeatured === true);
  filteredList = filteredList?.filter(project => !featuredList.includes(project));


  filteredList = useMemo(() => {
    if (sortProject === 'ASC') {
      return filteredList.sort((a, b) => a.targetPrice - b.targetPrice);
    }
    if (sortProject === 'DESC') {
      return filteredList.sort((a, b) => b.targetPrice - a.targetPrice);
    }
    if (sortProject === 'A-Z') {
      return filteredList.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    if (sortProject === 'Z-A') {
      return filteredList.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    return filteredList;
  }, [sortProject, filteredList]);


  featuredList = useMemo(() => {
    if (sortProject === 'ASC') {
      return featuredList.sort((a, b) => a.targetPrice - b.targetPrice);
    }
    if (sortProject === 'DESC') {
      return featuredList.sort((a, b) => b.targetPrice - a.targetPrice);
    }
    if (sortProject === 'A-Z') {
      return featuredList.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    if (sortProject === 'Z-A') {
      return featuredList.sort((a, b) => a.name > b.name ? -1 : 1);
    }
    return featuredList;
  }, [sortProject, featuredList]);

  if (selectedCategory === 'Featured') {
    filteredList = featuredList?.reverse();
  } else {
    filteredList = featuredList?.concat(filteredList);
  }


  const changeData = (childSearchQuery, childSeletedCategory, childCurrentPage) => {
    setSearchQuery(childSearchQuery);
    setSelectedCategory(childSeletedCategory);
    setCurrentPage(childCurrentPage);
  }


  return (
    <div className='discover'>
      <Header searchQuery={searchQuery} link={'Discover'} changeData={changeData} />
      <div className='filter-projects'>
        <button className='filter-btn' onClick={() => setIsShowFilter(true)}>
          Filter
          <HiOutlineAdjustments className='icon' />
        </button>
        <div className={`filter ${isShowFilter && 'filter--show'}`}>
          <div className='close-btn' onClick={() => setIsShowFilter(false)}>
            <div className='heading'>Filter</div>
            <IoCloseOutline className='icon' />       
          </div>
          <div 
            className={selectedCategory === '' ? 'all active' : 'all'} 
            onClick={() => {
              setSelectedCategory('');
              setSortProject('');
              setIsShowFilter(false);
            }}
          >
            All
          </div>
          <div 
            className={selectedCategory === 'Featured' ? 'option active' : 'option'} 
            onClick={() => {
              setSelectedCategory('Featured');
              setSortProject('Featured');
              setIsShowFilter(false);
            }}
          >
            Featured
          </div>
          <div 
            className={sortProject === 'Newest' ? 'option active' : 'option'} 
            onClick={() => {
              setSortProject('Newest');
              setSelectedCategory('Newest');
              setIsShowFilter(false);
            }}
          >
              Newest
          </div>
          <span className='title'>Purpose</span>
          <div className='selection'>
            { categories.map((category, index) => (
              <div 
                key={index} 
                className={selectedCategory === category ? 'option active' : 'option'} 
                onClick={() => {
                  setSelectedCategory(category);
                  setIsShowFilter(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
          <span className='price'>Price: <span style={{ color: "var(--primary-color)" }}>${selectedPrice}</span></span>
          <div className='price-container'>
            <input 
              type="range" 
              min='0' 
              max='10000' 
              className='slider' 
              onChange={e => setSelectedPrice(e.target.value)}
            />
          </div>
          <div className='sort-project'>
            <span className='sort'>Sort by</span>
            <div 
              className={sortProject === 'ASC' ? 'option active' : 'option'} 
              onClick={() => {
                setSortProject('ASC');
                setIsShowFilter(false);
              }}
            >
              Price: Low - High
            </div>
            <div 
              className={sortProject === 'DESC' ? 'option active' : 'option'} 
              onClick={() => {
                setSortProject('DESC');
                setIsShowFilter(false);
              }}
            >
              Price: High - Low
            </div>
            <div 
              className={sortProject === 'A-Z' ? 'option active' : 'option'} 
              onClick={() => {
                setSortProject('A-Z');
                setIsShowFilter(false);
              }}
            >
              Name: A to Z
            </div>
            <div 
              className={sortProject === 'Z-A' ? 'option active' : 'option'} 
              onClick={() => {
                setSortProject('Z-A');
                setIsShowFilter(false);
              }}
            >
              Name: Z to A
            </div>
            <div 
              className='option default' 
              onClick={() => {
                setSortProject();
                setSelectedCategory('');
                setIsShowFilter(false);
              }}
            >
              Reset
            </div>
          </div>
        </div>
        <div className='projects-wrapper'>
          <Pagination projects={filteredList} projectsPerPage={projectsPerPage} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Projects;