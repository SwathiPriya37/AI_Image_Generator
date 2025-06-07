import React, { useState, useRef } from 'react';
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    const prompt = inputRef.current.value.trim();
    if (!prompt) return;

    setLoading(true);  

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              width: 512,
              height: 512,
              num_inference_steps: 50,
              guidance_scale: 7.5
            }
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}:`, errorText);
        
        if (response.status === 503) {
          alert('Model is loading, please try again in a few seconds');
        } else if (response.status === 429) {
          alert('Rate limit exceeded, please wait a moment');
        } else {
          alert(`Error ${response.status}: ${errorText}`);
        }
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage_url(imageUrl);
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('Image generation failed. Check console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image Generator
      </div>
      <div className="img-loading">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Generating your image...</div>
          </div>
        ) : (
          <img src={image_url === '/' ? default_image : image_url} alt="Generated" />
        )}
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe What You Want To See"
        />
        <div
          className={`generate-btn ${loading ? 'loading' : ''}`}
          onClick={imageGenerator}
        >
          {loading ? 'Generating...' : 'Generate'}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;