import React from './node_modules/react'

//need to connect to the singleProduct and add permissions aspect. handlechange, handleupdate, and attach name and description to the local state. need to connect to the redux store**

const EditProduct = props => {
  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={props.name}
          onChange={props.handleChange}
        />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          type="text"
          value={props.description}
          onChange={props.handleChange}
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  )
}

export default EditProduct
