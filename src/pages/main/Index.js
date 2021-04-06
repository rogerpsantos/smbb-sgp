import React from 'react';
import Menu from '../../components/header/index';
import Home from './Home';
import '../../App.css';

const Main = () => {
  return (
      <div>
        <Menu>
          <div>
            <Home/>
          </div>
        </Menu>
      </div>
  );
};



export default Main;