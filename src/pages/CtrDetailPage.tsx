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
import {
  formatBirthAll,
  formatDateTime,
  formatPhoneNumber,
  formatToCustomPattern,
} from "../util";
import { useMediaQuery } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PaymentCard } from "../component/PaymentCard";

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
  contractHistoryDTOS: [];
};

const CtrDetailPage = () => {
  const [ctrdata, setCtrdata] = useState<ctrDataType>();
  const location = useLocation();
  const navigate = useNavigate();
  const medium = useMediaQuery('(min-width:1300px');
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
    navigate("/main");
  };

  return (
    <Box
      maxWidth={"1000px"}
      minWidth={"1300px"}
      margin={"0px auto"}
      fontFamily={"Pretendard"}
      display="flex"
      justifyContent="center"
    >
      {ctrdata ? (
        <Box>
          <Box display="flex" justifyContent="center">
            <Box
              fontWeight={700}
              fontSize={24}
              p={2}
              mb={3}
              justifyContent={"center"}
              display={"flex"}
            >
              예약 상세보기
            </Box>
          </Box>
          <Box ml={-6}>
            <Box fontWeight={600} fontSize={22} mb={2}>
              예약정보
            </Box>
            <Box>
              <Box display="flex" fontWeight={500} fontSize={16}>
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
                    <Box>{formatPhoneNumber(ctrdata?.customerPhone)}</Box>
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
            <Box borderBottom={"1px solid #F6F6F6 "} my={3} />
          </Box>
          <Box ml={-6}>
            <Box fontWeight={600} fontSize={22} mb={2}>
              운전면허증 정보
            </Box>
            <Box>
              <Box display="flex" fontWeight={500} fontSize={16}>
                <Box mr={6}>
                  <Box display={"flex"} pt={2}>
                    <Box width={"150px"}>생년월일</Box>
                    <Box width={"150px"}>{formatBirthAll(ctrdata?.ssn)}</Box>
                  </Box>
                </Box>
                <Box>
                  <Box display={"flex"} pt={2}>
                    <Box width={"150px"}>면허증 번호</Box>
                    <Box>{formatToCustomPattern(ctrdata?.licenseNumber)}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box position={medium? "absolute" : "static"} top={30} right={40}>
            {ctrdata.contractHistoryDTOS?.map((val: any, idx: any) => {
              return(
                <PaymentCard value={val} idx={idx}></PaymentCard>
              )
            })
            }
          </Box>
          <Button color="secondary" variant="outlined" onClick={backToMain}>
            돌아가기
          </Button>
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};

export default CtrDetailPage;
