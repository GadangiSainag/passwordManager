import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Card from "./components/Card";
import CreateCard from "./components/CreateCard";

// import { response } from "express";

function MainPage() {

  const [sites, setSites] = useState([]);
  const [loggedIn, setLog] = useState(false);
  const [addEditItem, setAddEditItem] = useState({
    siteURL: "",
    siteUsrName: "",
    sitePassword: "",
  });
  const [onEdit, setEdit] = useState(false);

  function successToast(name){
    toast.success(name , {
      theme: "colored", 
      autoClose : 3000 ,
      position : toast.POSITION.BOTTOM_CENTER
  })
  }
  axios
    .get("http://localhost:3001/passwords")
    .then((response) => {
      setLog(response.data.loggedin);
      setSites(response.data.sites);
  })
    .catch((err) => {
      console.log(err);
    });

  function handleDeleteReq(id) {
    axios
      .delete(`http://localhost:3001/passwords/${id}`)
      .then((response) => {
        console.log(`Item deleted with id ${id}`);
      })
      .catch((error) => {
        console.log(error);
      });

    setSites((prevSites) => {
      return prevSites.filter((siteItem, index) => {
        return index !== id;
      });
    });
  }

   function handleAddSiteReq(newSite) {
     axios.post("http://localhost:3001/passwords", newSite)
      .then((result) =>{
      
          // setEdit(false) 
          console.log(result.data)
       
        
      })
      .catch((err) => {
        console.log(err);
      });
      
  }

  function handleEditDetails(site) {
    //delets the existing element from userSites array
    setEdit(true);
    setAddEditItem({
      siteURL: site.siteURL,
      siteUsrName: site.siteUsrName,
      sitePassword: site.sitePassword,
    });
    handleDeleteReq(site._id);
    console.log(addEditItem);
  }

  if (loggedIn) {
    return (
 
      <div style={{ paddingTop: "100px" }}>

        <h1 style={{ textAlign: "center" }}>
          All saved passwords appear here.
        </h1>
        <CreateCard
          onEdit={onEdit}
          addEditItem={addEditItem}
          addFunc={handleAddSiteReq}
        />
        <div className="box">
          {sites.map((site, index) => {
            return (
              <Card
                key={index}
                site={site}
                onEdit={handleEditDetails}
                onDelete={handleDeleteReq}
              />
            );
          })}
        </div>
        <footer>&copy; 2023 DIY</footer>
  <ToastContainer />

      </div>
    );
  } else {
    return (
      <div style={{ paddingTop: "100px" }}>
        <h1>Visit Login page first then it will direct You to THIS page</h1>
      </div>
    );
  }
}

export default MainPage;
