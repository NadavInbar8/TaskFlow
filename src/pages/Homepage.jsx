import React from 'react';
import logo from '../assets/imgs/icon.png';

export const Homepage = () => {
  return (
    <div>
      <div className='homepage-header flex'>
        <img src={logo} alt='logo' />
        <h1>TaskFlow</h1>
      </div>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {};
// }

// const mapDispatchToProps = {};

// export const Homepage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);
