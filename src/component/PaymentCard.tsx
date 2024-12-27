import React, { ReactNode } from "react";
import { Button, Box, Typography } from "@mui/material";

interface AgencyPayRecord {
  id: number;
  amount: number;
  tid: string;
  cardCompany: string;
  cardNumber: string;
}

type paymentValue = {
  id: string;
  amount: string;
  cardCompany: string;
  payDtm: string;
  ctrStartTime: string;
  ctrEndTime: string;
  insDtm: string;
  agencyPayRecordDTO2s: AgencyPayRecord[];

}

interface paymentCardProps {
  value?: paymentValue;
  idx: number;
}

export const PaymentCard = ({ value, idx }: paymentCardProps) => {
  console.log(value)
  return (
    <Box
      borderRadius={"15px"}
      border={"1px solid #000000"}
      marginTop={2}
      width={"270px"}
    >
      <Box m={3}>
        <Typography fontSize={"20px"} fontWeight={700}>
          {idx == 0 ? "최초 결제 내역" : "연장 결제 내역"}
        </Typography>
      </Box>
      <Typography>{value?.agencyPayRecordDTO2s[0].amount}</Typography>
    </Box>
  );
};
