import { Button } from 'antd';
import React from 'react';

const Header = () => {
  return (
    <div>
      <div>
        <img src="" alt="main icon" />
        <span>NAPA </span>
      </div>
      <div>
        <ul>
          <li>NAPA Society</li>
          <li>Social Art</li>
          <li>NFT Marketplace</li>
          <li>NAPA Earn</li>
        </ul>
      </div>
      <div>
        {/* <img/> */}
        <Button>Log In</Button>
        <Button> Connect Wallet</Button>
      </div>
    </div>
  );
};

export default Header;
