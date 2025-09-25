"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upload } from "@vercel/blob/client";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const TOKEN = process.env.TOKEN;
  const handlePrompt = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPrompt(value);
  };

  const fetchData = async () => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted",
            num_inference_steps: 20,
            quidance_scale: 7.5,
          },
        }),
      }
    );
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    const file = new File([blob], "generated.png", { type: "image/png" });
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });

    setImage(imageUrl);
  };

  return (
    <div>
      <Input name="prompt" onChange={(e) => handlePrompt(e)} value={prompt} />
      <Button onClick={fetchData}>Generate</Button>
      <img src={image} />
    </div>
  );
};
export default Page;
