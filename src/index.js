import dotenv from 'dotenv'
import fs from 'fs'
import axios from 'axios'

dotenv.config();

const openaiKey = process.env.API_KEY;
const imagePath = "./images/burger.png"

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
          text: `
                what food type is this and macros (just a number no ranges)? +
                response format: 
                food:
                Calories:
                Protein: 
                Carbohydrates:
                Fat: 
                Sodium: 
                Sugars: 
                Health Rating (Out of 5): 
                `
        },
        {
          type: "image_url",
          image_url: {
            "url": `data:image/jpeg;base64,${base64Image}`
          }
        }
      ]
    }
  ],
  max_tokens: 300
};

axios.post("https://api.openai.com/v1/chat/completions", payload, { headers })
  .then(response => {
    fs.writeFileSync('text.txt', JSON.stringify(response.data.choices[0].message));

    console.log(response.data.choices[0].message)
  })
  .catch(error => {
    console.error("Error fetching completion:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  });
