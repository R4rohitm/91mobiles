import React from "react";
import { useEffect } from "react";
import UploadFiles from "./UploadFiles";

const Home = () => {
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
      <UploadFiles userid={data.userid} />
    </div>
  );
};

export default Home;
