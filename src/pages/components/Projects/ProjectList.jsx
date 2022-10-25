import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../../common/Header/Header';
import { projects } from './projects';
import { Outlet } from 'react-router-dom';
import './ProjectList.scss';
import Pagination from '../Pagination/Pagination';
import { BsSliders } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";



const Projects = () => {
  const [ searchQuery, setSearchQuery ] = useState(() => localStorage.getItem('searchValue'));
  const [ selectedCategory, setSelectedCategory ] = useState('');
  const [ selectedPrice, setSelectedPrice ] = useState(0);
  const [ sortProject, setSortProject ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);

  
  useEffect(() => { document.title = `Discover. BetterWorld: #1 for Donation and Fundraising Platform` }, []);

  const projectList = projects?.map((project) => project);
  let filteredList = projectList?.reverse();
  let featuredList = filteredList?.filter(project => project.isFeatured === true);


  filteredList = filteredList?.filter(project => !featuredList.includes(project));
  filteredList = featuredList?.concat(filteredList);


  filteredList = useMemo(() => {
    if (searchQuery) {
      return projectList?.filter(project => project.name.toLowerCase().includes(searchQuery)); 
    }
    return filteredList;
  }, [searchQuery, projectList, filteredList]);


  filteredList = useMemo(() => {
    if (selectedCategory) {
      return filteredList?.filter(project => project.categories.find(project => project === selectedCategory)); 
    }
    return filteredList;
  }, [selectedCategory, filteredList]);
  // console.log(selectedCategory)
  // console.log(filteredList)


  filteredList = useMemo(() => {
    if (selectedPrice !== 0) {
      return filteredList?.filter(project => project.targetPrice >= parseInt(selectedPrice, 10));
    }
    return filteredList;
  }, [selectedPrice, filteredList]);


  featuredList = filteredList?.filter(project => project.isFeatured === true);
  filteredList = filteredList?.filter(project => !featuredList.includes(project));
console.log(filteredList);

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

  console.log(filteredList)
  
  filteredList = featuredList?.concat(filteredList);


 
  return (
    <div className='discover'>
      <Header setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} searchValue={searchQuery} link={'Discover'} setCurrentPage={setCurrentPage} />
      <div className='filter-projects'>
        <label htmlFor='mobile-filter' className='mobile-filter-btn'>
          <span>Filter</span>
          <BsSliders />
        </label>
        <input type='checkbox' id='mobile-filter' hidden className='mobile-filter-checkbox-input' />
        <div className='filter'>
          <label htmlFor='mobile-filter' className='close-btn'>
            <div>Filter</div>
            <IoCloseOutline />       
          </label>
          <div className={selectedCategory === '' ? 'all active' : 'all'} onClick={() => setSelectedCategory('')}>All Projects</div>
          <span>Purpose</span>
          <div className='selection'>
            <div className={selectedCategory === 'Education' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Education')}>Education</div>
            <div className={selectedCategory === 'Poverty' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Poverty')}>Poverty</div>
            <div className={selectedCategory === 'Food Banks' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Food Banks')}>Food Banks</div>
            <div className={selectedCategory === 'Older People' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Older People')}>Older People</div>
            <div className={selectedCategory === 'Homelessness' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Homelessness')}>Homelessness</div>
            <div className={selectedCategory === 'Disability' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Disability')}>Disability</div>
            <div className={selectedCategory === 'Health and Medical' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Health and Medical')}>Health &amp; Medical</div>
            <div className={selectedCategory === 'Animals & Pets' ? 'option active' : 'option'} onClick={() => setSelectedCategory('Animals & Pets')}>Animals &amp; Pets</div>
          </div>

          <span className='price'>Price: <span style={{ color: "var(--primary-color)" }}>${selectedPrice}</span></span>
          <div className='price-container'>
            <input type="range" min='0' max='10000' className='slider' onChange={e => setSelectedPrice(e.target.value)} />
          </div>

          <div className='sort-project'>
            <span className='sort'>Sort by price</span>
            <div className={sortProject === 'ASC' ? 'option active' : 'option'} onClick={() => setSortProject('ASC')}>Low to High</div>
            <div className={sortProject === 'DESC' ? 'option active' : 'option'} onClick={() => setSortProject('DESC')}>High to Low</div>

            <span className='sort'>Sort by name</span>
            <div className={sortProject === 'A-Z' ? 'option active' : 'option'} onClick={() => setSortProject('A-Z')}>From A to Z</div>
            <div className={sortProject === 'Z-A' ? 'option active' : 'option'} onClick={() => setSortProject('Z-A')}>From Z to A</div>
            <div className='option default' onClick={() => setSortProject()}>Reset</div>
          </div>
        </div>
        <div className='projects-wrapper'>
          <Pagination projects={filteredList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Projects;