import React, { useEffect, useState } from 'react';
import { Header } from '../common';
import { Banner1 } from './components/Banner/Banner';
import { Banner, FeaturedProjects } from './components/index.jsx';


const Home = () => {
  const [ projectList, setProjectList ] = useState([]);

  let featuredList = projectList?.filter(project => project.isFeatured === true && project.currentPrice < project.targetPrice);


  useEffect(() => { 
    document.title = `Home. BetterWorld: #1 for Donation and Fundraising Platform`;
    window.scrollTo(0, 0); 

    fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`)
      .then(res => res.json())
      .then((res) => {
        setProjectList(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  return (
    <div className='home'>
      <Header link={'Home'} />
      <Banner projects={projectList} />
      { featuredList.length > 0 && <FeaturedProjects featuredList={featuredList} />}
      <Banner1 />
    </div>
  );
}

export default Home;