import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@chakra-ui/react";

const UploadFiles = ({ userid, setFilesData }) => {
  const [files, setFiles] = useState([]);

  const onInputChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFilesData(null);
    const data = new FormData();
    data.append("file", files);
    data.append("userid", userid);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios
      .post("https://wtfassignment108.herokuapp.com/upload", data, config)
      .then((response) => {
        toast.success("Upload Success");
        console.log(response.data);
        setFilesData(response.data);
      })
      .catch((e) => {
        toast.error("Upload Error");
      });
  };

  return (
    <div class="col-md-5 m-auto">
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <div className="form-group files">
          <label>Upload Your File </label>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf"
            onChange={onInputChange}
            className="form-control"
          />
        </div>

        <Button variant="solid" colorScheme="blue" type="submit">
          Submit
        </Button>
      </form>
      <div></div>
    </div>
  );
};

export default UploadFiles;
