import { Button } from 'antd';
import React from 'react';

const Header = () => {
  return (
    <div>
      <div>
        <img src="https://napa-website.s3.ap-southeast-1.amazonaws.com/white-logo2.svg" alt="main icon" />
        <span></span>
      </div>
      <div>
        <ul>
          <li>NAPA Society</li>
          <li>Social Art</li>
          <li>NFT Marketplace</li>
          <li>NAPA Earn</li> {/* //only accessible post login */}
        </ul>
      </div>
      <div>
        {/* <img/> */}
        {/* <Button>Log In</Button> */}
        <Button> Connect Wallet</Button>
      </div>
    </div>
  );
};

export default Header;
