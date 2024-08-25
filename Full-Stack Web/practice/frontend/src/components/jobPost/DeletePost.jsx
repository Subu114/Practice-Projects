import React, { useState } from 'react';
import axios from 'axios';

const DeletePost = () => {
    const [id, setId] = useState();
    const handleDelete = async () => {
        try {
            if(!id){
                alert("Id is not provided")
            }
            // Replace with your backend API endpoint for deleting job posts
            const response = await axios.delete(`http://localhost:5000/api/v1/jobposts/delete/${id}`);
            console.log(response.data); // Assuming your backend returns a success message
           
        } catch (error) {
            console.error('Error deleting job post:', error);
            // Handle error appropriately, e.g., show error message to the user
        }
    };

    return (
        <div>
            <input value = {id} onChange={(e) => setId(e.target.value)} required type='number'></input>
            <button onClick={handleDelete}>Delete Post</button>

        </div>
    );
};

export default DeletePost;
