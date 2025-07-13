import React, { useState, useEffect, useRef } from "react";

const defaultStyles = {
  fontWeight: "bold",
  fontSize: "1.25rem",
  color: "#fff",
  fontFamily: "inherit",
  letterSpacing: "0.5px",
  display: "inline-block",
};

export default function Typewriter({
  phrases = ["Machine Learning", "Python", "Web Development"],
  typingSpeed = 100,
  deletingSpeed = 60,
  pause = 1000,
  style = {},
  cursorColor = "#67e8f9",
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    // Blinking cursor
    const blinkInterval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting && charIndex <= currentPhrase.length) {
      if (charIndex === currentPhrase.length) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timeoutRef.current = setTimeout(() => {
          setText(currentPhrase.slice(0, charIndex + 1));
          setCharIndex((i) => i + 1);
        }, typingSpeed);
      }
    } else if (isDeleting && charIndex >= 0) {
      if (charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else {
        timeoutRef.current = setTimeout(() => {
          setText(currentPhrase.slice(0, charIndex - 1));
          setCharIndex((i) => i - 1);
        }, deletingSpeed);
      }
    }
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pause]);

  useEffect(() => {
    if (!isDeleting) setCharIndex(0);
    // eslint-disable-next-line
  }, [phraseIndex]);

  return (
    <span style={{ ...defaultStyles, ...style }}>
      {text}
      <span
        style={{
          display: "inline-block",
          width: "1ch",
          color: cursorColor,
          opacity: blink ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      >
        |
      </span>
    </span>
  );
} 