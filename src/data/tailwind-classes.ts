// base configuration
const config = {
  colors: [
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
  ],
  shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
  sizes: [
    "0",
    "0.5",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "8",
    "10",
    "12",
    "16",
    "20",
    "24",
    "32",
    "40",
    "48",
    "56",
    "64",
    "72",
    "80",
    "96",
  ],
  prefixes: ["", "hover:", "focus:", "active:", "disabled:", "dark:"],
  spacing: [
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pr",
    "pl",
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "mr",
    "ml",
  ], // padding a margin
  flexbox: [
    "flex",
    "flex-row",
    "flex-col",
    "items-center",
    "justify-center",
    "space-x",
    "space-y",
  ],
  grid: ["grid", "grid-cols", "gap"],
  typography: ["text", "font", "tracking", "leading"],
  layout: ["w", "h", "min-w", "min-h", "max-w", "max-h"],
} as const;

// helpers generator
const generateColorClasses = (): string[] => {
  const classes: string[] = [];

  for (const prefix of config.prefixes) {
    for (const color of config.colors) {
      // skip white and black
      /*if (color === "black" || color === "white") {
        classes.push(`${prefix}${color}`);
        continue;
      }*/

      for (const shade of config.shades) {
        classes.push(`${prefix}text-${color}-${shade}`);
        classes.push(`${prefix}bg-${color}-${shade}`);
        classes.push(`${prefix}border-${color}-${shade}`);
      }
    }
  }

  return classes;
};

const generateSpacingClasses = (): string[] => {
  const classes: string[] = [];

  for (const prefix of config.prefixes) {
    for (const space of config.spacing) {
      for (const size of config.sizes) {
        classes.push(`${prefix}${space}-${size}`);
      }
    }
  }

  return classes;
};

const generateLayoutClasses = (): string[] => {
  const classes: string[] = [];
  const fractions = [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
  ];

  for (const prefix of config.prefixes) {
    for (const layout of config.layout) {
      // Přidat základní velikosti
      for (const size of config.sizes) {
        classes.push(`${prefix}${layout}-${size}`);
      }

      // Přidat zlomky
      for (const fraction of fractions) {
        classes.push(`${prefix}${layout}-${fraction}`);
      }

      // Přidat speciální hodnoty
      classes.push(`${prefix}${layout}-full`);
      classes.push(`${prefix}${layout}-screen`);
      classes.push(`${prefix}${layout}-auto`);
    }
  }

  return classes;
};

const generateFlexGridClasses = (): string[] => {
  const classes: string[] = [];

  // Flexbox
  for (const prefix of config.prefixes) {
    for (const flex of config.flexbox) {
      classes.push(`${prefix}${flex}`);

      // Pro space-x a space-y přidat velikosti
      if (flex.startsWith("space-")) {
        for (const size of config.sizes) {
          classes.push(`${prefix}${flex}-${size}`);
        }
      }
    }
  }

  // Grid
  const gridCols = ["1", "2", "3", "4", "5", "6", "12"];
  for (const prefix of config.prefixes) {
    for (const col of gridCols) {
      classes.push(`${prefix}grid-cols-${col}`);
    }

    for (const size of config.sizes) {
      classes.push(`${prefix}gap-${size}`);
    }
  }

  return classes;
};

// Hlavní funkce pro generování všech tříd
const generateAllTailwindClasses = (): string[] => {
  const allClasses = [
    ...generateColorClasses(),
    ...generateSpacingClasses(),
    ...generateLayoutClasses(),
    ...generateFlexGridClasses(),
  ];

  // Odstranění duplicit
  return [...new Set(allClasses)].sort();
};

// Funkce pro filtrování tříd podle předpony
/*function filterClassesByPrefix(classes: string[], prefix: string): string[] {
  return classes.filter((cls) =>
    cls.toLowerCase().startsWith(prefix.toLowerCase())
  );
}*/

// Příklad použití:
//const allClasses = generateAllTailwindClasses();
// Pro našeptávač můžeme filtrovat podle začátku psaní
//const textClasses = filterClassesByPrefix(allClasses, "text-");
//const bgClasses = filterClassesByPrefix(allClasses, "bg-");
//const hoverClasses = filterClassesByPrefix(allClasses, "hover:");

export const tailwindClassesList = generateAllTailwindClasses();

export const filterTailwindClasses = (input: string): string[] => {
  if (!input) return [];

  const lowerCaseInput = input.toLowerCase();
  const matches = tailwindClassesList.filter((cl) =>
    cl.toLowerCase().includes(lowerCaseInput)
  );

  const startsWithMatches = matches.filter((cl) =>
    cl.toLocaleLowerCase().startsWith(lowerCaseInput)
  );
  const containsMatches = matches.filter(
    (cl) => !cl.toLowerCase().startsWith(lowerCaseInput)
  );

  return [...startsWithMatches, ...containsMatches].slice(0, 10);
};
