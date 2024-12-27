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
import { getAxios } from "../hooks/Axiosinstance";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  formatBirth6th,
  formatDate,
  formatDateTime,
  formatDayjs,
  formatPhoneNumber,
} from "../util";
import dayjs from "dayjs";

const mainlogo = require("../assets/img/mainlogo.png");

const MainPage = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [bikedata, setBikedata] = useState([]);

  const [agencyName, setAgencyName] = useState("all");
  const [ctrStatus, setCtrStatus] = useState("all");
  const [userName, setUserName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [bikeNum, setBikeNum] = useState("");

  const [agencyNameSelect, setAgencyNameSelect] = useState([]);
  const [ctrStatusSelect, setCtrStatusSelect] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "insDtm",
      headerName: "등록일자",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "agcyNm",
      headerName: "센터명",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bikeModel",
      headerName: "모델명",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "bikeNumber",
      headerName: "차량번호",
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
      field: "ssn",
      headerName: "생년월일",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "phoneNm",
      headerName: "휴대폰번호",
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
      field: "amount",
      headerName: "결제액",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "id",
      headerName: "계약 id",
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
              width: "100px",
            }}
          >
            {params.row.contractStatus}
          </Button>
        );
      },
    },
  ];
  function ctrDetailFn(id: any) {
    navigate("/main/ctrdetail", {
      state: {
        id: id,
      },
    });
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

  const resetSearch = () => {
    setAgencyName("all");
    setCtrStatus("all");
    setUserName("");
    setUserPhoneNum("");
    setBikeNum("");
  };
  const agencyLoading = async () => {
    try {
      await getAxios(`cs/getAgency?`).then((response) => {
        const array = response.data.data;

        setAgencyNameSelect(array);
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const ctrStatusloading = async () => {
    try {
      await getAxios(`cs/getContractStatus?`).then((response) => {
        const array = response.data.data;

        setCtrStatusSelect(array);
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const allBikeloading = async () => {
    try {
      const params = new URLSearchParams();

      if (agencyName !== "all" && agencyName) {
        params.append("paramAgencyIds", agencyName);
      }
      if (ctrStatus !== "all" && ctrStatus) {
        params.append("status", ctrStatus);
      }
      if (userName) {
        params.append("name", userName);
      }
      if (userPhoneNum) {
        params.append("phoneNumber", userPhoneNum);
      }
      if (bikeNum) {
        params.append("bikeNumber", bikeNum);
      }
      await getAxios(
        `agency/getContracts?${params.toString()}` +
          `&page=0&size=1000` +
          `&startDate=${formatDayjs(dayjs().subtract(3, "month"))}` +
          `&endDate=${formatDayjs(dayjs().add(1, "year"))}`
      ).then((response) => {
        const array = response.data.data.content.map((val: any, idx: any) => ({
          id: val.id,
          agcyNm: val.agencyName,
          insDtm: formatDate(val.insDtm),
          name: val.customerName,
          phoneNm: formatPhoneNumber(val.customerPhone),
          amount: val.amount,
          ctrStartTime: formatDateTime(val.ctrStartTime),
          ctrEndTime: formatDateTime(val.ctrEndTime),
          contractStatus: val.contractStatus,
          ssn: formatBirth6th(val.customerSsn),
          bikeModel: val.bikeModel,
          bikeNumber: val.bikeNumber,
        }));

        setBikedata(array);
      });
    } catch (err: any) {
      console.log(err);
    }
  };
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    allBikeloading();
    agencyLoading();
    ctrStatusloading();
  }, []);
  return (
    <Box>
      <Box minWidth="1400px">
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
          <Box display={"flex"} justifyContent="center" width="80%" my={1}>
            <Box ml={3} alignItems={"center"}>
              <Typography className="bold" fontSize="15px" pb={1}>
                센터명
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  width: "220px",
                }}
              >
                <Select
                  color="primary"
                  defaultValue={"all"}
                  sx={{ height: "55px", borderRadius: "10px" }}
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                >
                  <MenuItem value="all">전체</MenuItem>
                  {agencyNameSelect.map((val: any, idx: any) => {
                    return (
                      <MenuItem key={idx} value={val.id}>
                        {val.agencyName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box ml={3} alignItems={"center"}>
              <Typography className="bold" fontSize="15px" pb={1}>
                대여상태
              </Typography>
              <FormControl
                variant="outlined"
                sx={{
                  width: "180px",
                }}
              >
                <Select
                  color="primary"
                  defaultValue={"all"}
                  sx={{ height: "55px", borderRadius: "10px" }}
                  value={ctrStatus}
                  onChange={(e) => setCtrStatus(e.target.value)}
                >
                  <MenuItem value="all">전체</MenuItem>
                  {Object.entries(ctrStatusSelect).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box ml={3} alignItems={"center"}>
              <Typography className="bold" fontSize="15px" pb={1}>
                예약자명
              </Typography>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                style={{
                  width: "120px",
                }}
                placeholder="예: 홍길동"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Box>
            <Box ml={3} alignItems={"center"}>
              <Typography className="bold" fontSize="15px" pb={1}>
                휴대폰번호
              </Typography>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                style={{
                  width: "170px",
                  fontSize: "16px",
                }}
                placeholder="예: 01012345678"
                value={userPhoneNum}
                onChange={(e) => setUserPhoneNum(e.target.value)}
              />
            </Box>
            <Box ml={3} alignItems={"center"}>
              <Typography className="bold" fontSize="15px" pb={1}>
                차량번호
              </Typography>
              <TextField
                InputProps={{ sx: { borderRadius: "10px" } }}
                style={{
                  width: "170px",
                }}
                placeholder="예: 서울길동홍1234"
                value={bikeNum}
                onChange={(e) => setBikeNum(e.target.value)}
              />
            </Box>
          </Box>
          <Box
            width="20%"
            display="flex"
            justifyContent={"flex-start"}
            alignItems={"center"}
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
                onClick={() => resetSearch()}
                sx={{ borderRadius: "13px", width: "100px", height: "50px" }}
              >
                <Box fontWeight={"700"} fontSize={"16px"}>
                  새로고침
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box m={3} p={3} borderRadius="8px" border="1px solid #bdbdbd">
          <DataGrid
            rowHeight={50}
            columns={columns}
            rows={bikedata}
            initialState={{
              pagination: { paginationModel: { pageSize: 12 } },
            }}
            // disableColumnFilter
            // disableColumnSorting
            // disableColumnResize
            // disableColumnMenu
            // showColumnVerticalBorder
            // disableRowSelectionOnClick
            // slots={{
            //   pagination: CustomPagination,
            // }}
            sx={{
              marginX: "10px",
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
