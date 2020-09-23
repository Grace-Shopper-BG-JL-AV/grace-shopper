import React from 'react'

//*****i haven't attached this to a main component yet due to permissions, but i set it up so it will be very easy to manage the state on that main component. just would need to write a handlechange/handlesubmit function and add each category to the local state, and connect to the redux store--REDUX is already written in the product.js file :) */

const AddProduct = props => {
  return (
    <div>
      <h2>Admin Only: Add a Product</h2>
      <form>
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

        <label htmlFor="price">Price:</label>
        <input
          name="price"
          type="text"
          value={props.price}
          onChange={props.handleChange}
        />

        <label htmlFor="imageUrl">Image Url:</label>
        <input
          name="imageUrl"
          type="text"
          value={props.imageUrl}
          onChange={props.handleChange}
        />

        <label htmlFor="size">Size:</label>
        <input
          name="size"
          type="text"
          value={props.size}
          onChange={props.handleChange}
        />

        <label htmlFor="stars">Stars:</label>
        <input
          name="stars"
          type="text"
          value={props.stars}
          onChange={props.handleChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
