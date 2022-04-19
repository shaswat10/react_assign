import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Filterbar() {
  return (
    <Container>
      <div class="d-flex flex-row">
        <div class="pt-2 w-50 filterbar_first"><Link to="/add">+ Add record</Link></div>
        <div class="pt-2 w-50 filterbar_sec">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="search"
          />
        </div>
      </div>
    </Container>
  );
}

export default Filterbar;
