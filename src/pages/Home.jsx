import React, { useEffect } from 'react';
import Header from '../common/Header/Header';
import { Banner1 } from './components/Banner/Banner';
import { Banner, FeaturedProjects } from './components/index.jsx';
import { projects } from './components/Projects/projects';


const Home = () => {

  useEffect(() => { document.title = `Home. BetterWorld: #1 for Donation and Fundraising Platform` }, []);

  return (
    <div className='home'>
      <Header link={'Home'} />
      <Banner />
      <FeaturedProjects projects={projects} />
      <Banner1 />
    </div>
  )
}

export default Home