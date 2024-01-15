"use client";

import { useState } from "react";
import { POST } from "@/app/api/acortador/route";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [vacio, setVacio] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [data, setData] = useState([]);

  const validateUrl = (url) => {
    if (url === "") {
      setVacio(true);
      return;
    }

    if (url.includes("http://")) {
      const newurl = url.slice(7);
      setUrl(newurl);
    }

    if (url.includes("https://")) {
      const newurl = url.slice(8);

      setUrl(newurl);
    }
  };

  const shortenUrl = (url) => {
    validateUrl(url);
    const start = url.length / 2;

    const shortUrl =
      url.slice(start, start + 2) + Math.floor(Math.random() * 1000);
    setShortUrl(shortUrl);
    return shortUrl;
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    shortenUrl(url);
    setData({ url, shortUrl });

    POST(data);
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-pink-500 ">
      <div className="text-center">
        <h1 className=" text-white text-2xl w-96 rounded-md">URL SHORTENER</h1>
        <form
          className="mt-4 bg-white/20 p-6 rounded-md"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-2 mb-2 rounded-md"
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            type="submit"
          >
            Shorten
          </button>
          <span className="w-full p-2 mb-2 rounded-md">
            {shortUrl && !vacio ? (
              <>
                <p>tu nueva url</p>
                <h1>{shortUrl}</h1>
              </>
            ) : null}
          </span>
        </form>
      </div>
    </div>
  );
}
