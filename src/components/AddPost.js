import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import serializeForm from 'form-serialize'

class AddPost extends Component{

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    this.props.onCreatePost(values)
  }

  render(){
  const {categories} = this.props

  return(
  	<div>
  	  <p> Add New Post </p>
  	  <form onSubmit={this.handleSubmit}>
  	    <p> Title <br></br>
  	      <input type="text" name="title" placeholder="Post Title" required/>
  	    </p>
        <p> Author <br></br>
          <input type="text" name="author" placeholder="Post Author" required/>
        </p>
        <p> 
          <textarea name="body" rows="10" cols="50" placeholder="Post Contents" required/>
        </p>
        <p> Category &nbsp;
          <select name="category" defaultValue="" required>
            <option value="">Select Category</option>
            {categories.map((category, i) => 
              <option key={i} value={category.name}>{category.name}</option>
            )}
          </select>
        </p>
        <button>Add Post</button>
      </form>
  	</div>
  )
  }
}

function mapStateToProps({categories}){
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(AddPost))
