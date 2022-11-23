import React, { useEffect } from 'react';
import { Header } from '../common';
import { Banner1 } from './components/Banner/Banner';
import { Banner, FeaturedProjects } from './components/index.jsx';
import { projects } from './components/Projects/projects';


const Home = () => {

  useEffect(() => { 
    document.title = `Home. BetterWorld: #1 for Donation and Fundraising Platform`;
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className='home'>
      <Header link={'Home'} />
      <Banner />
      <FeaturedProjects projects={projects} />
      <Banner1 />
    </div>
  );
}

export default Home;