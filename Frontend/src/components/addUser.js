import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const AddUser = () => {
  const baseURL = process.env.REACT_APP_API_URL + "/api/users/";
  const navigate = useNavigate();
  const [enteredName, setName] = useState('');
  const [enteredEmail, setEmail] = useState('');
  const [enteredPhoneNumber, setPhoneNumber] = useState('');
  const [enteredSkillsets, setSkillsets] = useState('');
  const [enteredHobby, setHobby] = useState('');

  const nameChangeHandler = (event) => {
    setName(event.target.value);
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
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const phoneNumberRegex = /^01\d{8,9}$/;
    const usernameRegex = /^[a-zA-Z]+$/;

    if (!enteredName.trim() || !usernameRegex.test(enteredName)) {
      alert("Please enter a valid username containing only letters.");
      return;
    }

    if (!enteredEmail.trim() || !emailRegex.test(enteredEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!enteredPhoneNumber.trim() || !phoneNumberRegex.test(enteredPhoneNumber)) {
      alert("Please enter a valid phone number with a minimum of 10 digits and a maximum of 11 digits, starting with 01.");
      return;
    }


    axios
      .post(baseURL, {
        username: enteredName,
        email: enteredEmail,
        phoneNumber: enteredPhoneNumber,
        skillsets: enteredSkillsets.split(','),
        hobby: enteredHobby.split(',')
      })
      .then((response) => {
        alert("User " + enteredName + " added!");
        navigate("/read");
      }).catch(error => {
        if (error.response) {
          if (error.response.status === 409) {
            alert("Error: " + error.response.data.message);
          } else if (error.response.status === 400) {
            alert("Error: " + error.response.data.message);
          } else if (error.response.status === 500) {
            alert("Error: " + error.response.data.message);
          }
        } else {
          alert("Error: " + error);
        }
      });

  };

  const cancelHandler = () => {
    //reset the values of input fields
    setName('');
    setEmail('');
    setPhoneNumber('');
    setSkillsets('');
    setHobby('');
    navigate("/read");

  }
  return (
    <Alert variant='primary'>
      <Container>
        <Form onSubmit={submitActionHandler} className='FormContainer'>
          <Form.Group controlId="form.Username" className='FormItem'>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="Enter Username" required />
          </Form.Group>
          <Form.Group controlId="form.Email" className='FormItem'>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={enteredEmail} onChange={emailChangeHandler} placeholder="Enter email" required />
          </Form.Group>
          <Form.Group controlId="form.PhoneNumber" className='FormItem'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" value={enteredPhoneNumber} onChange={phoneNumberChangeHandler} placeholder="Phone Number (Format 01XXXXXXXX)" required />
          </Form.Group>
          <Form.Group controlId="form.Skillsets" className='FormItem'>
            <Form.Label>Skillsets</Form.Label>
            <Form.Control type="text" value={enteredSkillsets} onChange={skillsetsChangeHandler} placeholder="Skillsets (comma separated)" required />
          </Form.Group>
          <Form.Group controlId="form.Hobby" className='FormItem'>
            <Form.Label>Hobby</Form.Label>
            <Form.Control type="text" value={enteredHobby} onChange={hobbyChangeHandler} placeholder="Hobby (comma separated)" required />
          </Form.Group>
          <br></br>
          <Button type='submit'>Add User</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type='submit' onClick={() => cancelHandler()}>Cancel</Button>
        </Form>

      </Container>
    </Alert>
  );
}

export default AddUser;