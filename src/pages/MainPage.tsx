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
import { redirect } from "react-router-dom";
import {
  getAxios,
  findAxios,
  postAxios,
  bikeReturnAxios,
} from "../hooks/Axiosinstance";
import PaginationItem from "@mui/material/PaginationItem";
import { error } from "console";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import Imagelist from "../component/basic/ImageList";
import { DoubleBtnDialog } from "../component/basic/dialog/doubleBtnDialog";
import { BorderRight } from "@mui/icons-material";
import { formatDateTime } from "../util";

const mainlogo = require("../assets/img/mainlogo.png");

const MainPage = () => {
  const navigate = useNavigate();
  // navigate("/login");

  const isMobile = useMediaQuery("(max-width: 600px)");
  const [bikedata, setBikedata] = useState([]);
  const [bikectrdata, setBikectrdata] = useState([]);
  const [agencyName, setAgencyName] = useState("");
  const [rentalStatusPopup, setRentalStatusPopup] = useState<boolean>(false);
  const [rentalPopup, setRentalPopup] = useState<boolean>(false);
  const [popupLoading, setPopupLoading] = useState<boolean>(false);
  const [bikeReturnPopup, setBikeReturnPopup] = useState<boolean>(false);
  const [rentalbikeCtr, setrentalbikeCtr] = useState({
    id: "",
    ctrStartTime: "",
    ctrEndTime: "",
    amount: "",
    userDTO: {
      name: "",
      phoneNumber: "",
    },
  });

  const columns: GridColDef[] = [
    {
      field: "agcyNm",
      headerName: "센터명",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "이름",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "phoneNm",
      headerName: "휴대폰 번호",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrStartTime",
      headerName: "대여시작일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrEndTime",
      headerName: "대여종료일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "searchRental",
      headerName: "계약 이력",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              rentalStatusFn(params.row.id);
            }}
            variant="contained"
            sx={{
              borderRadius: "30px",
            }}
          >
            계약 보기
          </Button>
        );
      },
    },
  ];
  const pop = (e: any) => {
    return "rgb(120, 52, 137)";
  };
  const bikeStatusLabel = (status: any) => {
    if (status == "3") {
      return "운행중";
    } else if (status == "2") {
      return "출고대기";
    } else if (status == "1") {
      return "계약완료";
    } else if (status == "4") {
      return "계약종료";
    }
    return "오류";
  };
  const compareTime: any = (startTime: any, endTime: any, e: any) => {
    if (!e.bikeInOutDTO) {
      const time =
        Date.parse(Date()) >= Date.parse(startTime) &&
        Date.parse(Date()) <= Date.parse(endTime);

      if (time == true) {
        setrentalbikeCtr(e);
      }
    }
  };
  /*const rentalDataLoading = (params: any) => {
    setrentalbikeCtr({
      id: '',
      ctrStartTime:'',
      ctrEndTime:'',
      amount:'',
      userDTO:{
        name:'',
        phoneNumber: '',
      },
    })
      params.forEach((e:any) =>(
        compareTime(e.ctrStartTime, e.ctrEndTime, e)
      ));
    console.log(rentalbikeCtr)
  };*/

  const rental = async (ctrid: any) => {
    try {
      const response = await postAxios(`admin/rental?contractId=${ctrid}`);

      //console.log('Upload successful:', response.data);
    } catch (error) {
      //console.error('Error uploading the image:', error);
    }
  };
  const bikectrcolumns: GridColDef[] = [
    {
      field: "agcyNm",
      headerName: "센터명",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "name",
      headerName: "이름",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "payAmount",
      headerName: "총 가격",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrStatus",
      headerName: "계약상태",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrLength",
      headerName: "계약일수",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrStartTime",
      headerName: "계약 시작일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "ctrEndTime",
      headerName: "계약 종료일시",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
  ];

  function rentalStatusFn(id: any) {
    setPopupLoading(true);
    ctrLoading(id);
    setRentalStatusPopup(true);
  }
  const ctrLoading = async (id: any) => {
    try {
      await getAxios(`admin/admin/cont-list?bikeId=${id}`).then((response) => {
        console.log(id);
        if (
          response.data.data.dataList.length &&
          response.data.data.dataList.length != 0
        ) {
          const array = response.data.data.dataList.map(
            (val: any, idx: any) => ({
              id: idx,
              name: val.contNm,
              phoneNumber: val.phoneNo.replace(
                /^(\d{2,3})(\d{3,4})(\d{4})$/,
                `$1-$2-$3`
              ),
              payAmount: convertPrice(val.contAmt),
              ctrStatus: bikeStatusLabel(val.contStat),
              ctrLength: val.contDay + " 일",
              ctrStartTime: convertTime(val.contStartTime),
              ctrEndTime: convertTime(val.contEndTime),
            })
          );
          setBikectrdata(array);
          console.log(response.data.data.dataList);
          console.log(array);
        } else setBikectrdata([]);
      });
    } catch (err: any) {
      console.log(err);
    }
    setPopupLoading(false);
  };

  function convertTime(date: any) {
    if (date != undefined) {
      let sd = new Date(date);
      const year = sd.getFullYear();
      const month = ("0" + (sd.getMonth() + 1)).slice(-2);
      const day = ("0" + sd.getDate()).slice(-2);
      const hour = ("0" + sd.getHours()).slice(-2);
      const minute = ("0" + sd.getMinutes()).slice(-2);
      const second = ("0" + sd.getSeconds()).slice(-2);
      const dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return dateStr;
    }
    return "";
  }
  const rentalbikeNowCtr = (params: any) => {
    console.log(params);
    setrentalbikeCtr({
      id: "",
      ctrStartTime: "",
      ctrEndTime: "",
      amount: "",
      userDTO: {
        name: "",
        phoneNumber: "",
      },
    });
    /*params.forEach((e:any) =>(
        compareTime(e.ctrStartTime, e.ctrEndTime, e),
        console.log(e.id)
      ));
    console.log(rentalbikeCtr)*/
  };
  function ctrIdFn(e: any, a: any): String {
    /*let last = e[e.length - 1];
    console.log(e)
    console.log(a)
    console.log(last)
    if(last){
      return last.id;
    }
    else*/
    return "";
  }
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Box width="10000vh" display="flex" justifyContent="center">
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          // @ts-expect-error
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            apiRef.current.setPage(value - 1)
          }
        />
      </Box>
    );
  }
  const rentalStatus = (e: any): String => {
    const currentDate = new Date();
    let result: String = "계약없음";

    if (e != null) {
      /*if(e.length != 0){
        
        for(let i=0; e.length-1; i++) {    
          const startTime = new Date(e[i].ctrStartTime);
          const endTime = new Date(e[i].ctrEndTime);
        
          if(currentDate <= endTime) {
            if(e[i].bikeInOutDTO == null) {
              return "출고대기";
            } else if(e[i].bikeInOutDTO.inTime == null) {
              return  "렌탈중"
            }
            else{
              return '오류'
            }
          } else if(currentDate < startTime) {
            return  "렌탈대기"
          } 
          else{
            return '오류'
          }
        }
      }*/
    } else {
      return "계약없음";
    }
    return result;
  };
  const convertPrice = (e: any) => {
    return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
  };
  const contractArray = (e: any) => {
    if (e != null) {
      if (e.length != 0) {
        var array = e.map((val: any, idx: any) => ({
          id: val.id,
          name: val.userDTO.name,
          phoneNumber: val.userDTO.phoneNumber,
          payAmount: convertPrice(val.amount),
          ctrStatus: val.id,
          ctrLength: val.totalDays + "일",
          ctrStartTime: convertTime(val.ctrStartTime),
          ctrEndTime: convertTime(val.ctrEndTime),
        }));
        return array;
      }
    }
    return [];
  };

  const allBikeloading = async () => {
    try {
      await getAxios(`agency/getContracts?`).then((response) => {

        console.log(response.data.data.content);
        const array = response.data.data.content.map((val: any, idx: any) => ({
          id: val.id,
          agcyNm: val.agencyName,
          name: val.customerName,
          phoneNm: val.customerPhone,
          amount: val.amount,
          ctrStartTime: formatDateTime(val.ctrStartTime),
          ctrEndTime: formatDateTime(val.ctrEndTime)
        }));

        setBikedata(array);
        setAgencyName(response.data.data.totalDays);
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  const bikeReturn = async () => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();

    const w1: any = document.getElementById("imageInput1");
    const w2: any = document.getElementById("imageInput2");
    const w3: any = document.getElementById("imageInput3");
    const w4: any = document.getElementById("imageInput4");

    const q1 = w1.files[0];
    const q2 = w2.files[0];
    const q3 = w3.files[0];
    const q4 = w4.files[0];
    console.log(q1, q2, q3, q4);

    formData1.append("photo1", q1);
    formData1.append("photo2", q2);
    formData2.append("description", "Uploaded photo");
    formData1.append("photo3", q3);
    formData3.append("description", "Uploaded photo");
    formData1.append("photo4", q4);
    formData4.append("description", "Uploaded photo");
    console.log(rentalbikeCtr.id);
    if (rentalbikeCtr.id) {
      try {
        const response = await bikeReturnAxios(
          `admin/bike-return?contractId=${rentalbikeCtr.id}`,
          formData1
        );
        //console.log('Upload successful:', response.data);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    }
  };
  function resetBikectrData() {
    const array = [];
    setBikectrdata([]);
  }
  const [state, setState] = useState({});
  const hello = async (e: any, inputIndex: any) => {
    //console.log(typeof(e))
    //console.log(e.target.files[0])
    const src = window.URL.createObjectURL(e.target.files[0]);
    //console.log(typeof(src))
  };
  const PAGE_SIZE = 5;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    allBikeloading();
  }, []);
  return (
    <Box>
      <Box minWidth="930px">
        <Dialog
          open={rentalStatusPopup}
          maxWidth={"lg"}
          PaperProps={{
            sx: { borderRadius: "15px", border: "3px solid rgb(120, 52, 137)" },
          }}
        >
          <Box p={2}>
            <Box
              pt={2}
              pl={2}
              pb={1}
              display="flex"
              justifyContent="space-between"
            >
              <Box display="flex">
                <Typography fontSize="1.1rem" className="bold">
                  계약 이력
                </Typography>
                <Box ml={2}>
                  <Button
                    onClick={() => {
                      /*rentalDataLoading(bikectrdata);*/
                    }}
                    variant="contained"
                    sx={{
                      borderRadius: "5px",
                      height: "24px",
                    }}
                  >
                    출고하기
                  </Button>
                </Box>
                <Box ml={2}>
                  <Button
                    onClick={() => {
                      rentalbikeNowCtr("params.row.contracts");
                      setBikeReturnPopup(true);
                    }}
                    //disabled={}
                    variant="contained"
                    sx={{
                      borderRadius: "5px",
                      height: "24px",
                    }}
                  >
                    반납하기
                  </Button>
                </Box>
              </Box>

              <Button
                onClick={() => {
                  setRentalStatusPopup(false);
                  resetBikectrData();
                }}
              >
                종료
              </Button>
            </Box>
            <Box display={"flex"}>
              <Box my={2} ml={3} display={"flex"} alignItems={"center"}>
                <Typography
                  color="rgb(120, 52, 137)"
                  className="bold"
                  fontSize="1rem"
                  pr={1}
                >
                  계약자
                </Typography>
                <TextField
                  style={{
                    width: "150px",
                  }}
                  placeholder="예: 서울길동홍1234"
                />
              </Box>
              <Box my={2} ml={3} display={"flex"} alignItems={"center"}>
                <Typography
                  color="rgb(120, 52, 137)"
                  className="bold"
                  fontSize="1rem"
                  pr={1}
                >
                  계약상태
                </Typography>
                <FormControl
                  variant="standard"
                  sx={{
                    width: "120px",
                  }}
                >
                  <Select color="primary" defaultValue={"01"}>
                    <MenuItem value="01">야마하</MenuItem>
                    <MenuItem value="02">혼다</MenuItem>
                    <MenuItem value="03">기타</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                width="20%"
                display="flex"
                justifyContent={"flex-start"}
                py={1.7}
                pl={3}
              >
                <Button variant="contained" onClick={() => allBikeloading()}>
                  검색
                </Button>
                <Box pl={3}>
                  <Button variant="contained" onClick={() => allBikeloading()}>
                    초기화
                  </Button>
                </Box>
              </Box>
            </Box>
            <DataGrid
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[PAGE_SIZE]}
              autoHeight
              columns={bikectrcolumns}
              rows={bikectrdata}
              disableColumnFilter
              disableColumnSorting
              disableColumnResize
              disableColumnMenu
              showColumnVerticalBorder
              disableRowSelectionOnClick
              loading={popupLoading}
              slots={{
                pagination: CustomPagination,
              }}
              localeText={{ noRowsLabel: "예정된 계약이 없습니다." }}
              sx={{
                border: "1px solid #FFFFFF",
                borderTop: "1px solid rgb(224, 224, 224)",
                backgroundColor: "#FFFFFF",
                ".MuiDataGrid-columnHeaderTitle": {
                  fontSize: "1rem",
                  fontWeight: "bold !important",
                  overflow: "visible !important",
                },
              }}
            />
          </Box>
        </Dialog>
        <Dialog
          open={bikeReturnPopup}
          maxWidth={"lg"}
          PaperProps={{
            sx: { borderRadius: "15px", border: "3px solid rgb(120, 52, 137)" },
          }}
        >
          <Button
            onClick={() => {
              setBikeReturnPopup(false);
            }}
          >
            종료
          </Button>

          <input
            id="imageInput1"
            accept="image/*"
            onChange={(e) => hello(e, 1)}
            type="file"
          />

          <input
            id="imageInput2"
            accept="image/*"
            onChange={(e) => hello(e, 2)}
            type="file"
          />

          <input
            id="imageInput3"
            accept="image/*"
            onChange={(e) => hello(e, 3)}
            type="file"
          />

          <input
            id="imageInput4"
            accept="image/*"
            onChange={(e) => hello(e, 4)}
            type="file"
          />

          <Button
            onClick={() => {
              bikeReturn();
            }}
          >
            종료
          </Button>
        </Dialog>
        <Dialog
          open={rentalPopup}
          maxWidth={"lg"}
          PaperProps={{ sx: { borderRadius: "15px" } }}
        >
          {rentalbikeCtr.id ? (
            <Box>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => {
                    setRentalPopup(false);
                  }}
                >
                  종료
                </Button>
              </Box>
              <Box>
                <Box pt={2} mx={5} px={2} pb={1} mb={2}>
                  <Box display="flex" mb={1} alignItems="end">
                    <Typography mr={1} fontSize="1.2rem">
                      라이더
                    </Typography>
                    <Typography fontSize="1.3rem" color="rgb(120, 52, 137)">
                      {rentalbikeCtr.userDTO.name}
                    </Typography>
                    <Typography mr={1} fontSize="1.2rem">
                      님
                    </Typography>
                  </Box>
                  <Typography>
                    전화번호 :{" "}
                    {rentalbikeCtr.userDTO.phoneNumber.replace(
                      /^(\d{2,3})(\d{3,4})(\d{4})$/,
                      `$1-$2-$3`
                    )}
                  </Typography>
                  <Typography>
                    일시 : {convertTime(rentalbikeCtr.ctrStartTime)} ~{" "}
                    {convertTime(rentalbikeCtr.ctrEndTime)}
                  </Typography>

                  <Typography>
                    가격 : 총 {convertPrice(rentalbikeCtr.amount)}
                  </Typography>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  rental(rentalbikeCtr.id);
                }}
              >
                출고하기
              </Button>
            </Box>
          ) : (
            <Box>
              <Box width="100%" display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => {
                    setRentalPopup(false);
                  }}
                >
                  종료
                </Button>
              </Box>
              <Box pt={2} mx={5} px={2} pb={1} mb={2}>
                <Typography>현재 예정된 예약이 없습니다.</Typography>
              </Box>
            </Box>
          )}
        </Dialog>

        <Box display="flex" justifyContent="space-between" m={3}>
          <Box>
            <img src={mainlogo}></img>
          </Box>
          <Box></Box>
          {bikedata ? (
            <Box width="100px">
              <Typography>{agencyName}</Typography>
            </Box>
          ) : (
            <Box>null</Box>
          )}
        </Box>
        <Box
          m={3}
          p={1}
          borderRadius="10px"
          border="2px solid rgb(120, 52, 137)"
          display={"flex"}
        >
          <Box display={"flex"} justifyContent="center" width="80%">
            <Box my={2} display={"flex"} alignItems={"center"}>
              <Typography
                color="rgb(120, 52, 137)"
                className="bold"
                fontSize="1rem"
                pr={1}
              >
                제조사
              </Typography>
              <FormControl
                variant="standard"
                color="primary"
                sx={{
                  width: "120px",
                }}
              >
                <Select color="primary" defaultValue={"01"}>
                  <MenuItem value="01">1342</MenuItem>
                  <MenuItem value="02">혼다</MenuItem>
                  <MenuItem value="03">기타</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box my={2} ml={3} display={"flex"} alignItems={"center"}>
              <Typography
                color="rgb(120, 52, 137)"
                className="bold"
                fontSize="1rem"
                pr={1}
              >
                모델명
              </Typography>
              <TextField
                style={{
                  width: "120px",
                }}
                placeholder="예: PCX125"
              />
            </Box>
            <Box my={2} ml={3} display={"flex"} alignItems={"center"}>
              <Typography
                color="rgb(120, 52, 137)"
                className="bold"
                fontSize="1rem"
                pr={1}
              >
                차량번호
              </Typography>
              <TextField
                style={{
                  width: "150px",
                }}
                placeholder="예: 서울길동홍1234"
              />
            </Box>
            <Box my={2} ml={3} display={"flex"} alignItems={"center"}>
              <Typography
                color="rgb(120, 52, 137)"
                className="bold"
                fontSize="1rem"
                pr={1}
              >
                차량상태
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "120px",
                }}
              >
                <Select color="primary" defaultValue={"01"}>
                  <MenuItem value="01">야마하</MenuItem>
                  <MenuItem value="02">혼다</MenuItem>
                  <MenuItem value="03">기타</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            width="20%"
            display="flex"
            justifyContent={"flex-start"}
            py={1.7}
          >
            <Button variant="contained" onClick={() => allBikeloading()}>
              검색
            </Button>
            <Box pl={3}>
              <Button variant="contained" onClick={() => allBikeloading()}>
                새로고침
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          m={3}
          p={1}
          borderRadius="10px"
          border="2px solid rgb(120, 52, 137)"
        >
          <DataGrid
            autoHeight
            columns={columns}
            rows={bikedata}
            disableColumnFilter
            disableColumnSorting
            disableColumnResize
            disableColumnMenu
            showColumnVerticalBorder
            disableRowSelectionOnClick
            slots={{
              pagination: CustomPagination,
            }}
            sx={{
              marginX: "30px",
              border: "1px solid #FFFFFF",
              backgroundColor: "#FFFFFF",
              ".MuiDataGrid-columnHeaderTitle": {
                fontSize: "1rem",
                fontWeight: "bold !important",
                overflow: "visible !important",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
