import {
  Box,
  Pagination,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Dialog,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAxios, postAxios, bikeReturnAxios } from "../hooks/Axiosinstance";
import { formatDateTime } from "../util";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export type ctrDataType = {
  id: number;
  agencyName: string;
  ctrStartTime: string;
  ctrEndTime: string;
  contractStatus: string;
  customerName: string;
  customerPhone: string;
  bikeBrand: string;
  bikeModel: string;
  bikeNumber: string;
  ssn: string;
  licenseNumber: string;
  outTime: string;
  inTime: string;
  outMemo: string;
  inMemo: string;
  outPhotos: {};
  inPhotos: {};
};

const CtrDetailPage = () => {
  const [ctrdata, setCtrdata] = useState<ctrDataType>();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    ctrLoading(location.state.id);
  }, []);
  const ctrLoading = async (id: any) => {
    try {
      await getAxios(`agency/contractDetail?contractId=${id}`).then(
        (response) => {
          console.log(response.data.data);
          const array = response.data.data;
          setCtrdata(array);
        }
      );
    } catch (err: any) {
      console.log(err);
    }
  };

  const backToMain = () => {
    navigate("/main")
  }

  return (
    <Box maxWidth={"1000px"} margin={"0px auto"} fontFamily={"Pretendard"}>
      {ctrdata ? (
        <Box>
        <Box display="flex" justifyContent="center">
        <Box
          fontWeight={700}
          fontSize={24}
          p={2}
          justifyContent={"center"}
          display={"flex"}
        >
          예약 상세보기
        </Box>
      </Box>
      <Box fontWeight={600} fontSize={20} mb={2}>
        예약정보
      </Box>
      <Box>
        <Box display="flex" fontWeight={500} fontSize={15}>
          <Box mr={6}>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>예약자명</Box>
              <Box>{ctrdata?.customerName}</Box>
            </Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>제조사 / 모델명</Box>
              <Box>
                {ctrdata?.bikeBrand} / {ctrdata?.bikeModel}
              </Box>
            </Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>대여시작일시</Box>
              <Box>{formatDateTime(ctrdata?.ctrStartTime)}</Box>
            </Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>대여종료일시</Box>
              <Box>{formatDateTime(ctrdata?.ctrEndTime)}</Box>
            </Box>
          </Box>
          <Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>휴대폰번호</Box>
              <Box>{ctrdata?.customerPhone}</Box>
            </Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>센터명</Box>
              <Box>{ctrdata?.agencyName}</Box>
            </Box>
            <Box display={"flex"} pt={2}>
              <Box width={"150px"}>차량번호</Box>
              <Box>{ctrdata?.bikeNumber}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button color="secondary" variant="outlined" onClick={backToMain}>
        돌아가기
      </Button>
      </Box>
      )
      :
      <Box></Box>

      }
    </Box>
  );
};

export default CtrDetailPage;
