import React, { FC } from "react";
import { Box } from "@mui/material";

type LayoutProps ={
  footerFlag?: boolean;
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return(
    <Box
      fontFamily={"Pretendard"}
      margin= "0px auto"
      minWidth = "360px"
      maxWidth = "500px"
      position = "relative"
      id="basicbox"
      width="100%"
      overflow={"auto"}
    >
      {children}
    </Box>
  )
}

export default Layout;