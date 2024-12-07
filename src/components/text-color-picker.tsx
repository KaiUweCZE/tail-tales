import { FileContext } from "@/contexts/files-context";
import useClickOutside from "@/hooks/useClickOutside";
import { isTextColor } from "@/types/type-guards";
import Button from "@/ui/primitives/button";
import Input from "@/ui/primitives/input";
import { Palette } from "lucide-react";
import { useContext, useState } from "react";

const TextColorPicker = () => {
  const context = useContext(FileContext);
  const [inputText, setInputText] = useState("");
  const {
    ref: containerRef,
    active,
    setActive,
  } = useClickOutside<HTMLDivElement>();

  if (!context) return <span>Context is missing</span>;

  const { fontColor, setFontColor } = context;

  const validateInput = (e: string) => {
    setInputText(() => e);

    if (e && isTextColor(e)) {
      setFontColor(e);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Button
        size="sm"
        variant="outline"
        rightIcon={<Palette className="h-3 w-3" />}
        onClick={() => setActive(!active)}
      >
        <span className={fontColor}>Aa</span>
      </Button>
      {active && (
        <Input
          size="sm"
          className="absolute"
          variant="textColor"
          placeholder="text-amber-50 etc."
          value={inputText}
          onChange={(e) => validateInput(e.target.value)}
        />
      )}
    </div>
  );
};

export default TextColorPicker;
