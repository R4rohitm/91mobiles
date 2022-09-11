import React from "react";
import { useEffect, useState } from "react";
import UploadFiles from "./UploadFiles";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  const [filesData, setFilesData] = useState();
  const data = JSON.parse(localStorage.getItem("user"));
  let token;
  if (data) {
    token = data.token;
  }
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
        <Flex>
          <iframe
            src={`https://wtfassignment108.herokuapp.com/uploads/${filesData.files[0].filename}`}
            title="Files"
            width="800"
            height="1000"
            style={{ margin: "auto", marginTop: "80px" }}
          />
        </Flex>
      ) : null}
    </div>
  );
};

export default Home;
