import React from 'react'
import {fetchUsers} from '../store/allUsers'
import {connect} from 'react-redux'

class AllUsers extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    //dispatch the redux thunk
    this.props.getUsers()
  }

  render() {
    //store products in usersArr
    const usersArr = this.props.users

    //is admin? display below. otherwise display "not found"
    return (
      <div className="allUsers">
        {usersArr.map(user => {
          return (
            // do we need single user??
            <div key={user.id}>
              <p>{user.email}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
