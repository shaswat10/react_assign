import React, { useState, useEffect, useRef } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalPopup from "./ModalPopup";
import axios from "axios";
import { DELETE_API_URL} from '../const'
import { useNavigate } from "react-router-dom";

function HomeTable({ list }) {
  let navigate = useNavigate(); 

  const routeChange = (userData) =>{ 
    let path = "/edit/"; 
    navigate(path,{ state: userData,  setUpdateView:setUpdateView, updateView:updateView});
  }
  const [popupstatus, setPopupstatus] = useState(false);

  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [updateView, setUpdateView] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser=(email)=>{
  
    axios.get(
      DELETE_API_URL +
        `?param1=${deleteId}`
    )
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        // return <Navigate to="/" />;
        handleClose()
      }
    });
  }

  const deleteFun = (email) => {
    handleShow();
    setDeleteId(email);
  };


  useEffect(() => {

  }, [deleteId])
  

  

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
          {list.map((userdata, indx) => {
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
                    <Button variant="primary" onClick={(e)=>{e.preventDefault()
                    routeChange(userdata)
                    }}>
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
}

export default HomeTable;
