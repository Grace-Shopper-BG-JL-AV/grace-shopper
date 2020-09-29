import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="page-wrapper">
      <div className="row2">
        <div className="column2">
          <h2>Welcome to Hallowoof! </h2>
          <img
            id="home-image"
            src="https://www.dhresource.com/0x0/f2/albu/g6/M01/E4/44/rBVaSFuaE02AZ_wNAAGNJrvv_zI981.jpg/winter-dog-halloween-costume-christmas-dog.jpg"
          />
          <h3>Our Mission</h3>
        </div>
        <p>
          Here at Hallowoof Costumes we strive to provide the funnest halloween
          costumes for your furry dog friend while also making a positive impact
          for these kind creatures by sending half the proceeds to local animal
          shelters. We have all costume tastes ranging from magical to downright
          spooky. Want to try out more of these costumes but don't have another
          special dog in your life? No worries! All our handsome dog models are
          also up for adoption at a pet adoption center near you. Contact us for
          more information.
        </p>
        <h3>
          <Link to="/products">Shop costumes</Link>
        </h3>
      </div>
    </div>
  )
}

export default Home
