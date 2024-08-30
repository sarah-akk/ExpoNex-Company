import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(Box)(({ ownerState }) => {
  const {
    variant = "contained",
    bgColor = "transparent",
    color = "dark",
    opacity = 1,
    borderRadius = "10px",
    shadow = "none",
    coloredShadow = "none",
  } = ownerState;

  const greyColors = {
    "grey-100": "#f5f5f5",
    "grey-200": "#eeeeee",
    "grey-300": "#e0e0e0",
    "grey-400": "#bdbdbd",
    "grey-500": "#9e9e9e",
    "grey-600": "#757575",
    "grey-700": "#616161",
    "grey-800": "#424242",
    "grey-900": "#212121",
  };

  const validGradients = [
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ];

  const validColors = [
    "transparent",
    "white",
    "black",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "grey-100",
    "grey-200",
    "grey-300",
    "grey-400",
    "grey-500",
    "grey-600",
    "grey-700",
    "grey-800",
    "grey-900",
  ];

  const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];

  let backgroundValue = bgColor;

  if (variant === "gradient") {
    backgroundValue = bgColor;
  } else if (validColors.includes(bgColor)) {
    backgroundValue = bgColor;
  } else {
    backgroundValue = bgColor;
  }

  let colorValue = color;

  if (validColors.includes(color)) {
    colorValue = greyColors[color] || color;
  }

  let borderRadiusValue = borderRadius;

  if (validBorderRadius.includes(borderRadius)) {
    borderRadiusValue = "15px";
  } else {
    borderRadiusValue = "10px";
  }

  let boxShadowValue = "none";

  if (validBoxShadows.includes(shadow)) {
    boxShadowValue = "2px 2px 4px 0px rgba(0,0,0,0.1)"; // Example boxShadow
  } else if (coloredShadow !== "none") {
    boxShadowValue = "4px 4px 8px 0px rgba(0,0,0,0.2)"; // Example boxShadow
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});
