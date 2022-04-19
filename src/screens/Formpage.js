import React, { useState, useEffect, useRef } from "react";
import { persistStore, persistReducer } from "redux-persist";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Navbarcomp from "../components/Navbarcomp";
import csspage from "../cssmodules/Formpage.module.css";
import axios from "axios";
import { Navigate } from 'react-router-dom';

import { ADD_API_URL, EDIT, EDIT_API_URL } from "../const";

function Formpage({formType}) {
 
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState({ label: "Mumbai", value: "Mumbai" });
  const [city, setCity] = useState(null);
  const [pincode, setPincode] = useState(null);

  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "", state: "", city: "", pincode: "" });


  const userApiCall = (reqData) => {

    
    var DEFAULT_URL = formType==EDIT?EDIT_API_URL:ADD_API_URL


      axios.get(DEFAULT_URL+`?param1=${formData.email}&param2=${formData.firstname}&param3=${formData.lastname}&param4=${formData.pincode}&param5=${formData.city}&param6=${formData.state}`).then((res) => {
        console.log(res);
        if(res.status == 200){
          return (<Navigate to='/' />)
        }
      })
   
  }

    
    
  


  useEffect(() => {

    var formvar = "";
    if(localStorage.getItem("formData")){

       formvar = JSON.parse(localStorage.getItem("formData"))
    }
    else{
       formvar = {
        firstname: "",
        lastname: "",
        email: "",
        state: { label: "Mumbai", value: "Mumbai" },
        city: "",
        pincode: "",
      }
    }

    setFormData(formvar);

  }, []);


  useEffect(() => {
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const state_options = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Delhi", value: "Delhi" },
    { label: "Begaluru", value: "Begaluru" },
  ];

  const handleChange = (event) => {
    debugger
    
    setFormData({ ...formData, state: event.target.value });
    if(formType=='edit'){

    }
    // setState(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault()

    event.preventDefault();
    console.log(formData);
    userApiCall(formData)
  };

  const setFormState = (event) => {};

  useEffect(() => {}, []);

  return (
    <>
      <Navbarcomp />
      <Container className="pt-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => {
                    setFormData({ ...formData, firstname: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setFormData({ ...formData, lastname: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>State</Form.Label>
                <select
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                >
                  {state_options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setFormData({ ...formData, pincode: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Form.Group
                className="mb-3 mt-5"
                controlId="exampleForm.ControlInput1"
                style={{ textAlign: "end" }}
              >
                <Button
                  variant="primary"
                  className={csspage.buttonCls}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  variant="danger"
                  className={csspage.buttonCls}
                  type="submit"
                >
                  Cancel
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default Formpage;
