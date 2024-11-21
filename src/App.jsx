import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";


// Update textSections to include a SoundCloud section
const textSections = [
  { text: "Hey Sophie!", bgColor: "#000", animationType: "top" },
  { text: "Happy 6 months!", bgColor: "#000", animationType: "bottom" },
  { text: "Here are the first...", bgColor: "#000", animationType: "bottom" },
  { text: "30 voice notes", emoji: "\u{1F90D}", bgColor: "#000", animationType: "fade" },
  {
    type: "soundcloud", // New type to indicate SoundCloud embed
    bgColor: "#000", 
    soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1963155911%3Fsecret_token%3Ds-qeXJJ7GgnEr&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    animationType: "fade",
  }
];

const getAnimation = (type) => {
  switch (type) {
    case "bottom":
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      };
    case "top":
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      };
    case "left":
      return {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
      };
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    default:
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      };
  }
};

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      const newSection = Math.min(
        Math.floor(scrollY / sectionHeight),
        textSections.length - 1
      );
      setCurrentSection(newSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container-site">
      {textSections.map((section, index) => {
        const animation = getAnimation(section.animationType);

        return (
          <div key={index} className="container">
            {/* Background Container */}
            <div
              className="background-container"
              style={{ backgroundColor: section.bgColor }}
            ></div>

            {/* Check if the section type is 'soundcloud' */}
            {section.type === "soundcloud" ? (
              // Embed SoundCloud Player
              <motion.div
                className="soundcloud-container"
                initial={animation.initial}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <iframe
                  width="100%"
                  height="400"
                  scrolling="no"
                  frameBorder="no"
                  src={section.soundcloudUrl}
                  title="SoundCloud Player"
                ></iframe>
              </motion.div>
            ) : (
              // Regular Text Container with animation
              <motion.div
                className="text-container"
                initial={animation.initial}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1>{section.text} {section.emoji}</h1>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default App;
