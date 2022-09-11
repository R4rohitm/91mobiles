import React from "react";
import { useEffect, useState } from "react";
import UploadFiles from "./UploadFiles";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Home = () => {
  const [filesData, setFilesData] = useState();
  const data = JSON.parse(localStorage.getItem("user"));
  let token;
  if (data) {
    token = data.token;
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const checkUser = async () => {
    try {
      let response = await fetch(
        `https://wtfassignment108.herokuapp.com/login`,
        {
          // eslint-disable-next-line
          headers: { Authorization: "Bearer" + " " + token },
        }
      );
      let data = JSON.stringify(await response.json());
      console.log(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <UploadFiles userid={data.userid} setFilesData={setFilesData} />
      {filesData ? (
        <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            <Viewer
              fileUrl={`https://wtfassignment108.herokuapp.com/uploads/${filesData.files[0].filename}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </>
      ) : null}
    </div>
  );
};

export default Home;
