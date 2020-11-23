import React, { useState } from "react";
import Button from "../../shared/components/UIElements/Button/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import ImageUpload from "../../shared/components/UIElements/ImageUpload/ImageUpload";
import "./UserProfile.css";

export default function UserProfile() {
  const [imageValid, setImageValid] = useState(false);
  const [image, setImage] = useState();

  const imageChangeHandler = (id, imageUrl, isValid) => {
    console.log(image);
    setImage(imageUrl);
    setImageValid(isValid);
  };

  const setSignupPage = () => {
    window.history.back();
  };

  return (
    <div>
      <Card className="profile-container">
        <ImageUpload center onImageUpload={imageChangeHandler} />
        <hr />
        <div className="profile-submit">
          <Button
            className="profile-button"
            disabled={!imageValid}
            onClick={setSignupPage}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
