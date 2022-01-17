import React, { useState} from 'react';

import "./example.css";

import Pagination from "Components/Pagination";
import "Components/Pagination/style.css";

function Page () {

  const [page, setPage] = useState(1);
  const [setting, setSetting] = useState({
    totalItemCount: 10000,
    navigationPageRange: 10,
    itemsCountPerPage: 10,
  })

  return (
      <React.Fragment>
        <div style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: "#f7f7f7",
        }}>
          <div
              className={""}
              style={{
                width: "1000px",
                margin: "0 auto",
                padding: "100px 0px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
              }}
          >
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
            />
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
                navigationMoveType={"block"}
            />
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
                hideFirstLastButton={true}
            />
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
                hidePrevNextButton={true}
            />
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
                hideFirstLastButton={true}
                hidePrevNextButton={true}
            />
            <Pagination
                {...setting}
                onChange={(number)=>{
                  console.log("current page", number);
                  setPage(number);
                }}
                activePage={page}
                hideDisabled={true}
            />
          </div>
        </div>
      </React.Fragment>
  )
}

export default Page;