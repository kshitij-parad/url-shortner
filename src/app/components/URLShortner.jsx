'use client';
import React, { useState } from 'react';
import { LinkIcon, Copy, CheckCheck, ArrowRight } from 'lucide-react';

const URLShortenerInput = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (value) => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    setIsValidUrl(validateUrl(value));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload

//     if (!url || !isValidUrl) return; // Validate input URL

//     setIsProcessing(true); // Show loading state

//     try {
//       // Make direct API call to TinyURL
//       const response = await fetch('https://api.t.ly/api/v1/link/shorten', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Specify the content type
//           'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHORTURL_API_KEY}`, // Use your API key from .env.local
//         },
//         body: JSON.stringify({ long_url: url }), // Send the URL to shorten
//       });

//       if (!response.ok) {
//         throw new Error('Failed to shorten URL');
//       }

//       const data = await response.json();
//       setShortenedUrl(data.shortenedUrl); // Update UI with shortened URL
//     } catch (error) {
//       console.error('Error:', error.message); // Log any errors
//       alert('Something went wrong! Please try again.');
//     } finally {
//       setIsProcessing(false); // Stop loading state
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!url || !isValidUrl) return; // Validate input URL

    setIsProcessing(true); // Show loading state

    try {
        // Call your Next.js API route
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ long_url: url }), // Send the URL to shorten
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        console.log(data)
        setShortenedUrl(data.short_url); // Update UI with shortened URL
    } catch (error) {
        console.error('Error:', error.message); // Log any errors
        alert('Something went wrong! Please try again.');
    } finally {
        setIsProcessing(false); // Stop loading state
    }
};


  const copyToClipboard = async () => {
    if (!shortenedUrl) return;
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="relative bg-gray-800 rounded-2xl p-6 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <LinkIcon className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-semibold text-white">Shorten URL</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              {/* Input */}
              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                placeholder="Paste your long URL"
                className={`w-full px-4 py-3 bg-gray-900 text-white placeholder-gray-500 rounded-xl border-2 outline-none transition-all duration-200 ${isValidUrl ? 'border-gray-700 focus:border-cyan-500 hover:border-gray-600' : 'border-red-500/50'}`}
              />

              {/* Error Message */}
              {!isValidUrl && (
                <p className="absolute -bottom-5 left-0 text-sm text-red-400">
                  Please enter a valid URL
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!url || !isValidUrl || isProcessing}
              className={`w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${isProcessing ? 'animate-pulse' : ''}`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Shorten URL
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Result */}
          {shortenedUrl && (
            <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between gap-2">
                <p className="text-cyan-400 font-mono text-sm truncate">{shortenedUrl}</p>
                <button onClick={copyToClipboard} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Copy to clipboard">
                  {isCopied ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLShortenerInput;
