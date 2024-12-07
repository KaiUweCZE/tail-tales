import { Colors, Shade, TextColor } from "./types";

export const isValidColor = (color: string): color is Colors => {
  const validColors: readonly string[] = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ] as const;

  return validColors.includes(color);
};

export const isValidShade = (shade: string): shade is Shade => {
  const validShades: readonly string[] = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ] as const;

  return validShades.includes(shade);
};

export const isTextColor = (value: string): value is TextColor => {
  const parts = value.split("-");
  if (parts.length !== 3) return false;
  if (parts[0] !== "text") return false;

  return isValidColor(parts[1]) && isValidShade(parts[2]);
};
