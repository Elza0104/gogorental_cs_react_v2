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
  styled,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
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
import { Input } from "@material-ui/core";
const imagelogo = require("../assets/img/gallery-add.png");

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
};

const MobileBikeReturnPage: React.FC = () => {
  const [rentalPopup, setRentalPopup] = useState<boolean>(false);
  const [rentalSuccessPopup, setRentalSuccessPopup] = useState<boolean>(false);
  const [bikeReturnPopup, setBikeReturnPopup] = useState<boolean>(false);
  const [bikeReturnedPopup, setBikeReturnedPopup] = useState<boolean>(false);
  const [notBikeReturnedPopup, setNotBikeReturnedPopup] =
    useState<boolean>(false);
  const [memoPopup, setMemoPopup] = useState<boolean>(false);
  const [frontImg, setFrontImg] = useState<File | null>(null);
  const [backImg, setBackImg] = useState<File | null>(null);
  const [leftImg, setLeftImg] = useState<File | null>(null);
  const [rightImg, setRightImg] = useState<File | null>(null);
  const [frontViewImg, setFrontViewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [backViewImg, setBackViewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [leftViewImg, setLeftViewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [rightViewImg, setRightViewImg] = useState<string | ArrayBuffer | null>(
    null
  );
  const [files, setFiles] = useState<FileList | null>(null);
  const [brandNm, setBrandNm] = useState("");
  const [modelNm, setModelNm] = useState("");
  const [bikeNo, setBikeNo] = useState("");
  const [memo, setMemo] = useState("");
  const [contId, setContId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  if (window.sessionStorage.getItem("accessToken") == null) {
    navigate("/");
  }

  useEffect(() => {
    //console.log(location)
    const id = location.state.id;
    const brandNm = location.state.brandNm;
    const modelNm = location.state.modelNm;
    const bikeNo = location.state.bikeNo;
    const memo = location.state.memo;
    setContId(id);
    setBrandNm(brandNm);
    setModelNm(modelNm);
    setBikeNo(bikeNo);
    setMemo(memo);
  }, []);

  const backToMain = () => {
    navigate("/mobile");
  };

  const saveImgFile = (fileBlob: any, side: any) => {
    if (fileBlob.target.files != null) {
      if (side == "front") {
        setFrontImg(fileBlob.target.files[0]);
      } else if (side == "back") {
        setBackImg(fileBlob.target.files[0]);
      } else if (side == "left") {
        setLeftImg(fileBlob.target.files[0]);
      } else if (side == "right") {
        setRightImg(fileBlob.target.files[0]);
      }
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob.target.files[0]);
      return new Promise((resolve) => {
        reader.onload = () => {
          if (side == "front") {
            setFrontViewImg(reader.result);
          } else if (side == "back") {
            setBackViewImg(reader.result);
          } else if (side == "left") {
            setLeftViewImg(reader.result);
          } else if (side == "right") {
            setRightViewImg(reader.result);
          } else {
            return;
          }
        };
      });
    }
  };
  const imgCheck = () => {
    if (
      frontImg != null &&
      backImg != null &&
      leftImg != null &&
      rightImg != null
    ) {
      setBikeReturnPopup(true);
    } else {
      setNotBikeReturnedPopup(true);
    }
  };
  const bikeReturn = async () => {
    const formData1 = new FormData();

    const w1: any = frontImg;
    const w2: any = backImg;
    const w3: any = leftImg;
    const w4: any = rightImg;

    const array = ["front", "back", "left", "right"];

    formData1.append("contId", contId);
    // formData1.append("memo", memo);
    formData1.append("positions", "front,back,left,right");
    // formData1.append('files', `${w1},${w2},${w3},${w4}`);
    formData1.append("files", w1);
    formData1.append("files", w2);
    formData1.append("files", w3);
    formData1.append("files", w4);
    formData1.append("memo", memo);

    if (contId) {
      try {
        const response = await bikeReturnAxios(`admin/cont/bike-in`, formData1);
        //console.log('Upload successful:', response.data);
        if (response.status === 200) {
          setBikeReturnedPopup(true);
        }
      } catch (error) {
        setNotBikeReturnedPopup(true);
      }
    }
  };
  const Input = styled("input")({
    display: "none",
  });
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <Layout>
      <DoubleBtnDialog
        open={bikeReturnPopup}
        setOpen={setBikeReturnPopup}
        btn1text="취소"
        btn2text="반납"
        btn1Fn={() => setBikeReturnPopup(false)}
        btn2Fn={bikeReturn}
        children={
          <Box>
            <Box display={"flex"} justifyContent={"center"} mt={2}>
              <Typography fontSize={"1.1rem"} className={"bold"}>
                이륜차를 반납 처리하시겠습니까?
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
                  {brandNm} {"/"} {modelNm}
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography className={"bold"} fontSize={"1.1rem"}>
                  {bikeNo}
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={bikeReturnedPopup}
        btntext="확인"
        btnFn={() => {
          backToMain();
        }}
        children={
          <Box p={2} pt={0}>
            <Box display={"flex"} justifyContent={"center"} mb={1}>
              <Typography fontSize={"1.2rem"} className={"bold"}>
                반납완료
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography color={"#999999"}>
                이륜차 반납 처리가 완료되었습니다.
              </Typography>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={notBikeReturnedPopup}
        btntext="확인"
        btnFn={() => {
          setNotBikeReturnedPopup(false);
        }}
        children={
          <Box pt={0} px={4}>
            <Box display={"flex"} justifyContent={"center"} mb={1}>
              <Typography fontSize={"1.2rem"} className={"bold"}>
                반납실패
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography color={"#999999"}>
                사진 4장을 모두 입력해주세요
              </Typography>
            </Box>
          </Box>
        }
      />
      <Dialog open={memoPopup}>
        <Box py={1.5} px={2}></Box>
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
          <Typography fontSize={"1.2rem"} fontWeight={"700"}>
            반납사진 등록
          </Typography>
        </Box>
      </Box>

      <Box m={2}>
        <Box>
          <Typography color={"#444444"} fontSize={"1.25rem"} fontWeight={"700"}>
            반납처리를 위해
          </Typography>
          <Typography color={"#444444"} fontSize={"1.25rem"} fontWeight={"700"}>
            사진 4장을 등록해주세요.
          </Typography>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={3.7}>
            <Box width={"48%"}>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography fontSize={"0.9375rem"} mb={1}>
                  앞면
                </Typography>
              </Box>
              <Box border={"1px dotted #999999"} borderRadius={"10px"}>
                <Box>
                  <Input
                    id="file-upload-front"
                    accept="image/*"
                    type="file"
                    onChange={(e) => saveImgFile(e, "front")}
                    hidden
                  />
                  <label htmlFor="file-upload-front">
                    {frontImg ? (
                      <Box
                        height={"155px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <img
                          src={frontViewImg as string}
                          alt="Uploaded preview"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box py={6}>
                        <Box textAlign={"center"}>
                          <Box>
                            <img src={imagelogo} width="32px"></img>
                          </Box>
                          <Typography fontSize={"0.875rem"} color={"#ADADAD"}>
                            이미지 업로드
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </label>
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
                textAlign={"center"}
                borderRadius={"10px"}
              >
                <Box>
                  <Input
                    id="file-upload-back"
                    accept="image/*"
                    type="file"
                    onChange={(e) => saveImgFile(e, "back")}
                    hidden
                  />
                  <label htmlFor="file-upload-back">
                    {backImg ? (
                      <Box
                        height={"155px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <img
                          src={backViewImg as string}
                          alt="Uploaded preview"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box py={6}>
                        <Box textAlign={"center"}>
                          <Box>
                            <img src={imagelogo} width="32px"></img>
                          </Box>
                          <Typography fontSize={"0.875rem"} color={"#ADADAD"}>
                            이미지 업로드
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </label>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={2.5}>
            <Box width={"48%"}>
              <Box display={"flex"} justifyContent={"center"} mb={1}>
                <Typography fontSize={"0.9375rem"}>좌측면</Typography>
              </Box>
              <Box
                border={"1px dotted #999999"}
                textAlign={"center"}
                borderRadius={"10px"}
              >
                <Box>
                  <Input
                    id="file-upload-left"
                    accept="image/*"
                    type="file"
                    onChange={(e) => saveImgFile(e, "left")}
                    hidden
                  />
                  <label htmlFor="file-upload-left">
                    {leftImg ? (
                      <Box
                        height={"155px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <img
                          src={leftViewImg as string}
                          alt="Uploaded preview"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box py={6}>
                        <Box textAlign={"center"}>
                          <Box>
                            <img src={imagelogo} width="32px"></img>
                          </Box>
                          <Typography fontSize={"0.875rem"} color={"#ADADAD"}>
                            이미지 업로드
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </label>
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
                textAlign={"center"}
                borderRadius={"10px"}
              >
                <Box>
                  <Input
                    id="file-upload-right"
                    accept="image/*"
                    type="file"
                    onChange={(e) => saveImgFile(e, "right")}
                    hidden
                  />
                  <label htmlFor="file-upload-right">
                    {rightImg ? (
                      <Box
                        height={"155px"}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <img
                          src={rightViewImg as string}
                          alt="Uploaded preview"
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box py={6}>
                        <Box textAlign={"center"}>
                          <Box>
                            <img src={imagelogo} width="32px"></img>
                          </Box>
                          <Typography fontSize={"0.875rem"} color={"#ADADAD"}>
                            이미지 업로드
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </label>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={5} mb={3}>
          <Box position="fixed" bottom={30} width={"90%"}>
            <Button
              id="13"
              fullWidth
              onClick={() => imgCheck()}
              variant="contained"
              color="primary"
              sx={{ borderRadius: "10px", height: "60px" }}
            >
              <Typography fontWeight={"700"}>반납처리</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MobileBikeReturnPage;
