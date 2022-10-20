import React, { useState } from 'react';
import './Banner.scss';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';


const MainBanner = () => {
  return (
    <div className='main-banner' />
  );
}

export default MainBanner;


export const Banner1 = () => {
  const [ muted, setMuted ] = useState(true);


  return (
    <div className='banner1'>
      <div className="heading">
        <h4>What we are aiming for</h4>
        <h1>Donate on GoFundMe takes just a few minutes</h1>
      </div>
      <video src={require ("../../../assets/video/introduction-video.mp4")} autoPlay={true} loop={true} playsInline="" tabIndex="-1" muted={muted} />
      <button className='volume-btn' onClick={() => setMuted(!muted)}>
        { muted ? <HiVolumeOff className='icon' /> : <HiVolumeUp className='icon' /> }
      </button>
    </div>
  );
}

