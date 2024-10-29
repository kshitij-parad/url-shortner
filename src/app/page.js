
"use client";
 
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./components/ui/aurora-background";
import URLShortenerInput from "./components/URLShortner";

export default function Home() {
  return (

    <AuroraBackground>
     

<URLShortenerInput />
      
    </AuroraBackground>
  );
}
