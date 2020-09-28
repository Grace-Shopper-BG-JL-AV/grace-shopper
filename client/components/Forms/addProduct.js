import React from './node_modules/react'

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
        {/*
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
        /> */}

        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct
