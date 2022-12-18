import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../common';
import { Banner1, Banner3, Banner4 } from './components/Banner/Banner';
import { Banner, FeaturedProjects } from './components/index.jsx';
import { projects } from './components/Projects/projects';


const Home = () => {
  const [ projectList, setProjectList ] = useState(projects);

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
      <Banner featuredList={featuredList} />
      { featuredList.length > 0 && <FeaturedProjects featuredList={featuredList} />}
      <Banner1 />
      <Banner3 />
      <Banner4 />
      <Footer />
    </div>
  );
}

export default Home;