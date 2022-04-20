import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "react-bootstrap";
import apicallFun from "../apicalls";
import Filterbar from "../components/Filterbar";
import HomeTable from "../components/HomeTable";
import Navbarcomp from "../components/Navbarcomp";
import { FETCH_API_URL } from "../const";
import axios from "axios";

function TableList() {
  const [userList, setUserList] = useState(null);

  const fetchUsersApi = (urlData, reqData = null) => {
    axios.get(urlData, reqData).then((res) => {
      if (res.status == 201) {
        console.log(res.data.data)
        setUserList(res.data.data)
      } else {
      }
    });
  };

  useEffect(() => {
    fetchUsersApi(FETCH_API_URL);
    // localStorage.clear()
  }, []);


  if(userList != null){
    return (
        <>
          <div>
            <Navbarcomp />
            <div className="pt-4">
              <Filterbar />
            </div>
            <div className="pt-5">
              <HomeTable list={userList}/>
            </div>
          </div>
        </>
      );
  }
  else{
    return (
        <>
          Loading......
        </>
      );
  }
}

export default TableList;
