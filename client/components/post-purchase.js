import React from 'react'
import {Link} from 'react-router-dom'

class PostPurchase extends React.Component {
  render() {
    return (
      <div>
        <h1>Thank you for your purchase!</h1>
        <p>You helped a doggie find their new home today.</p>

        <h3>
          <Link to="/products">Shop again</Link>
        </h3>
      </div>
    )
  }
}

export default PostPurchase
