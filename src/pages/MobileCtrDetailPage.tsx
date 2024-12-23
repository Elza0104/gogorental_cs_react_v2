import {
  Box,
  Pagination,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  TextField,
  Link,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import {
  getAxios,
  findAxios,
  postAxios,
  bikeReturnAxios,
} from "../hooks/Axiosinstance";
import Layout from "../component/layout/main";
import CallIcon from "@mui/icons-material/Call";
import { useNavigate } from "react-router-dom";
import { SingleBtnDialog } from "../component/basic/dialog/singleBtnDialog";
import { useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { DoubleBtnDialog } from "../component/basic/dialog/doubleBtnDialog";

const Grouplogo = require("../assets/img/Group.png");

export type selectedType = {
  contNm: string;
  phoneNo: string;
  contStartTime: string;
  contEndTime: string;
  brandNm: string;
  modelNm: string;
  bikeNo: string;
  birthDate: string;
  licenseNo: string;
  outTime?: string;
  inTime?: string;
  amount: string;
  payDate: string;
  cardCompany: string;
  outMemoId?: string;
  inMemoId?: string;
  contStat: string;
  photoInfo: {};
};

export type memoType = {
  writer: string;
  memo: string;
  writingDtm: string;
};

const MobileCtrDetailPage = () => {
  const [rentalPopup, setRentalPopup] = useState<boolean>(false);
  const [rentalSuccessPopup, setRentalSuccessPopup] = useState<boolean>(false);
  const [memoPopup, setMemoPopup] = useState<boolean>(false);
  const [memoLength, setMemoLength] = useState("0");
  const [memo, setMemo] = useState("");
  const [loadedMemo, setLoadedMemo] = useState<memoType>();
  const [contId, setContId] = useState("");
  const [brandNm, setBrandNm] = useState("");
  const [modelNm, setModelNm] = useState("");
  const [bikeNo, setBikeNo] = useState("");
  const [frontPhoto, setFrontPhoto] = useState("");
  const [backPhoto, setBackPhoto] = useState("");
  const [leftPhoto, setLeftPhoto] = useState("");
  const [rightPhoto, setRightPhoto] = useState("");
  const [bikeCtrData, setBikeCtrData] = useState<selectedType>();
  const navigate = useNavigate();
  const location = useLocation();
  const memoFn = (e: any) => {
    setMemoLength(e.target.value.length);
    setMemo(e.target.value);
  };
  if (window.sessionStorage.getItem("accessToken") == null) {
    navigate("/");
  }
  
  const onClickBtn = () => {
    navigate(-1);
  };
  useEffect(() => {
    //console.log(location)
    const id = location.state.id;
    setContId(id);
    ctrLoading(id);
  }, []);
  const ctrLoading = async (id: any) => {
    if(id != null && id != undefined) {
      try {
        let userData = await getAxios(`admin/cont/detail?contId=${id}`);
        const response = userData.data.body;
        if (userData.data.header.resultStatus === 200) {
          setBikeCtrData(response);
          //console.log(response);
          setBrandNm(response?.brandNm);
          setModelNm(response?.modelNm);
          setBikeNo(response?.bikeNo);
          console.log(response?.photoInfo[0]);
          console.log(response?.photoInfo.length);
          if (
            response.photoInfo[0].photoPath != null &&
            response.photoInfo[0].photoPath != undefined
          ) {
            setFrontPhoto(response.photoInfo[0].photoPath);
          }
          if (
            response.photoInfo[1].photoPath != null &&
            response.photoInfo[0].photoPath != undefined
          ) {
            setBackPhoto(response.photoInfo[1].photoPath);
          }
          if (
            response.photoInfo[2].photoPath != null &&
            response.photoInfo[0].photoPath != undefined
          ) {
            setLeftPhoto(response.photoInfo[2].photoPath);
          }
          if (
            response.photoInfo[3].photoPath != null &&
            response.photoInfo[0].photoPath != undefined
          ) {
            setRightPhoto(response.photoInfo[3].photoPath);
          }
          // for(let i=0; response?.photoInfo.length; i++){
          //   if(i=0){
  
          //   }
          // }
        } else setBikeCtrData(undefined);
      } catch (err: any) {
        ////console.log(err)
      }
    }
    
  };
  const bikeReturn = () => {
    const id = location.state.id;
    navigate("./return", {
      state: {
        id: id,
        brandNm: brandNm,
        modelNm: modelNm,
        bikeNo: bikeNo,
        memo: memo,
      },
    });
  };
  const memoPopupFn = async (e: any) => {
    setMemoPopup(true);
  };
  const bikeRental = async () => {
    setRentalSuccessPopup(true);
    try {
      let userData = await postAxios(
        `admin/cont/bike-out?contId=${contId}&memo=${memo}`
      );
      if (userData.data.header.resultStatus === 200) {
        setRentalSuccessPopup(true);
      }
    } catch (err) {
      ////console.log(err)
    }
  };
  function contFn(e: any) {
    if (e == "DRIVING") {
      bikeReturn();
    } else if (e == "RETURN") {
    } else if (e == "NOT_RETURN") {
      bikeReturn();
    } else if (e == "WAITING") {
      setRentalPopup(true);
    } else {
    }
  }
  const convertPrice = (e: any) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
  };
  function convertTime(date: any, isSecond: any) {
    if (date != undefined) {
      let sd = new Date(date);
      const year = sd.getFullYear();
      const month = ("0" + (sd.getMonth() + 1)).slice(-2);
      const day = ("0" + sd.getDate()).slice(-2);
      const hour = ("0" + sd.getHours()).slice(-2);
      const minute = ("0" + sd.getMinutes()).slice(-2);
      const second = ("0" + sd.getSeconds()).slice(-2);
      const dateStr = `${year}.${month}.${day} ${hour}:${minute}`;
      if (isSecond) {
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      }
      return dateStr;
    }
    return "";
  }
  function convertPhone(target: any) {
    return target
      .replace(/[^0-9]/g, "")
      .replace(
        /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
        "$1-$2-$3"
      );
  }
  const closeMemo = () => {
    setMemoPopup(false);
    setLoadedMemo({
      writer: "",
      memo: "",
      writingDtm: "",
    });
  };
  const loadoutMemo = async (memoId: any) => {
    try {
      const memo = await getAxios(`admin/cont/memo?memoId=${memoId}`);
      if (memo.data.header.resultStatus === 200) {
        const array = {
          writer: memo.data.body.writer,
          writingDtm: memo.data.body.writingDtm,
          memo: memo.data.body.memo,
        };
        console.log(array);
        setLoadedMemo(array);
      }
    } catch (err: any) {
      ////console.log(err)
    }
    setMemoPopup(true);
  };
  function exitCtrDetail() {
    navigate("/mobile");
  }
  return (
    <Layout>
      {/* <Dialog open={rentalPopup} PaperProps={{ sx: { borderRadius: "15px" } }}>
        <Box p={3}>
          <Box display={"flex"} justifyContent={"center"}>
            <Typography
              fontSize={"1.1rem"}
              className={"bold"}
            >
              이륜차를 출고하시겠습니까?
            </Typography>
          </Box>
          <Box p={2} my={2} borderRadius={"5px"} border="1px solid #B2B2B2" >
            <Box display={"flex"} justifyContent={"center"}>
              <Typography fontSize={"1.1rem"}>
                DNA모터스 {"/"} eCITI
              </Typography> 
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography className={"bold"} fontSize={"1.1rem"}>
                서울종로자1234
              </Typography>  
            </Box>
          </Box>
          <Box mt={1} display={"flex"} justifyContent={"space-between"}>
            <Button onClick={() => setRentalPopup(false)} 
              sx={{
                backgroundColor: "#E0E0E0",
                width: "48%",
                height: "45px",
                borderRadius: "7px"
              }}
            >
              <Typography color="black">
                취소
              </Typography>
            </Button>
            <Button onClick={() => bikeRental()} 
              variant="contained"
              sx={{
                width: "48%",
                height: "45px",
                borderRadius: "7px"
              }}
            >
              <Typography>
                출고
              </Typography>
            </Button>
          </Box>
        </Box>
      </Dialog> */}
      <DoubleBtnDialog
        open={rentalPopup}
        setOpen={setRentalPopup}
        btn1text="취소"
        btn2text="출고"
        btn1Fn={() => setRentalPopup(false)}
        btn2Fn={bikeRental}
        children={
          <Box>
            <Box display={"flex"} justifyContent={"center"} mt={2}>
              <Typography fontSize={"1.1rem"} className={"bold"}>
                이륜차를 출고하시겠습니까?
              </Typography>
            </Box>
            <Box
              mt={2}
              mx={5.5}
              py={1.3}
              borderRadius={"10px"}
              border="0.5px solid #B2B2B2"
            >
              <Box display={"flex"} justifyContent={"center"}>
                <Typography fontSize={"1.1rem"} color={"#666666"}>
                  DNA모터스 {"/"} eCITI
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography className={"bold"} fontSize={"1.1rem"}>
                  서울종로자1234
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={rentalSuccessPopup}
        btntext="확인"
        btnFn={() => {
          setRentalSuccessPopup(false);
          exitCtrDetail();
        }}
        children={
          <Box pt={0}>
            <Box display={"flex"} justifyContent={"center"} mb={1}>
              <Typography fontSize={"1.2rem"} className={"bold"}>
                출고완료
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography color={"#999999"}>
                이륜차 출고가 완료되었습니다.
              </Typography>
            </Box>
            {/* <Button onClick={() => exitCtrDetail()} 
          variant="contained"
          fullWidth
          sx={{
            height: "45px",
            borderRadius: "7px"
          }}
        >
          <Typography>
            확인
          </Typography>
        </Button> */}
          </Box>
        }
      />
      <Dialog open={memoPopup} maxWidth="xl">
        <Box width="310px">
          <Box m={3}>
            <Box>
              <Typography fontSize="18px" fontWeight={"600"}>
                메모 내용
              </Typography>
            </Box>

            <Box display={"flex"} justifyContent={"space-between"} mt={0.5}>
              <Typography color="#A0A0A0" fontWeight={"400"} fontSize={"14px"}>
                작성자 | {loadedMemo?.writer}
              </Typography>
              <Typography color="#A0A0A0" fontWeight={"400"} fontSize={"14px"}>
                {convertTime(loadedMemo?.writingDtm, false)}
              </Typography>
            </Box>
            <Box borderBottom={"1px solid #E7E7E7"} mt={1} mx={-0.5}></Box>
            <Typography mt={1} fontWeight={"400"} fontSize={"14px"}>
              {loadedMemo?.memo}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"} mb={2}>
            <Button
              variant="outlined"
              onClick={() => {
                closeMemo();
              }}
              sx={{
                width: "110px",
                height: "30px",
                borderRadius: "15.5px",
              }}
            >
              <Typography>닫기</Typography>
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Box my={2} display={"flex"}>
        <Box width="15%">
          <ChevronLeftIcon onClick={onClickBtn} fontSize="large" />
        </Box>
        <Box
          width="85%"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={-4}
        >
          <Typography fontSize={"1.2rem"}>예약내역 상세</Typography>
        </Box>
      </Box>

      {bikeCtrData ? (
        <Box mx={3}>
          <Typography className="bold" fontSize={"1.3rem"}>
            예약정보
          </Typography>
          <Box display="flex" mb={2} mt={3}>
            <Box width="100px">
              <Typography fontSize="0.95rem">예약자 이름</Typography>
            </Box>
            <Typography fontSize="0.95rem">{bikeCtrData.contNm}</Typography>
          </Box>
          <Box display="flex" mb={2}>
            <Box width="100px">
              <Typography fontSize="0.95rem">휴대폰번호</Typography>
            </Box>
            <Typography fontSize="0.95rem">
              {convertPhone(bikeCtrData.phoneNo)}
            </Typography>
            <Link href={`tel:${bikeCtrData.phoneNo}`} ml={2}>
              <Button
                startIcon={<CallIcon />}
                variant="outlined"
                sx={{
                  marginY: "-3px",
                  borderRadius: "20px",
                  width: "70px",
                }}
                size="small"
              >
                <Typography fontSize="0.8rem" letterSpacing={"-1px"}>
                  통화
                </Typography>
              </Button>
            </Link>
          </Box>
          <Box display="flex" mb={2}>
            <Box width="100px">
              <Typography fontSize="0.95rem">대여일시</Typography>
            </Box>
            <Typography fontSize="0.95rem" letterSpacing={"-1px"}>
              {convertTime(bikeCtrData.contStartTime, false)} ~{" "}
              {convertTime(bikeCtrData.contEndTime, false)}
            </Typography>
          </Box>
          <Box display="flex" mb={2}>
            <Box width="100px">
              <Typography fontSize="0.95rem">제조사/모델명</Typography>
            </Box>
            <Typography fontSize="0.95rem">
              {bikeCtrData.brandNm} / {bikeCtrData.modelNm}
            </Typography>
          </Box>
          <Box display="flex" mb={2}>
            <Box width="100px">
              <Typography fontSize="0.95rem">차량번호</Typography>
            </Box>
            <Typography fontSize="0.95rem">{bikeCtrData.bikeNo}</Typography>
          </Box>
          <Box borderBottom="1px solid #F6F6F6" mb={3} />
          <Box>
            <Typography className="bold" fontSize={"1.3rem"}>
              운전면허증 정보
            </Typography>
            <Box display="flex" mb={2} mt={3}>
              <Box width="100px">
                <Typography fontSize="0.95rem">생년월일</Typography>
              </Box>
              <Typography fontSize="0.95rem">
                {bikeCtrData.birthDate}
              </Typography>
            </Box>
            <Box display="flex" mb={2}>
              <Box width="100px">
                <Typography fontSize="0.95rem">면허증 번호</Typography>
              </Box>
              <Typography fontSize="0.95rem">
                {bikeCtrData.licenseNo}
                {/* .replace(/(\d{2})(\d{2})(\d{6})(\d{2})/, "$1-$2-$3-$4") */}
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #F6F6F6" mb={3} />
          <Box>
            {bikeCtrData.outTime ? (
              <Box>
                {bikeCtrData.contStat == "DRIVING" ? (
                  <Typography className="bold" fontSize={"1.3rem"}>
                    출고정보
                  </Typography>
                ) : bikeCtrData.contStat == "NOT_RETURN" ? (
                  <Typography className="bold" fontSize={"1.3rem"}>
                    출고 정보
                  </Typography>
                ) : bikeCtrData.contStat == "RETURN" ? (
                  <Typography className="bold" fontSize={"1.3rem"}>
                    출고/반납 정보
                  </Typography>
                ) : (
                  <></>
                )}

                <Box display="flex" mb={2} mt={3}>
                  <Box width="100px">
                    <Typography fontSize="0.95rem">출고일시</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent={"space-between"}
                    width={"65%"}
                  >
                    <Typography fontSize="0.875rem">
                      {convertTime(bikeCtrData.outTime, false)}
                    </Typography>
                    <Box>
                      {bikeCtrData.outMemoId ? (
                        <Box>
                          <Button
                            onClick={() => {
                              loadoutMemo(bikeCtrData.outMemoId);
                            }}
                            variant="contained"
                            sx={{
                              marginY: "-3px",
                              borderRadius: "14px",
                              width: "70px",
                            }}
                            size="small"
                          >
                            <Typography fontSize={" 0.75rem"}>
                              메모보기
                            </Typography>
                          </Button>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {bikeCtrData.inTime ? (
                    <Box display="flex" mb={2} mt={3}>
                      <Box width="100px">
                        <Typography fontSize="0.95rem">반납일시</Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent={"space-between"}
                        width={"65%"}
                      >
                        <Typography fontSize="0.875rem">
                          {convertTime(bikeCtrData.inTime, false)}
                        </Typography>
                        <Box>
                          {bikeCtrData.inMemoId ? (
                            <Box>
                              <Button
                                onClick={() => {
                                  loadoutMemo(bikeCtrData.inMemoId);
                                  setMemoPopup(true);
                                }}
                                variant="contained"
                                sx={{
                                  marginY: "-3px",
                                  borderRadius: "14px",
                                  width: "70px",
                                }}
                                size="small"
                              >
                                <Typography fontSize={" 0.75rem"}>
                                  메모보기
                                </Typography>
                              </Button>
                            </Box>
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
                {frontPhoto ? (
                  <Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mt={3.7}
                    >
                      <Box width={"48%"}>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Typography fontSize={"0.9375rem"} mb={1}>
                            앞면
                          </Typography>
                        </Box>
                        <Box
                          border={"1px dotted #999999"}
                          borderRadius={"10px"}
                        >
                          <Box>
                            <Box
                              height={"155px"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_CLIENT_URL + frontPhoto
                                }
                                alt="Uploaded preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box width={"48%"}>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Typography fontSize={"0.9375rem"} mb={1}>
                            뒷면
                          </Typography>
                        </Box>
                        <Box
                          border={"1px dotted #999999"}
                          borderRadius={"10px"}
                        >
                          <Box>
                            <Box
                              height={"155px"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_CLIENT_URL + backPhoto
                                }
                                alt="Uploaded preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mt={2.5}
                    >
                      <Box width={"48%"}>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Typography fontSize={"0.9375rem"} mb={1}>
                            좌측면
                          </Typography>
                        </Box>
                        <Box
                          border={"1px dotted #999999"}
                          borderRadius={"10px"}
                        >
                          <Box>
                            <Box
                              height={"155px"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_CLIENT_URL + leftPhoto
                                }
                                alt="Uploaded preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box width={"48%"}>
                        <Box display={"flex"} justifyContent={"center"}>
                          <Typography fontSize={"0.9375rem"} mb={1}>
                            우측면
                          </Typography>
                        </Box>
                        <Box
                          border={"1px dotted #999999"}
                          borderRadius={"10px"}
                        >
                          <Box>
                            <Box
                              height={"155px"}
                              display={"flex"}
                              justifyContent={"center"}
                            >
                              <img
                                src={
                                  process.env.REACT_APP_CLIENT_URL + rightPhoto
                                }
                                alt="Uploaded preview"
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <></>
                )}
                <Box borderBottom="1px solid #F6F6F6" mt={5} mb={5} />
              </Box>
            ) : (
              <></>
            )}
          </Box>
          <Box>
            <Typography className="bold" fontSize={"1.3rem"}>
              결제정보
            </Typography>
            <Box display="flex" mb={2} mt={3}>
              <Box width="100px">
                <Typography fontSize="0.95rem">결제금액</Typography>
              </Box>
              <Typography fontSize="0.95rem">
                {convertPrice(bikeCtrData.amount)}
              </Typography>
            </Box>
            <Box display="flex" mb={2} mt={3}>
              <Box width="100px">
                <Typography fontSize="0.95rem">결제일시</Typography>
              </Box>
              <Typography fontSize="0.95rem">
                {convertTime(bikeCtrData.payDate, true)}
              </Typography>
            </Box>
            <Box display="flex" mb={2} mt={3}>
              <Box width="100px">
                <Typography fontSize="0.95rem">결제방법</Typography>
              </Box>
              <Typography fontSize="0.95rem">
                신용카드({bikeCtrData.cardCompany},일시불)
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #F6F6F6" mb={3} />
          <Box>
            {bikeCtrData.contStat == "RETURN" ? (
              <></>
            ) : (
              <Box>
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"flex-end"}
                  mb={1}
                >
                  <Typography className="bold" fontSize={"1.3rem"}>
                    메모
                  </Typography>
                  {bikeCtrData.contStat == "DRIVING" ? (
                    <Typography color={"#B2B2B2"} fontSize={"0.97rem"}>
                      * 반납관련 특이사항 등
                    </Typography>
                  ) : bikeCtrData.contStat == "NOT_RETURN" ? (
                    <Typography color={"#B2B2B2"} fontSize={"0.97rem"}>
                      * 반납관련 특이사항 등
                    </Typography>
                  ) : bikeCtrData.contStat == "WAITING" ? (
                    <Typography color={"#B2B2B2"} fontSize={"0.97rem"}>
                      * 출고관련 특이사항 등
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Box>
                <TextField
                  id="memo"
                  multiline
                  fullWidth
                  color="info"
                  sx={{
                    maxHeight: "170px",
                  }}
                  onChange={(e) => memoFn(e)}
                  rows={5}
                  inputProps={{ maxLength: 200, style: { borderRadius: 5 } }}
                ></TextField>
                <Box display="flex" justifyContent="flex-end">
                  <Typography color="#B2B2B2">{memoLength}/200자</Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box display="flex" justifyContent="center" mt={14} mb={3}>
            {bikeCtrData.contStat == "RETURN" ? (
              <></>
            ) : (
              <Box position="fixed" bottom={30} width="90%">
                <Box sx={{ backgroundColor: "white" }}>
                  <Button
                    id="13"
                    fullWidth
                    onClick={() => contFn(bikeCtrData.contStat)}
                    variant={
                      bikeCtrData.contStat == "RETURN"
                        ? "outlined"
                        : "contained"
                    }
                    color={
                      bikeCtrData.contStat == "DRIVING"
                        ? "success"
                        : bikeCtrData.contStat == "NOT_RETURN"
                        ? "warning"
                        : bikeCtrData.contStat == "WAITING"
                        ? "primary"
                        : "error"
                    }
                    sx={{ borderRadius: "10px", height: "60px" }}
                  >
                    <Typography fontSize="1.1rem">
                      {bikeCtrData.contStat == "DRIVING"
                        ? "반납사진 등록"
                        : bikeCtrData.contStat == "NOT_RETURN"
                        ? "반납사진 등록"
                        : bikeCtrData.contStat == "WAITING"
                        ? "출고"
                        : "error"}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box mt={6}>
          <Box display={"flex"} alignItems="center" justifyContent={"center"}>
            <img src={Grouplogo} width={"113px"}></img>
          </Box>
          <Box
            mt={1}
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography
              color={"#444444"}
              fontSize={"1.25rem"}
              fontWeight={"700"}
            >
              비정상적인 계약 입니다.
            </Typography>
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default MobileCtrDetailPage;
