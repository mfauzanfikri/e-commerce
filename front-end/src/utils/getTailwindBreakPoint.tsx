const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const getTailwindBreakPoint = (bp: "sm" | "md" | "lg" | "xl" | "2xl") => {
  return breakPoints[bp];
};

export default getTailwindBreakPoint;
