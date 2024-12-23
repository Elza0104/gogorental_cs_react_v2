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
} from "@mui/material";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridColDef,
  GridRowsProp,
  GridApi,
} from "@mui/x-data-grid";
import { Card, makeStyles, useMediaQuery } from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { redirect } from "react-router-dom";
import {
  getAxios,
  findAxios,
  postAxios,
  bikeReturnAxios,
} from "../hooks/Axiosinstance";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import Imagelist from "../component/basic/ImageList";
import { format } from "date-fns";
import { DoubleBtnDialog } from "../component/basic/dialog/doubleBtnDialog";
import dayjs, { Dayjs } from "dayjs";
import { BorderRight } from "@mui/icons-material";
import Layout from "../component/layout/main";
import 'dayjs/locale/ko';
import {
  removeS,
  removeT,
  removeK,
  removeE,
  removeST,
  removeSTE,
  removeSTK,
  removeSTEK,
} from "../format";
import { idText } from "typescript";

const Grouplogo = require("../assets/img/Group.png");
const mainlogo = require("../assets/img/mainlogo.png");

const MobileMainPage = () => {
  const navigate = useNavigate();
  if (window.sessionStorage.getItem("accessToken") == null) {
    navigate("/");
  }
  const [bikedata, setBikedata] = useState([]);
  const [contractCount, setContractCount] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [searchStatus, setSearchStatus] = useState("1");
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [logoutPopup, setLogoutPopup] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(3, "month")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "year"));

  function resetSearch(e: any) {
    setSearchStatus("1");
    setSearchName("");
    setSearchPhone("");
    setStartDate(dayjs().subtract(3, "month"));
    setEndDate(dayjs().add(1, "year"));
  }
  const inputHandlets = [
    removeS,
    removeT,
    removeK,
    removeE,
    removeST,
    removeSTE,
    removeSTK,
    removeSTEK,
  ];
  function onlyEng(e: any, handle: string) {
    const { value } = e.target;
    const index = ["S", "T", "E", "K", "ST", "STE", "STK", "STEK"].indexOf(
      handle
    );
    const formatedValue = inputHandlets[index](value);
    e.target.value = formatedValue;
  }

  const convertPrice = (e: any) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
  };

  const allBikeloading = async () => {
    try {
      await getAxios(
        `admin/cont/list?contStat=${convertRentalStatus()}&name=${searchName}&phoneNumber=${searchPhone}&startDate=${convertDate(
          startDate
        )}&endDate=${convertDate(endDate)}`
      ).then((response) => {
        console.log(response);

        const array = response.data.data.dataList.map((val: any, idx: any) => ({
          id: val.contId,
          name: val.contNm,
          phoneNo: val.phoneNo,
          contStartTime: convertTime(val.contStartTime),
          contEndTime: convertTime(val.contEndTime),
          brandNm: val.brandNm,
          modelNm: val.modelNm,
          bikeNo: val.bikeNo,
          contStat: val.contStat,
        }));
        setContractCount(response.data.data.totalCount);
        console.log(response);
        //console.log(array)
        setBikedata(array);
        setAgencyName(response.data.data.totalDays);
      });
    } catch (err) {}
    //console.log(convertDate(startDate?.toString()))
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  function convertDate(date: any) {
    if (date != undefined) {
      let sd = new Date(date);
      const year = sd.getFullYear();
      const month = ("0" + (sd.getMonth() + 1)).slice(-2);
      const day = ("0" + sd.getDate()).slice(-2);
      const dateStr = `${year}-${month}-${day}`;
      return dateStr;
    }
    return "";
  }
  function convertTime(date: any) {
    if (date != undefined) {
      let sd = new Date(date);
      const year = sd.getFullYear();
      const month = ("0" + (sd.getMonth() + 1)).slice(-2);
      const day = ("0" + sd.getDate()).slice(-2);
      const hour = ("0" + sd.getHours()).slice(-2);
      const minute = ("0" + sd.getMinutes()).slice(-2);
      const second = ("0" + sd.getSeconds()).slice(-2);
      const dateStr = `${year}-${month}-${day} ${hour}:${minute}`;
      return dateStr;
    }
    return "";
  }
  function convertPhone(target: any) {
    target.target.value = target.target.value
      .replace(/[^0-9]/g, "")
      .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
        "$1-$2-$3"
      );
  }
  function ctrDetail(id: any, conStat: any) {
    //console.log(conStat)
    navigate("./ctrdetail", { state: { id: id, bikeId: conStat } });
  }
  function convertRentalStatus() {
    if (searchStatus == "1") {
      return "";
    }
    return searchStatus;
  }
  useEffect(() => {
    allBikeloading();
  }, []);
  return (
    <Layout>
      <Box>
        <DoubleBtnDialog
          open={logoutPopup}
          setOpen={setLogoutPopup}
          btn1text="취소"
          btn2text="로그아웃"
          btn1Fn={() => setLogoutPopup(false)}
          btn2Fn={logout}
          children={
            <Box
              height="134px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography fontSize={"1.1rem"} className={"bold"}>
                정말 로그아웃 하시겠습니까?
              </Typography>
            </Box>
          }
        />
        <Box m={2}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box display={"flex"} alignItems="center">
              <img src={mainlogo} width={"80px"}></img>
            </Box>

            <Typography
              color="#000000"
              ml={-1}
              fontSize={"1.0625rem"}
              fontWeight={"590"}
            >
              예약조회
            </Typography>
            <Button onClick={() => setLogoutPopup(true)}>
              <Typography
                color={"#444444"}
                fontSize={"0.875rem"}
                fontWeight={"500"}
              >
                로그아웃
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box m={2}>
          <Box my={2}>
            <Typography>기간</Typography>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={1}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DatePicker
                  sx={{
                    width: "160px",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { border: "1px solid #D6C2DC" },
                  }}
                  defaultValue={dayjs().subtract(3, "month")}
                  format="YYYY-MM-DD"
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                />
              </LocalizationProvider>
              <Typography color={"#D6C2DC"}>~</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DatePicker
                  sx={{
                    width: "160px",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { border: "1px solid #D6C2DC" },
                  }}
                  defaultValue={dayjs().add(12, "month")}
                  format="YYYY-MM-DD."
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              </LocalizationProvider>
            </Box>
            <Box display={"flex"} mt={2}>
              <Box>
                <Typography>대여상태</Typography>
                <Box mt={1}>
                  <FormControl
                    color="primary"
                    sx={{
                      width: "120px",
                    }}
                  >
                    <Select
                      variant="outlined"
                      color="primary"
                      defaultValue={"1"}
                      value={searchStatus}
                      key="rentalStatusPicker"
                      sx={{
                        borderRadius: "10px",
                        ".MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #D6C2DC",
                        },
                        color: "#783489",

                        fontSize: "13px",
                        fontWeight: "500",
                        ".MuiSelect-select": { color: "#783489" },
                      }}
                      onChange={(e) => setSearchStatus(e.target.value)}
                    >
                      <MenuItem
                        value="1"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#783489",
                        }}
                      >
                        전체
                      </MenuItem>
                      <MenuItem
                        value="WAITING"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#783489",
                        }}
                      >
                        출고대기
                      </MenuItem>
                      <MenuItem
                        value="DRIVING"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#783489",
                        }}
                      >
                        출고 중
                      </MenuItem>
                      <MenuItem
                        value="NOT_RETURN"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#783489",
                        }}
                      >
                        미반납
                      </MenuItem>
                      <MenuItem
                        value="RETURN"
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#783489",
                        }}
                      >
                        반납완료
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box mx={3} mt={4.5} borderLeft="1px solid #D6C2DC" />
              <Box>
                <Typography>예약자 이름</Typography>
                <Box mt={1}>
                  <TextField
                    key="name"
                    size="medium"
                    fullWidth
                    spellCheck="false"
                    value={searchName}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        fontSize: "13px",

                        fontWeight: "500",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D6C2DC",
                          borderWidth: "1px",
                          borderRadius: "10px",
                        },
                        "&.Mui-focused": {
                          borderRadius: "10px",
                          backgroundColor: "#F1EBF3",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgb(120, 52, 137)",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "rgb(202, 119, 223)",
                          "&.Mui-focused": {
                            color: "rgb(120, 52, 137)",
                          },
                        },
                        "&:hover fieldset": {
                          borderColor: "rgb(120, 52, 137)",
                        },
                      },
                      input: {
                        "&:: placeholder": {
                          color: "#783489",
                        },
                      },
                    }}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography>휴대폰 번호</Typography>
              <Box mt={1}>
                <TextField
                  key="phoneNum"
                  fullWidth
                  type="number"
                  inputMode="numeric"
                  spellCheck="false"
                  placeholder="숫자만 입력"
                  variant="outlined"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  InputProps={{
                    sx: {
                      fontSize: "13px",

                      fontWeight: "500",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D6C2DC",
                        borderWidth: "1px",
                        borderRadius: "10px",
                      },
                      "&.Mui-focused": {
                        borderRadius: "10px",
                        backgroundColor: "#F1EBF3",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgb(120, 52, 137)",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "rgb(202, 119, 223)",
                        "&.Mui-focused": {
                          color: "rgb(120, 52, 137)",
                        },
                      },
                      "&:hover fieldset": {
                        borderColor: "rgb(120, 52, 137)",
                      },
                    },
                    input: {
                      "&:: placeholder": {
                        color: "#783489",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"} mt={3}>
            <Box display={"flex"}>
              <Button
                onClick={allBikeloading}
                variant="contained"
                color="primary"
                sx={{ borderRadius: "10px", width: "120px", height: "48px" }}
              >
                <Typography fontSize="1.1rem" className="bold">
                  검색
                </Typography>
              </Button>
              <Box ml={2}>
                <Button
                  onClick={resetSearch}
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    width: "120px",
                    height: "48px",
                    border: "1px solid rgb(120, 52, 137)",
                  }}
                >
                  <Typography fontSize="1.1rem" className="bold">
                    초기화
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mx={2}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"flex-end"}
            px={1}
          >
            <Typography fontWeight={"700"} fontSize={"1.25rem"}>
              총 {contractCount}건
            </Typography>
            <Typography color={"#B2B2B2"} fontSize={"0.8125rem"}>
              * 최근 3개월 내역
            </Typography>
          </Box>
          <Box>
            {bikedata.length != 0 ? (
              bikedata.map((val: any, idx: any) => {
                //console.log(bikedata.length)
                return (
                  <Box
                    key={idx}
                    pt={3}
                    pl={4}
                    pb={2}
                    my={1}
                    borderRadius={"10px"}
                    border="1px solid #B2B2B2"
                  >
                    <Box display="flex" mb={1}>
                      <Box width="90px">
                        <Typography fontSize="0.875rem" fontWeight={"700"}>
                          예약자 이름
                        </Typography>
                      </Box>
                      <Typography fontSize="0.875rem">{val.name}</Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="90px">
                        <Typography fontSize="0.875rem" fontWeight={"700"}>
                          휴대폰번호
                        </Typography>
                      </Box>
                      <Typography fontSize="0.875rem">
                        {val.phoneNo.replace(
                          /^(\d{2,3})(\d{3,4})(\d{4})$/,
                          `$1-$2-$3`
                        )}
                      </Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="90px">
                        <Typography fontSize="0.875rem" fontWeight={"700"}>
                          대여일시
                        </Typography>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
                        <Typography
                          letterSpacing={"-0.5px"}
                          fontSize={"0.75rem"}
                        >
                          {val.contStartTime} ~ {val.contEndTime}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="90px">
                        <Typography fontSize="0.875rem" fontWeight={"700"}>
                          제조사/모델명
                        </Typography>
                      </Box>
                      <Typography fontSize="0.875rem">
                        {val.brandNm}/ {val.modelNm}
                      </Typography>
                    </Box>
                    <Box display="flex" mb={1}>
                      <Box width="90px">
                        <Typography fontSize="0.875rem" fontWeight={"700"}>
                          차량번호
                        </Typography>
                      </Box>
                      <Typography fontSize="0.875rem">{val.bikeNo}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" ml={-4} mt={4}>
                      <Button
                        id="13"
                        onClick={() => ctrDetail(val.id, val.conStat)}
                        variant={
                          val.contStat == "RETURN" ? "outlined" : "contained"
                        }
                        color={
                          val.contStat == "DRIVING"
                            ? "success"
                            : val.contStat == "RETURN"
                            ? "primary"
                            : val.contStat == "NOT_RETURN"
                            ? "warning"
                            : val.contStat == "WAITING"
                            ? "primary"
                            : "error"
                        }
                        sx={{
                          borderRadius: "5px",
                          width: "200px",
                          height: "40px",
                        }}
                      >
                        <Typography fontSize="1rem" fontWeight={"700"}>
                          {val.contStat == "DRIVING"
                            ? "출고 중"
                            : val.contStat == "RETURN"
                            ? "반납완료"
                            : val.contStat == "NOT_RETURN"
                            ? "미반납"
                            : val.contStat == "WAITING"
                            ? "출고대기"
                            : "error"}{" "}
                          {">"}
                        </Typography>
                      </Button>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box mt={6}>
                <Box
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}
                >
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
                    예약 내역이 없어요.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <Box mt={1}></Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MobileMainPage;
