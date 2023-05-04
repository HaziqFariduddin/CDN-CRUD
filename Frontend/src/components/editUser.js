import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditUser = () => {
  const editURL = process.env.REACT_APP_API_URL + "/api/users/";
  const navigate = useNavigate();
  const param = useParams();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skillsets, setSkillsets] = useState('');
  const [hobby, setHobby] = useState('');

  useEffect(() => {
    axios.get(editURL + param.id).then((response) => {
      const userData = response.data;
      setUserId(userData._id);
      setUsername(userData.username);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
      setSkillsets(userData.skillsets.join(", "));
      setHobby(userData.hobby.join(", "));
    }).catch(error => {
      alert("Error occurred getting user detail:" + error);
    });
  }, []);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const phoneNumberChangeHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const skillsetsChangeHandler = (event) => {
    setSkillsets(event.target.value);
  };

  const hobbyChangeHandler = (event) => {
    setHobby(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    axios.put(editURL + param.id, {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      skillsets: skillsets.split(","),
      hobby: hobby.split(","),
    }).then((response) => {
      alert("User " + username + " updated!");
      navigate("/read");
    }).catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("Error occurred updating user: " + error.response.data.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Error occurred updating user: " + error.message);
      }
    });
  };

  return (
    <Alert variant='primary'>
      <Container>
        <Form onSubmit={submitActionHandler} id="data">
          <Form.Group controlId="form.Username">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={username} onChange={usernameChangeHandler} placeholder="Enter User Name" required />
          </Form.Group>
          <Form.Group controlId="form.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={emailChangeHandler} placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="form.PhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" value={phoneNumber} onChange={phoneNumberChangeHandler} placeholder="Phone Number (Format 01XXXXXXXX)" required />
          </Form.Group>
          <Form.Group controlId="form.Skillsets">
            <Form.Label>Skillsets</Form.Label>
            <Form.Control type="text" value={skillsets} onChange={skillsetsChangeHandler} placeholder="Skillsets (comma separated)" required />
          </Form.Group>
          <Form.Group controlId="form.Hobby">
            <Form.Label>Hobby</Form.Label>
            <Form.Control type="text" value={hobby} onChange={hobbyChangeHandler} placeholder="Hobby (comma separated)" required />
          </Form.Group>
          <br></br>
          <Button type='submit'>Update User</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type='submit' onClick={() => navigate("/read")}>Cancel</Button>
        </Form>
      </Container>
    </Alert>
  );

};

export default EditUser;
