import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { persistStore, persistReducer } from "redux-persist";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Navbarcomp from "../components/Navbarcomp";
import csspage from "../cssmodules/Formpage.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";
import { ADD, ADD_API_URL, EDIT, EDIT_API_URL } from "../const";
import { useNavigate, useLocation } from "react-router-dom";

function Formpage({ formType, userData }) {
  console.log("DDDDDDDDDDDDD")
  let location = useLocation();
  let navigate = useNavigate(); 
  console.log(location.state)

  if (localStorage.formData == undefined) {
    window.localStorage.setItem(
      "formData",
      JSON.stringify({
        firstname: "",
        lastname: "",
        email: "",
        state: "",
        city: "",
        pincode: "",
      })
    );
  }

  const [formData, setFormData] = useState({
    firstname: formType==ADD?JSON.parse(localStorage.formData).firstname:location.state.first_name,
    lastname: formType==ADD?JSON.parse(localStorage.formData).lastname:location.state.last_name,
    email: formType==ADD?JSON.parse(localStorage.formData).email:location.state.email,
    state: formType==ADD?JSON.parse(localStorage.formData).state:location.state.state,
    city: formType==ADD?JSON.parse(localStorage.formData).city:location.state.city,
    pincode: formType==ADD?JSON.parse(localStorage.formData).pincode:location.state.pincode,
  });

  const userApiCall = (reqData) => {
    var DEFAULT_URL = formType == EDIT ? EDIT_API_URL : ADD_API_URL;

    axios
      .get(
        DEFAULT_URL +
          `?param1=${formData.email}&param2=${formData.firstname}&param3=${formData.lastname}&param4=${formData.pincode}&param5=${formData.city}&param6=${formData.state}`
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          
          location.state.setUpdateView(!location.state.updateView)
          let path = "/"; 
          navigate(path,{ state: userData });
        }
      });
  };

  const validateForm = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!formData.email || regex.test(formData.email) === false) {
      swal("Please provide a valid email address");
      return true;
    }

    if (formData.pincode.length >= 6 || formData.pincode.length <= 6) {
      swal("length of pincode should be 6");
      return true;
    }

    for (const [key, value] of Object.entries(formData)) {
      let response = false;
      if (value == "") {
        swal("Please fill all the fields");
        return true;
      }
    }
    return false;
  };
  function setLocalStorage(key, val) {
    debugger;
    var localData = JSON.parse(localStorage.formData);
    localData[key] = val;
    localStorage.setItem("formData", JSON.stringify(localData));
  }

  const state_options = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Delhi", value: "Delhi" },
    { label: "Begaluru", value: "Begaluru" },
  ];

  const handleChange = (event) => {
    setLocalStorage("state", event.target.value);
    setFormData({ ...formData, state: event.target.value });
    if (formType == "edit") {
    }
    // setState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    event.preventDefault();
    console.log(formData);

    // if (validateForm()) {
    //   return;
    // }
    // else{
    //   userApiCall(formData)
    // }
    userApiCall(formData);
  };

  const setFormState = (event) => {};



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
                    setLocalStorage("firstname", e.target.value);
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
                  value={formData.lastname}
                  onChange={(e) => {
                    setLocalStorage("lastname", e.target.value);
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
                  value={formData.email}
                  onChange={(e) => {
                    setLocalStorage("email", e.target.value);
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
                  value={formData.city}
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
                  type="text"
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
