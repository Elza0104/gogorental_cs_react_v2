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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { postAxios } from "../hooks/Axiosinstance";
import { SingleBtnDialog } from "../component/basic/dialog/singleBtnDialog";

const PasswordChaegePage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordRule, setIsPasswordRule] = useState<boolean>(false);
  const [isPasswordRule2, setIsPasswordRule2] = useState<boolean>(false);
  const [isPasswordDup, setIsPasswordDup] = useState<boolean>(false);
  const [isPasswordDup2, setIsPasswordDup2] = useState<boolean>(false);
  const [pwChangeFail, setPwChangeFail] = useState<boolean>(false);
  const [pwChangeError, setPwChangeError] = useState<boolean>(false);
  const [pwChanged, setPwChanged] = useState<boolean>(false);
  if (window.sessionStorage.getItem("accessToken") == null) {
    navigate("/");
  }
  const autoPayON = async () => {
    if (
      !isPasswordRule &&
      !isPasswordDup &&
      password != null &&
      passwordCheck != null
    ) {
      try {
        let temp = {
          password: password,
        };
        let userData = await postAxios(
          `admin/auth/password-change-request`,
          temp
        );
        if (userData.data.header.resultStatus === 200) {
          //console.log("qwe")
          setPwChanged(true);
        }
      } catch (err) {
        //console.log(err)
        setPwChangeError(true);
      }
    } else {
      setPwChangeFail(true);
    }
  };
  var regExp =
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/;
  useEffect(() => {
    if (password === passwordCheck) {
      setIsPasswordDup2(false);
      setIsPasswordDup(false);
    } else {
      setIsPasswordDup(true);
    if(passwordCheck.length == 0){
      setIsPasswordDup2(false);

    }
    else{
      setIsPasswordDup2(true);

    }
    }
    if (
      password.match(regExp) &&
      password.length < 16 &&
      password.length >= 10 
    ) {
      setIsPasswordRule(false);
      setIsPasswordRule2(false);
    } else {
      
      setIsPasswordRule(true);
      if(password.length == 0){
        setIsPasswordRule2(false);
    
      }
      else{
        setIsPasswordRule2(true);

      }
    }
    
  }, [password, passwordCheck]);

  const onClickBtn = () => {
    navigate("/");
  };
  return (
    <Box>
      <SingleBtnDialog
        open={pwChangeError}
        btntext="확인"
        btnFn={() => setPwChangeError(false)}
        children={
          <Box>
            <Box display="flex" justifyContent={"center"} mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={"400"}
                color={"#999999"}
                sx={{ width: "85%", textAlign: "center" }}
              >
                시스템 오류. 재접속을 권장합니다.
              </Typography>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={pwChangeFail}
        btntext="확인"
        btnFn={() => setPwChangeFail(false)}
        children={
          <Box>
            <Box display="flex" justifyContent={"center"} mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={"400"}
                color={"#999999"}
                sx={{ width: "85%", textAlign: "center" }}
              >
                비밀번호를 정상적으로 입력해주세요.
              </Typography>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={pwChanged}
        btntext="로그인"
        btnFn={() => onClickBtn()}
        children={
          <Box>
            <Box display="flex" justifyContent={"center"} mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={"400"}
                color={"#999999"}
                sx={{ width: "85%", textAlign: "center" }}
              >
                비밀번호가 변경되었습니다.
              </Typography>
            </Box>
          </Box>
        }
      />

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
          <Typography fontSize={"17px"} fontWeight={"590"}>
            임시 비밀번호 변경
          </Typography>
        </Box>
      </Box>
      <Box mx={2}>
        <Box>
          <Typography>새로운 비밀번호를 입력해주세요.</Typography>
        </Box>
        <Box>
          <Box
            mt={2}
            mb={1}
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Typography fontSize={"15px"} fontWeight={"600"}>
              비밀번호
            </Typography>
            <Typography color={"#999999"} fontSize={"12px"} fontWeight={"500"}>
              ❖ 영문자, 숫자, 특수문자 중 2종류 이상
            </Typography>
          </Box>
          <Box mt={1}>
            <TextField
              fullWidth
              type="password"
              spellCheck="false"
              placeholder="10~15자 내 입력"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                sx: {
                  fontSize: "13px",
                  fontWeight: "500",
                },
              }}
              sx={
                isPasswordRule2
                  ? {
                      "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E30808",
                          borderWidth: "1px",
                          borderRadius: "10px",
                        },
                        "&.Mui-focused": {
                          borderRadius: "10px",
                          backgroundColor: "#FCE6E6",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#E30808",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "#FCE6E6",
                          "&.Mui-focused": {
                            color: "#FCE6E6",
                          },
                        },
                        "&:hover fieldset": {
                          borderColor: "#E30808",
                        },
                      },
                      input: {
                        "&:: placeholder": {
                          color: "#E30808",
                        },
                      },
                    }
                  : {
                      color: "#FCE6E6",

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
                    }
              }
            />
            {isPasswordRule2 ? (
                  <Typography
                color={"#E30808"}
                fontSize={"12px"}
                fontWeight={"500"}
                mt={0.5}
                ml={1}
              >
                비밀번호 작성 규칙에 맞지 않아요.
              </Typography>
              
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <Box>
          <Box mt={2} mb={1} display={"flex"}>
            <Typography fontSize={"15px"} fontWeight={"600"}>
              비밀번호 확인
            </Typography>
          </Box>
          <Box mt={1}>
            <TextField
              fullWidth
              type="password"
              spellCheck="false"
              placeholder="위 비밀번호와 동일하게 입력해주세요"
              variant="outlined"
              onChange={(e) => {
                setPasswordCheck(e.target.value);
              }}
              InputProps={{
                sx: {
                  fontSize: "13px",

                  fontWeight: "500",
                },
              }}
              sx={isPasswordDup2
                ? {
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E30808",
                        borderWidth: "1px",
                        borderRadius: "10px",
                      },
                      "&.Mui-focused": {
                        borderRadius: "10px",
                        backgroundColor: "#FCE6E6",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E30808",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "#FCE6E6",
                        "&.Mui-focused": {
                          color: "#FCE6E6",
                        },
                      },
                      "&:hover fieldset": {
                        borderColor: "#E30808",
                      },
                    },
                    input: {
                      "&:: placeholder": {
                        color: "#E30808",
                      },
                    },
                  }
                : {
                    color: "#FCE6E6",

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
            {isPasswordDup ? (
              <>
                {passwordCheck.length != 0?
                <Typography
                color={"#E30808"}
                fontSize={"12px"}
                fontWeight={"500"}
                mt={0.5}
                ml={1}
              >
                비밀번호가 일치하지 않아요.
              </Typography>
              :
              <></>

                }
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
      <Box mx={-1} position="fixed" bottom="0px" width="100%">
        <Button
          variant="contained"
          onClick={autoPayON}
          sx={{ borderRadius: "0px", width: "100%", height: "80px" }}
        >
          <Typography>변경하기</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default PasswordChaegePage;
