import { Dispatch, SetStateAction, useEffect } from "react";

interface OutsideProps {
  className: string;
  state: { index: number; active: boolean };
  setState: Dispatch<SetStateAction<{ index: number; active: boolean }>>;
}

const useClickOutside = ({ state, setState, className }: OutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const clickedElement = target.closest(`.${className}`);

      if (!clickedElement) {
        setState({ index: 0, active: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [className, setState]);
};

export default useClickOutside;
