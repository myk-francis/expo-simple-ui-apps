import { jarvisAPIKeyBilling } from "../constants/Api";
import axios from "axios";
import { TChatGPTResponse, TMessage } from "../constants/JarvisTypes";
const client = axios.create({
  headers: {
    Authorization: "Bearer " + jarvisAPIKeyBilling,
    "Content-Type": "application/json",
  },
});

const chatgptUrl = "https://api.openai.com/v1/chat/completions";
const dalleUrl = "https://api.openai.com/v1/images/generations";

export const apiCall = async (prompt: string, messages: TMessage[]) => {
  // Logic 1 : this will check the prompt from chatgpt if user wants to create an image
  try {
    // let isArt = "";
    // const res = await client.post(chatgptUrl, {
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
    //     },
    //   ],
    // });
    // console.log("✅ File:openAI | Function: apiCall | res:", res);
    // isArt = res.data?.choices[0]?.message?.content;
    // isArt = isArt.trim();
    // isArt.toLowerCase().includes("yes")

    prompt = prompt.toLowerCase();
    let isArt =
      prompt.includes("image") ||
      prompt.includes("sketch") ||
      prompt.includes("art") ||
      prompt.includes("picture") ||
      prompt.includes("drawing");
    if (isArt) {
      console.log("dalle api call");
      return dalleApiCall(prompt, messages);
    } else {
      console.log("chatgpt api call");
      return chatgptApiCall(prompt, messages);
    }
  } catch (err: any) {
    console.log("error: ", err);
    return Promise.resolve({
      success: false,
      data: "❌ File:openAI | Function: apiCall | error:" + err.message,
    });
  }

  // Logic 2 : sometimes chatgpt does not understand the art messages but thats fine, you can use this approach :)

  // prompt = prompt.toLowerCase();
  // let isArt = prompt.includes('image') || prompt.includes('sketch') || prompt.includes('art') || prompt.includes('picture') || prompt.includes('drawing');
  // if(isArt){
  //     console.log('dalle api call');
  //     return dalleApiCall(prompt, messages)
  // }else{
  //     console.log('chatgpt api call')
  //     return chatgptApiCall(prompt, messages);
  // }
};

const chatgptApiCall = async (prompt: string, messages: any) => {
  try {
    const res = await client.post(chatgptUrl, {
      model: "gpt-3.5-turbo",
      messages,
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({ role: "assistant", content: answer.trim() });
    // console.log('got chat response', answer);
    return Promise.resolve({ success: true, data: messages });
  } catch (err: any) {
    console.log("error: ", err);
    return Promise.resolve({
      success: false,
      data: "❌ File:openAI | Function: dalleApiCall | error:" + err.message,
    });
  }
};

const dalleApiCall = async (prompt: string, messages: any) => {
  try {
    const res = await client.post(dalleUrl, {
      prompt,
      n: 1,
      size: "512x512",
    });

    let url = res?.data?.data[0]?.url;
    // console.log('got image url: ',url);
    messages.push({ role: "assistant", content: url });
    return Promise.resolve({
      success: true,
      data: messages,
    });
  } catch (err: any) {
    console.log("error: ", err);
    return Promise.resolve({
      success: false,
      data: "❌ File:openAI | Function: dalleApiCall | error:" + err.message,
    });
  }
};
