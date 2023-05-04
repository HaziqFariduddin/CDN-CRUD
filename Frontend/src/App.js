import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUser from './components/addUser';
import EditUser from './components/editUser';
import UserDataTable from './components/userDataTable';

function App() {

  return (

    <div class="container card mb-4 box-shadow">

      <div class="card-header">
        <h4 class="my-0 font-weight-normal">CDN CRUD</h4>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/read" />} />
        <Route exact path="/create" element={<AddUser />} />
        <Route exact path="/read" element={<UserDataTable />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>

    </div>
  );
}

export default App;
