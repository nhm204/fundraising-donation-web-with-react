import React, { useEffect } from 'react';
import Header from '../common/Header/Header';
import { Banner1 } from './components/Banner/Banner';
import { Banner, FeaturedProjects } from './components/index.jsx';


const Home = () => {

  useEffect(() => { document.title = `Home. BetterWorld: #1 for Donation and Fundraising Platform` }, []);

  return (
    <div className='home'>
      <Header link={'Home'} />
      <Banner />
      <FeaturedProjects />
      <Banner1 />
    </div>
  )
}

export default Home