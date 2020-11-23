import React, { useRef, useState, useEffect } from "react";
import Button from "../Button/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const imageRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const selectImage = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const saveImage = (event) => {
    let selectedImage;
    let imageValid;
    if (event.target.files && event.target.files.length === 1) {
      selectedImage = event.target.files[0];
      setFile(selectedImage);
      setIsValid(true);
      imageValid = true;
    } else {
      setIsValid(false);
      imageValid = false;
    }
    props.onImageUpload(props.id, selectedImage, imageValid);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={imageRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={(e) => saveImage(e)}
      />

      <div className={`image-upload ${props.center && `center`}`}>
        <div
          className={`image-upload__preview ${
            props.previewClass && `image-upload__avatar`
          }`}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>Pick an image</p>
          )}
        </div>

        <Button
          type="button"
          className={props.buttonClass}
          onClick={selectImage}
        >
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
