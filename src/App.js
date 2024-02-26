import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ image: '', name: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing post
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = formData;
      setPosts(updatedPosts);
      setEditIndex(null);
    } else {
      setPosts([...posts, formData]);
    }
    setFormData({ image: '', name: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(posts[index]);
  };

  const handleDelete = (index) => {
    if (window.confirm('delete this post?')) {
      setPosts(posts.filter((_, i) => i !== index));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='App'>
      <h1>CRUD Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          value={formData.image}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'} Post</button>
      </form>
      <div className='Table'>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index}>
                <td>{post.image}</td>
                <td>{post.name}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='Pagination'>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {currentPage}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPosts.length < postsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
