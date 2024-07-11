import React, { useRef, useState } from 'react'

const UploadImageComponent = ({ image, setImage, existsImage,requiredDimensions }) => {
    const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    const validImages = [];

    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          if (img.width >= requiredDimensions.width && img.height >= requiredDimensions.height) {
            validImages.push(file);
            setImage(validImages);
          } else {
            alert(`Image dimensions should be at least ${requiredDimensions.width}px width and ${requiredDimensions.height}px height.`);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div onClick={handleImageClick}>
      {image.length > 0 ? (
        image.map((imge, index) => (
          <img key={index} src={URL.createObjectURL(imge)} alt="" width={50} height={50} />
        ))
      ) : (
        <img src={existsImage ? existsImage : "/assests/Uploadimage.png"} width={50} height={50} alt="" />
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} ref={inputRef} multiple hidden />
    </div>
  );
};


export default UploadImageComponent
