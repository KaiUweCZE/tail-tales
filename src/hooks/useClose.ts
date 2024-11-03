import { useEffect, useState } from "react";

const useClose = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return {
    isOpen,
  };
};

export default useClose;
