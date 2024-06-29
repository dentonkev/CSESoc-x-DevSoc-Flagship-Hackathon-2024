import dotenv from 'dotenv'
import fs from 'fs'
import axios from 'axios'

dotenv.config();

const openaiKey = process.env.API_KEY;
const imagePath = "./images/walk.jpg"

// Function to encode the image
const encodeImage = (imagePath) => {
  const image = fs.readFileSync(imagePath);
  return image.toString('base64');
};

const base64Image = encodeImage(imagePath);

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${openaiKey}`
};

const payload = {
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "what is happening in this images, short response"
        },
        {
          type: "image_url",
          image_url: {
            "url": "https://scontent.fsyd3-2.fna.fbcdn.net/v/t39.30808-6/306324509_458138779685264_4419759373600541515_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=foVNrNkzhSYQ7kNvgExBJEU&_nc_ht=scontent.fsyd3-2.fna&oh=00_AYCaAbnwMG0FUhFIhnB7zI9rKTTOjV-nSWOUTjBcz8nc1A&oe=66854408"
          }
        }
      ]
    }
  ],
  max_tokens: 300
};

axios.post("https://api.openai.com/v1/chat/completions", payload, { headers })
  .then(response => {
    x = response;
  })
  .catch(error => {
    console.error("Error fetching completion:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  });
