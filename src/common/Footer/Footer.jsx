import React from 'react';
import './Footer.scss';
import { categories } from './../../constants/categories';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='footer'>
      <ul className='logo'>
        <Link to='/'>BetterWorld</Link>
      </ul>
      <ul>
        <li className='title'>Fundraise for</li>
        { categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
      <ul>
        <li className='title'>Learn more</li>
        <li>How BetterWorld works</li>
        <li>Why BetterWorld</li>
        <li>Common questions</li>
        <li>Success stories</li>
        <li>Supported countries</li>
        <li>Charity fundraising</li>
        <li>Pricing</li>
      </ul>
      <ul>
        <li className='title'>Resources</li>
        <li>Help center</li>
        <li>Blog</li>
        <li>BetterWorld stories</li>
        <li>Press center</li>
        <li>Careers</li>
        <li>About</li>
        <li>More resources</li>
      </ul>
    </div>
  );
}

export default Footer;