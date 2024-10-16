export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: string
) => {
  let BMR;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return Math.round(BMR); // Arrondir à l'entier le plus proche
};

export const calculateTDEE = (BMR: number, activityLevel: number) => {
  const TDEE = BMR * activityLevel;
  return Math.round(TDEE); // Arrondir à l'entier le plus proche
};

export const calculateMacros = async (
  weight: number,
  objectif: number
): Promise<{ proteine: number; lipide: number; glucide: number }> => {
  const proteine = 2 * weight;

  const lipide = Math.round((30 * (objectif / 100)) / 9);

  const glucide = Math.round((objectif - (proteine * 4 + lipide * 9)) / 4);

  return { proteine, lipide, glucide };
};
