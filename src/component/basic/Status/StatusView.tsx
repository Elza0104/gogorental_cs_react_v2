import {
  Box, Pagination, Button, Checkbox,
  FormControl, InputLabel, Select, MenuItem,
  Typography, Dialog, IconButton, ImageList, ImageListItem
} from "@mui/material";

export interface BikeStatusViewProps{
  label: string;
}

export const BikeStatusView = (label: BikeStatusViewProps) => {
  const convertLabel = (e: any) => {
    if(e == 'd'){
      return '운행중'
    }
    else if(e == 'h'){
      return '대기'
    }
  } 
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"5.4vh"}>
      <Box width="120px" 
        sx={{backgroundColor: {}}} 
        height="40px" 
        display={"flex"} 
        alignItems={"center"} 
        justifyContent={"center"}
        borderRadius={"5px"}
        
      >
        <Typography>
          {convertLabel(label)}
        </Typography>
      </Box>
    </Box>
  )
}
