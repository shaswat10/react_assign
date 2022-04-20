import React, { useState, useEffect, useRef } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import axios from "axios";
import { DELETE_API_URL } from "../const";
import { useNavigate, useLocation } from "react-router-dom";

function HomeTable({ list, setUpdateView, updateView, searchItm }) {
  let navigate = useNavigate();

  const routeChange = (userData) => {
    let path = "/edit/";

    console.log(userData);
    navigate(path, { state: userData });
  };
  const [popupstatus, setPopupstatus] = useState(false);

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [loaderstate, setLoaderstate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = (email) => {
    setLoaderstate(true);
    axios.get(DELETE_API_URL + `?param1=${deleteId}`).then((res) => {
      debugger;
      console.log(res);
      if (res.status == 200) {
        setLoaderstate(false);
        handleClose();
        setUpdateView(!updateView);
      }
    });
  };

  const deleteFun = (email) => {
    handleShow();
    setDeleteId(email);
  };

  if (loaderstate == false) {
    return (
      <Container>
        <ModalPopup
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          deleteUser={deleteUser}
        />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>State</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list
              .filter((lstItm) => {
                if (searchItm == "") {
                  return lstItm;
                } else {
                  for (const [key, value] of Object.entries(lstItm)) {
                    console.log("CCCCCCCCCCCCC");
                    if (value.toLowerCase().includes(searchItm.toLowerCase())) {
                      return lstItm;
                    }
                    console.log(key, value);
                  }
                }
              })
              .map((userdata, indx) => {
                return (
                  <tr>
                    <td>{indx}</td>
                    <td>{userdata.first_name}</td>
                    <td>{userdata.last_name}</td>
                    <td>{userdata.email}</td>
                    <td>{userdata.states}</td>
                    <td>{userdata.city}</td>
                    <td>{userdata.pincode}</td>
                    <td className="actionCls">
                      <span>
                        <Button
                          variant="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            routeChange(userdata);
                          }}
                        >
                          Edit
                        </Button>
                      </span>

                      <span className="" style={{ paddingLeft: "1em" }}>
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            deleteFun(userdata.email);
                          }}
                        >
                          Delete
                        </Button>
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Container>
    );
  } else {
    return(
      <Container>
      <p style={{"textAlign":"center", "fontSize":"3em"}}>Loading......</p>
    </Container>
    )
  }
}

export default HomeTable;
