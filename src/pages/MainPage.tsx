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
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridColDef,
} from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import { getAxios, postAxios, bikeReturnAxios } from "../hooks/Axiosinstance";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../util";

const mainlogo = require("../assets/img/mainlogo.png");

const MainPage = () => {
  const navigate = useNavigate();
  // navigate("/login");

  const [bikedata, setBikedata] = useState([]);
  const [rentalPopup, setRentalPopup] = useState<boolean>(false);
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
      headerName: "계약 상세보기",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => {
              ctrDetailFn(params.row.id);
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

  function ctrDetailFn(id: any) {
    navigate("/main/ctrdetail", {
      state: {
        id: id,
      },
    });
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
      const dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      return dateStr;
    }
    return "";
  }
  const rentalbikeNowCtr = (params: any) => {
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

  const allBikeloading = async () => {
    try {
      await getAxios(`agency/getContracts?`).then((response) => {
        const array = response.data.data.content.map((val: any, idx: any) => ({
          id: val.id,
          agcyNm: val.agencyName,
          name: val.customerName,
          phoneNm: val.customerPhone,
          amount: val.amount,
          ctrStartTime: formatDateTime(val.ctrStartTime),
          ctrEndTime: formatDateTime(val.ctrEndTime),
        }));

        setBikedata(array);
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

    formData1.append("photo1", q1);
    formData1.append("photo2", q2);
    formData2.append("description", "Uploaded photo");
    formData1.append("photo3", q3);
    formData3.append("description", "Uploaded photo");
    formData1.append("photo4", q4);
    formData4.append("description", "Uploaded photo");
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
  function resetCtrdata() {
    const array = [];
    // setCtrdata(null);
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
    navigate("/");
  };
  useEffect(() => {
    allBikeloading();
  }, []);
  return (
    <Box>
      <Box minWidth="930px">
        <Box display="flex" justifyContent="space-between" m={2}>
          <Box>
            <img src={mainlogo} width={"120px"}></img>
          </Box>
          <Box m={1}>
            <Button
              variant="outlined"
              sx={{ borderRadius: "10px", height: "45px" }}
              onClick={logout}
            >
              <Box fontWeight={"600"} fontSize={"16px"}>
                로그아웃
              </Box>
            </Button>
          </Box>
        </Box>
        <Box
          m={3}
          mt={0}
          p={1}
          borderRadius="8px"
          border="1px solid #bdbdbd"
          display={"flex"}
        >
          <Box display={"flex"} justifyContent="center" width="80%">
            {/* <Box my={2} display={"flex"} alignItems={"center"}>
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
            </Box> */}
          </Box>
          <Box
            width="20%"
            display="flex"
            justifyContent={"flex-start"}
            py={1.7}
          >
            <Button
              variant="contained"
              onClick={() => allBikeloading()}
              sx={{ borderRadius: "13px", width: "100px", height: "50px" }}
            >
              <Box fontWeight={"700"} fontSize={"16px"}>
                검색
              </Box>
            </Button>
            <Box pl={3}>
              <Button
                variant="outlined"
                onClick={() => allBikeloading()}
                sx={{ borderRadius: "13px", width: "100px", height: "50px" }}
              >
                <Box fontWeight={"700"} fontSize={"16px"}>
                  새로고침
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          m={3}
          p={3}
          borderRadius="8px"
          border="1px solid #bdbdbd"
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
