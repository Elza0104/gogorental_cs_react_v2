import React, {ReactNode, useState} from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";


export interface DoubleBtnDialogProps{
  open: boolean;
  setOpen: Function;
  btn1text: string;
  btn2text: string;
  btn1Fn: Function;
  btn2Fn: Function;
  children?: ReactNode;
  onClick?: ()  => void;
}

export const DoubleBtnDialog =({
  open,
  setOpen,
  btn1text,
  btn2text,
  children,
  btn1Fn,
  btn2Fn,
  ...props
}: DoubleBtnDialogProps) =>{
  const handleFn = () => {
    btn1Fn();
  };
  const closeFn = () => {
    if(!isBtnDisabled){
      setBtnDisabled(false);
      btn2Fn();
    }
  };
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  return (
    <Dialog {...props} open={open} PaperProps={{ sx: { borderRadius: "15px" } }}>
      <Box width="310px" height="240px" >
      <Box textAlign="center" p={1.5} pb={0}>
        {children}
      </Box>
      <Box display="flex" m={1.7} mt={2.5} justifyContent={"space-between"}>
        <Button onClick={handleFn} 
          variant="contained"
          color="info"
          sx={{
            backgroundColor: "#D9D9D9",
            width: "48%",
            height: "60px",
            borderRadius: "13px"
          }}
        >
          <Typography>
            {btn1text}
          </Typography>
        </Button>
        <Button onClick={closeFn} 
          variant="contained"
          sx={{
            width: "48%",
            height: "60px",
            borderRadius: "13px"
          }}
        >
          <Typography>
          {btn2text}
          </Typography>
        </Button>
      </Box>
    </Box>
    </Dialog>
  )
}