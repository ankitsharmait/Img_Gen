import React, { useRef, useState } from "react";
import axios from "axios";
import "./Image_Generator.css";
import default_ai_image from "../Assests/default_ai_image.jpeg";

function Image_Generator() {
    const [Image_Url, Set_Img_Url] = useState('/');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (!inputRef.current.value) return;

        setLoading(true);

        const API_URL = "https://api.fal.ai/v1/image/generation";

        const response = await axios.post(API_URL, {
            prompt: inputRef.current.value,
            model: "stabilityai/stable-diffusion-xl-base-1.0",
            num_images: 1
        }, {
            headers: {
                "Authorization": `Bearer 65336fb2-0f8d-4030-8dae-c4be421d4072:c3750058b736ced7726e5d22e360d50c`,
                "Content-Type": "application/json",
                "User-Agent": "chrome",
            }
        });

        setLoading(false);

        if (response.data?.images?.length > 0) {
            Set_Img_Url(response.data.images[0].url);
        }
    };

    return (
        <div className="ai_image_generator">
            <div className="header">
                Image <span>Genie</span>
            </div>
            <div className="img_loading">
                <div className="image">
                    <img src={Image_Url === "/" ? default_ai_image : Image_Url} alt="Generated AI" />
                </div>
            </div>
            <div className="searchbox">
                <input type="text" ref={inputRef} className="search_input" placeholder="Describe What You Want To See" />
                <div className="generate_btn" onClick={imageGenerator}>
                    {loading ? "Generating..." : "Generate"}
                </div>
            </div>
        </div>
    );
}
export default Image_Generator;
