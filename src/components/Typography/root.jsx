import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export default styled(Typography)(({ ownerState }) => {
  const {
    color = "dark",
    textTransform = "none",
    verticalAlign = "unset",
    fontWeight = false,
    opacity = 1,
    textGradient = false,
  } = ownerState;

  const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  };

  const gradientStyles = () => ({
    backgroundImage: "linear-gradient(to right, #000000, #ffffff)", // Example gradient
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    position: "relative",
    zIndex: 1,
  });

  let colorValue = color === "dark" ? "#f0ca4c" : "#ffffff"; // Example colors

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight],
    ...(textGradient && gradientStyles()),
  };
});
