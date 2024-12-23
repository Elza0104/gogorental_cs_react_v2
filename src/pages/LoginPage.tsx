import {
  Box,
  TextField,
  Dialog,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAxios, LoginAxios } from "../hooks/Axiosinstance";
import { BasicButton } from "../component/basic/button/basicButton";
import { useNavigate } from "react-router-dom";
import Layout from "../component/layout/main";
import { SingleBtnDialog } from "../component/basic/dialog/singleBtnDialog";
import Cookies from "js-cookie";
import {
  FormControl,
  FormControlLabel,
  useMediaQuery,
} from "@material-ui/core";
import { Margin } from "@mui/icons-material";

const mainlogo = require("../assets/img/mainlogo.png");

const LoginPage = () => {
  const innerHeight = window.innerHeight;
  const navigate = useNavigate();
  //console.log(innerHeight)
  const [LoginData, setLoginData] = useState("");
  const [LoginId, setLoginId] = useState("");
  const [LoginPw, setLoginPw] = useState("");
  const [LoginFail, setLoginFail] = useState<boolean>(false);
  const [LoginError, setLoginError] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const loginFn = () => {
    const login = async () => {
      try {
        let temp = {
          loginId: LoginId,
          password: LoginPw,
        };
        //console.log(temp)
        const logindata = await LoginAxios(`auth/login`, temp);
        if (logindata.status === 200) {
          console.log(logindata)
          sessionStorage.setItem(
            "accessToken",
            logindata.data.data.jwt
          );   
          localStorage.setItem(
            "refreshToken",
            logindata.data.data.refreshJwt
          );
          // try {
          //   const pwCheck = await getAxios(`admin/auth/password-change-check`);
          //   //console.log(pwCheck.data.body == false)
          //   if (pwCheck.data.body == false) {
          //     //console.log(1)
          //     navigate("/pwchange");
          //     return;
          //   }
          // } catch (err: any) {}
          if (isMobile) {
            navigate("/mobile");
          } else {
            navigate("/main");
          }
        }
      } catch (err: any) {
        setLoginFail(true);
        //console.log(err)
      }
    };
    login();
  };

  return (
    <Layout>
      <SingleBtnDialog
        open={LoginError}
        btntext="확인"
        btnFn={() => setLoginError(false)}
        children={
          <Box>
            <Box display="flex" justifyContent={"center"}>
              <Typography
                fontSize="1.125rem"
                fontWeight={"600"}
                color={"#444444"}
              >
                시스템 오류
              </Typography>
            </Box>
            <Box display="flex" justifyContent={"center"} mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={"400"}
                color={"#999999"}
                sx={{ width: "85%", textAlign: "center" }}
              >
                일시적인 오류로 로그인을 할 수 없습니다. 잠시 후 다시
                시도해주세요.
              </Typography>
            </Box>
          </Box>
        }
      />
      <SingleBtnDialog
        open={LoginFail}
        setOpen={setLoginFail}
        btntext="확인"
        btnFn={() => setLoginFail(false)}
        children={
          <Box>
            <Box display="flex" justifyContent={"center"}>
              <Typography
                fontSize="1.125rem"
                fontWeight={"600"}
                color={"#444444"}
              >
                로그인 실패
              </Typography>
            </Box>
            <Box display="flex" justifyContent={"center"} mt={1}>
              <Typography
                fontSize="14px"
                fontWeight={"400"}
                color={"#999999"}
                sx={{ width: "75%", textAlign: "center" }}
              >
                아이디 또는 비밀번호가 맞지 않아요. 다시 확인하신 후 입력해
                주세요.
              </Typography>
            </Box>
          </Box>
        }
      />
      <Box
        height={`${innerHeight}px`}
        px={2}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box textAlign={"center"}>
          <img src={mainlogo} width="60%"></img>
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={1}>
          <Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography fontSize={"18px"}>센터 관리자</Typography>
            </Box>
            <Box
              width={"120px"}
              sx={{ background: "#C446E321" }}
              height={"12px"}
              position="relative"
              bottom={13}
              borderRadius={"20px"}
            />
          </Box>
        </Box>
        <Box mt={5}>
          <TextField
            key="inputId"
            placeholder="아이디"
            fullWidth
            spellCheck="false"
            type="id"
            InputProps={{
              sx: {
                fontSize: "13px",
                fontWeight: "500",
              },
            }}
            InputLabelProps={{
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
            onChange={(e) => setLoginId(e.target.value)}
          />
          <Box mt={1}>
            <TextField
              key="inputPw"
              placeholder="비밀번호"
              fullWidth
              type="password"
              spellCheck="false"
              InputProps={{
                sx: {
                  fontSize: "13px",

                  fontWeight: "500",
                },
              }}
              InputLabelProps={{
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
              onChange={(e) => setLoginPw(e.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <FormControlLabel
            label={
              <Typography
                fontWeight="500"
                fontSize="13px"
                color="#777777"
                style={{ marginLeft: "6px" }}
              >
                자동 로그인
              </Typography>
            }
            control={<Checkbox style={{ width: "16px" }} />}
            style={{ marginLeft: "9px" }}
          />
        </Box>
        <Box mt={5}>
          <Button
            variant="contained"
            fullWidth
            onClick={loginFn}
            sx={{
              height: "52px",
              borderRadius: "10px",
            }}
          >
            <Typography fontWeight={700} fontSize={"16px"}>
              로그인
            </Typography>
          </Button>
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={18}>
          <Typography fontSize={"13px"} color={"#B7B7B7"} fontWeight={"400"}>
            ⓒ GOGO F&D Corp. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginPage;
