import React from 'react'
import { useState } from 'react';

import useFetchUsers from '../../server/user/useFetchUsers';


const UserFetch = () => {
    const [search, setSearch] = useState('');

    const { error, loading, data } =  useFetchUsers("/api/v1/users?search=", search);
    
    return (
      <>
        <h1>Hello there</h1>
        <input
          type='text'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          placeholder='Search by name'
        />
       
        <h2>Users: {data.length}</h2>
        {loading && <h1>Your data is loading</h1>}
        {error && <h1>Something Went Wrong</h1>}
        {data.map((user) => (
          <div key={user.user_id}>
            <h5>User ID: {user.user_id}</h5>
            <h5>Username: {user.username}</h5>
            <h5>Email: {user.email}</h5>
            <h5>User Type: {user.user_type}</h5>
            <br />
          </div>
        ))}
      </>
    );
  }


export default UserFetch