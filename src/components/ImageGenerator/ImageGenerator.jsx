import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: '512x512', // You can also try "256x256" or "1024x1024"
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}:`, errorText);
        alert(`Error ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;
      setImage_url(imageUrl);
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('Image generation failed. Check console for more details.');
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === '/' ? default_image : image_url} alt="Generated" />
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe your image vision!" />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
