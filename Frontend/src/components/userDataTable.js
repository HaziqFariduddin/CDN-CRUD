import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/edit.png";
import deleteIcon from "./../assets/delete.JPG";
import "../App.css";

const UserDataTable = () => {

  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL + "/api/users/";
  const [users, setUsers] = useState([]);

  const setUserData = () => {
    axios.get(baseURL).then((response) => {
      setUsers(response.data);
    }).catch(error => {
      alert("Error occurred while loading data:" + error);
    });
  }

  useEffect(() => {
    setUserData();
  }, []);


  const removeUser = (id, username) => {
    axios.delete(baseURL + "/" + id).then((response) => {
      alert("User record " + username + " deleted!");
      setUserData();
      navigate('/read')

    }).catch(error => {
      alert("Error occurred in removeUser:" + error);
    });
  }

  const removeAllUsers = () => {
    axios.delete(baseURL).then((response) => {
      alert("All users deleted!");
      setUserData();
      navigate('/read')
    }).catch(error => {
      alert("Error occurred in removeUser:" + error);
    });
  }

  return (
    <div className="card-body">
      <br />
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/create")}>
          Create New User
        </button>
      </nav>

      <br />
      <div >
        <h4>Users List</h4>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div class="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Skillsets</th>
                      <th>Hobby</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users &&
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.skillsets.join(', ')}</td>
                          <td>{user.hobby.join(', ')}</td>
                          <td>
                            <div className="action-btns">
                              <Link to={"/edit/" + user._id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" /></Link>
                              <button
                                onClick={() => removeUser(user._id, user.username)} className="button"
                              > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <button className="btn btn-sm btn-danger"
            onClick={() => removeAllUsers()}>
            Remove All
          </button>
        </div>
      </div>

    </div>
  );
}

export default UserDataTable;
