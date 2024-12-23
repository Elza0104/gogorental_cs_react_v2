import React, {ReactNode, useState} from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";


export interface SingleBtnDialogProps{
  open: boolean;
  setOpen?: Function;
  btntext: string;
  btnFn: Function;
  children?: ReactNode;
  onClick?: ()  => void;
}

export const SingleBtnDialog =({
  open,
  setOpen,
  btntext,
  btnFn,
  children,
  ...props
}: SingleBtnDialogProps) =>{
  const handleFn = () => {
    btnFn();
  };
  return (
    <Dialog {...props} open={open} PaperProps={{ sx: { borderRadius: "15px" } }}>
      <Box  m={2}>
        <Box mb={4} mt={2}>
          {children}
        </Box>
        <Box display="flex">
          <Button
            fullWidth
            variant="contained"
            onClick={handleFn}
            size={"large"}
            
            sx={{
              height: "60px",
              borderRadius: "9px"
            }}
          >
            <Typography color="white" py={1} fontFamily={"Pretendard"} fontSize="1.125rem" fontWeight={"600"}>
              {btntext}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}