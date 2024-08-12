import path from "path";
import { fileURLToPath } from "url";

// Necesitas esta línea para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@controllers": path.resolve(__dirname, "src/controllers/"),
      "@middlewares": path.resolve(__dirname, "src/middlewares/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@data": path.resolve(__dirname, "src/data/")
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
