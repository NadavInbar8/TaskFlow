import React from 'react';
import logo from '../assets/imgs/logo/logo.png';
import board from '../assets/imgs/board.png';
import hero from '../assets/imgs/homePageImg.jpg';

export const Homepage = () => {
  return (
    <div className='homepage'>
      <section className='hero'>
        <article className='hero-introduce'>
          <div className='hero-headline'>
            TaskFlow helps teams move
            <br />
            work forward.
          </div>

          <p className='hero-expand'>
            Collaborate, manage projects, and reach new
            <br />
            productivity peaks. From high rises to the home office,
            <br />
            the way your team works is unique—accomplish it all
            <br />
            with Marshmello.
          </p>
          <button>Try Demo Version</button>
        </article>

        <div className='hero-img'>
          <img src={hero} alt='' />
        </div>
      </section>

      <section className='website-preview'>
        <h1>It’s more than work. It’s a way of working together.</h1>
        <img className='logo-img-homepage' src={board} alt='logo' />
      </section>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {};
// }

// const mapDispatchToProps = {};

// export const Homepage = connect(mapStateToProps, mapDispatchToProps)(_Homepage);

{
  /* <div className='homepage-header flex'>
        <div>
          <img className='logo-img-homepage' src={logo} alt='logo' />
        </div>
        <div className='sign-options flex'>
          <div className='login-btn'>Log in</div>
          <div className='signup-btn'>Sign up</div>
        </div>
      </div> */
}
{
  /* <div className='homepage-hero'> */
}
{
  /* <img className='homepage-hero-pic' src={logo} alt='logo' /> */
}
{
  /* <div className='hero-text'>
          <h1>Trello helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Trello.
          </p>
          <div className='hero-signup-options flex'>
            <input
              className='hero-signup-input'
              type='text'
              placeholder='Email'
            />
            <div className='hero-signup-btn'>Sign up - it's free!</div>
          </div>
        </div> */
}
{
  /* </div> */
}
<div className='homepage-explain'>
  <div className='explain-details flex-column'>
    {/* <h1>It’s more than work. It’s a way of working together.</h1> */}
    {/* <p>
						Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows.
						Manage projects, organize tasks, and build team spirit—all in one place.
					</p> */}
    <button className='explain-details-btn'>Start doing → </button>
    <img src={board} alt='borad' />
  </div>
</div>;
