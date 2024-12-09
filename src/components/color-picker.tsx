import useClickOutside from "@/hooks/useClickOutside";
import { isBgColor } from "@/types/type-guards";
import Button from "@/ui/primitives/button";
import Input from "@/ui/primitives/input";
import { Paintbrush } from "lucide-react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const ColorPicker = ({
  color,
  setColor,
}: {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}) => {
  console.log("Component rendering, before useState");

  const defaultValue = color ?? "bg-red-900";

  const [inputColor, setInputColor] = useState(defaultValue);

  useEffect(() => {
    console.log("useEffect running");
    console.log("color:", color);
    console.log("defaultValue:", defaultValue);
    console.log("inputColor:", inputColor);
  }, [color, defaultValue, inputColor]);
  //const [isValid, setIsValid] = useState(false);
  const {
    ref: colorRef,
    active,
    setActive,
  } = useClickOutside<HTMLDivElement>();

  console.log(color, "and", inputColor);

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    //const newColor = e.target.value;
    // setInputColor(() => newColor);

    //const isVerified = isBgColor(newColor);

    //setIsValid(isVerified);

    // if (isVerified) {
    //setColor(newColor);
    // }
    console.log(inputColor);
  };

  return (
    <div ref={colorRef} className="relative z-50">
      <Button
        size="sm"
        variant="outline"
        rightIcon={<Paintbrush className="h-3 w-3 " />}
        onClick={() => setActive(!active)}
      >
        <span className={`w-4 h-4 rounded-md ${color}`}></span>
      </Button>
      {active && (
        <Input
          size="sm"
          className="absolute py-1"
          variant="textColor"
          placeholder="bg-white etc."
          value={inputColor}
          onChange={(e) => handleChangeColor(e)}
        />
      )}
    </div>
  );
};

export default ColorPicker;
