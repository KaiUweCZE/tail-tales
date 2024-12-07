import { RefObject, useEffect, useRef, useState } from "react";

interface UseClickOutsideReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  active: boolean;
  setActive: (value: boolean) => void;
}

const useClickOutside = <T extends HTMLElement>(): UseClickOutsideReturn<T> => {
  const [active, setActive] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { ref, active, setActive };
};

export default useClickOutside;
