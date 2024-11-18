import { filterTailwindClasses } from "@/data/tailwind-classes";
import clsx from "clsx";
import { RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClassHelper = ({
  input,
  parentRef,
  addTailwindClass,
}: {
  input: string;
  parentRef: RefObject<HTMLDivElement>;
  addTailwindClass: (tailwindClass: string) => void;
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const suggestions = filterTailwindClasses(input);

  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [input]);

  useEffect(() => {
    // Reset active index after change in the input
    setActiveIndex(0);
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (suggestions[activeIndex]) {
            addTailwindClass(suggestions[activeIndex]);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, activeIndex, addTailwindClass]);

  // top === 0 handle debug quick switches between focus/blur
  // because in the upper left corner could see how the element flashed
  if (!input || position.top === 0) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className="min-w-36"
    >
      {suggestions.length > 0 && (
        <ul className="grid h-fit mt-1 px-4 py-2 rounded-sm absolute top-0 bg-slate-850 w-max min-w-36 primary-shadow border-amber-100 border">
          {suggestions.map((tailwindClass, index) => (
            <li
              key={`${tailwindClass}-${index}`}
              className={clsx(`cursor-pointer hover:text-amber-200`, {
                "text-amber-200": index === activeIndex,
              })}
              onMouseDown={() => addTailwindClass(tailwindClass)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {tailwindClass}
            </li>
          ))}
          <small className="absolute inset-x-[85%] -inset-1 text-slate-400">
            esc
          </small>
        </ul>
      )}
    </div>,
    document.body
  );
};

export default ClassHelper;
