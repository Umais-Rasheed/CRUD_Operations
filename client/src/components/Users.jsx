import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    }

  return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-4 my-5 shadow-lg'>
                <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
                <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead className='thead-light'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                            <Link to={`/update/${user._id}`} className='btn btn-success mr-3'>Update</Link>
                            <button className='btn btn-danger ml-2' 
                            onClick={(e) => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </div>
        </div>

  )
}

export default Users
