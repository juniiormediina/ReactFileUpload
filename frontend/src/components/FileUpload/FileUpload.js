import React, { useState } from "react";
import axios from "axios";

/* Components */
import Message from "../Message/Message";
import Progress from "../Progress/Progress";

let URL = "http://localhost:4000/api/upload";

const FileUpload = () => {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fileName, setFileName] = useState("Choose File");

  const onChange = (e) => {
    console.log(images.length);
    setImages(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadImages = (e) => {
    e.preventDefault();

    /* for (let i = 0; i < images.length; i++) { */
    const fd = new FormData();
    fd.append("image", images[0]);
    try {
      alert("i am here");

      const res = axios
        .post(URL, fd, {
          /* headers: { "Content-Type": "multipart/form-data" }, */
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 1000);
          },
        })
        .then(() => {
          setMessage("File Upload");
        });

      const { name, path } = res.data;

      setUploadedImages({ name, path });
    } catch (err) {
      console.log(err);
      if (err.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage("Images not has been uploaded");
      }
    }
    /* } */
  };

  return (
    <div>
      {message ? <Message msg={message} /> : null}
      <form
        onSubmit={(e) => {
          uploadImages(e);
        }}
      >
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            multiple
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
        </div>

        {uploadPercentage ? <Progress percentage={uploadPercentage} /> : null}

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      <div>
        {uploadedImages.map((image, i) => (
          <div className="row mt-5">
            <div className="col-md-6 m-auto" key={i}>
              <h3 className="text-center">{image.name}</h3>
              <img src={image.path} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
