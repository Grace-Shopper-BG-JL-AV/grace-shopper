import React from 'react'

const AddProduct = props => {
  return (
    <div>
      <h2>Admin Only: Add a Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
