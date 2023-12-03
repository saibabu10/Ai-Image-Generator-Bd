// import express, { response } from 'express';
// import * as dotenv from 'dotenv';
// import { OpenAI } from 'openai';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI(
// {
//   apiKey:process.env.OPENAI_API_KEY
// })
// router.route('/').get((req,res)=>{
//   res.send('Hello from ai')
// })
// router.route('/').post(async(req,res)=>{
//   try{
//     const {prompt} = req.body;
//     const aiResponse = await openai.images.generate(
//       {
//         prompt,
//         n:1,
//         size:'1024x1024',
//         response_format:'b64_json',
//       });
//       console.log(aiResponse);
//       const image = aiResponse?.data?.data?.[0]?.b64_json;
//       console.log("Generated Image:",image)
//       res.status(200).json({photo: image});
     
//   } catch(error)
//   {
//     console.log(error)
//     console.error(error);
//     res.status(500).send(response.data);
//   }
// })
// export default router;
import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;