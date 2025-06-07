# AI Image Generator

A simple React-based AI Image Generator using the Hugging Face API. Describe an image, and the AI will generate it for you!

## Features

- React frontend
- Integration with OHugging Face
- Dynamic image generation from user input
- Responsive UI

## Tech Stack

- React JS
- CSS
- Hugging Face

## Project Structure

```
src/
├── components/
│   └── ImageGenerator/
│       ├── ImageGenerator.jsx
│       └── ImageGenerator.css
├── Assets/
│   └── default_image.svg
├── App.js
└── index.js
```

## Setup Environment Variables

Create a `.env` file in the root of your project:

```
REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
```

**Ensure you restart npm start after saving .env**

## Installation & Usage

1. Clone the repo:
   ```
   git clone https://github.com/your-username/ai-image-generator.git
   cd ai-image-generator
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the app:
   ```
   npm start
   ```

Open http://localhost:3000 to use the app.