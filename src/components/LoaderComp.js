import React from "react";
import loadercss from "../cssmodules/LoaderComp.module.css";

function LoaderComp() {
  function myFunction() {
    var myVar = setTimeout(showPage, 3000);
  }

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }
  return (
    <div onLoad={myFunction()} style={{ margin: "0" }}>
      <div id="loader"></div>
    </div>
  );
}

export default LoaderComp;
