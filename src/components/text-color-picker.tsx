import useClickOutside from "@/hooks/useClickOutside";
import { isTextColor } from "@/types/type-guards";
import { type TextColor } from "@/types/types";
import Button from "@/ui/primitives/button";
import Input from "@/ui/primitives/input";
import { Palette } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";

const TextColorPicker = ({
  fontColor,
  setFontColor,
}: {
  fontColor: TextColor | null;
  setFontColor: Dispatch<SetStateAction<TextColor | null>>;
}) => {
  const [inputText, setInputText] = useState(fontColor ?? "");
  const {
    ref: containerRef,
    active,
    setActive,
  } = useClickOutside<HTMLDivElement>();

  const validateInput = (e: string) => {
    setInputText(() => e);

    if (e && isTextColor(e)) {
      setFontColor(e);
    }
  };

  return (
    <div ref={containerRef} className="relative z-50">
      <Button
        size="sm"
        variant="outline"
        rightIcon={<Palette className="h-3 w-3" />}
        onClick={() => setActive(!active)}
      >
        <span className={fontColor ?? ""}>Aa</span>
      </Button>
      {active && (
        <Input
          size="sm"
          className="absolute py-1"
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
