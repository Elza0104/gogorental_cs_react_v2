import React, { ReactNode } from "react";
import { Button } from "@mui/material";

interface ButtonProps{
  primary?: "primary" | "secondary";
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string | ReactNode;
  textColor?: string;
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const BasicButton = ({
  primary = "primary",
  size = "medium",
  backgroundColor,
  label,
  textColor,
  fullWidth,
  disabled = false,
  variant = "contained",
  ...props
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      color={primary}
      fullWidth={fullWidth}
      disabled={disabled}
      size={size}
      style={{ height: 65, backgroundColor, color: textColor, fontWeight: 700, wordBreak: "keep-all", borderRadius: "20px"}}
      {...props}
    >
      {label}
    </Button>
  );
};