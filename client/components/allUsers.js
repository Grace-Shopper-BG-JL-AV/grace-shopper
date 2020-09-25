import React from 'react'
import {fetchUsers} from '../store/allUsers'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//we will need to sort out permissions!!!!! haven't done that yet!!!

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
      <div>
        {usersArr.map(user => {
          return (
            // added link to single user view--do we need single user?? can admin add/delete single users?
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
