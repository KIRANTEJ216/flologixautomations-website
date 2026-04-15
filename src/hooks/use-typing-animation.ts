import { useEffect, useState } from "react";

export function useTypingAnimation(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseDuration = 2000
) {
  const [displayText, setDisplayText] = useState(words[0] || "");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          if (displayText.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, mounted]);

  return displayText;
}
