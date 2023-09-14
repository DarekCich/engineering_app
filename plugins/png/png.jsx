import React, { useState } from 'react';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <h1>Wybierz i przeslij zdjecie</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <p>Wybrane zdjecie: {selectedImage.name}</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Wybrane zdjecie" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
