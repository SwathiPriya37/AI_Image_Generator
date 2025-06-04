# 🧠 AI Image Generator

A simple React-based AI Image Generator using the OpenAI Image API. Describe an image, and the AI will generate it for you!

## 🚀 Features

- React frontend
- Integration with OpenAI DALL·E API
- Dynamic image generation from user input
- Responsive UI

## 📦 Tech Stack

- React JS
- CSS
- OpenAI DALL·E API
- dotenv for managing environment variables

## 📂 Project Structure

src/
│
├── components/
│ └── ImageGenerator/
│ ├── ImageGenerator.jsx
│ └── ImageGenerator.css
│
├── Assets/
│ └── default_image.svg
│
├── App.js
└── index.js


## 🔐 Setup Environment Variables

Create a `.env` file in the **root** of your project:

```env
REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
