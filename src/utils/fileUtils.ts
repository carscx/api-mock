import fs from "fs";

export const readData = <T>(filePath: string): T[] => {
  try {
    const rawData = fs.readFileSync(filePath, "utf-8");
    return rawData ? JSON.parse(rawData) : [];
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return [];
  }
};

export const writeData = (filePath: string, data: unknown): void => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error al escribir en el archivo:", err);
  }
};
