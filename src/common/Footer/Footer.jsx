import React from 'react';
import './Footer.scss';
import { categories } from './../../constants/categories';
import { Link } from 'react-router-dom';
import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsMedium } from "react-icons/bs";


const Footer = () => {
  return (
    <div className='footer'>
      <div className="top">
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
      <div className="bottom">
        <div className="right">
          <button className="language-btn">
            <img src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" alt="" className='flag-img' />
            United States
            <span>.</span>
            English
          </button>
          <div className="content">
            <div className="copyright">
              © 2022 BetterWorld - WebDev Project
            </div>
            <ul>
              <li>Terms</li>
              <li>Privacy</li>
              <li>Legal</li>
              <li>Accessibility Statement</li>
            </ul>
          </div>
        </div>
        <div className="left">
          <div className="logo-container">
            <AiFillFacebook className='icon' />
            <AiFillYoutube className='icon' />
            <AiOutlineTwitter className='icon' />
            <AiOutlineInstagram className='icon' />
            <BsMedium className='icon' />
          </div>
          <div className="download">
            <img src="https://d25oniaj7o2jcw.cloudfront.net/img-play-store-v2.png" alt="" />
            <img src="https://d25oniaj7o2jcw.cloudfront.net/img-app-store-v2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;