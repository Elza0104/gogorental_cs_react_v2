import { createTheme } from "@mui/material";
import { pxToRem } from "../util"
import { /*LayoutGrade,*/ SIZE_INFO } from "../recoilStates/layout";

const { LG, MD, SM, XS } = SIZE_INFO;

const defaultTheme = createTheme({
  breakpoints:{
    values: {
      xs: XS.max,
      sm: SM.max,
      md: MD.max,
      lg: LG.max,
      xl: 1920,
    },
  },
});

const breakpoints = defaultTheme.breakpoints;
export type ComponentColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success";
export default createTheme({
  palette: {
    primary: {
      main: "#783489",
      light: "#C255B1",
      contrastText: "white"
    },
    secondary: {
      main: "#66B4B9",
      dark: "#CDCDCD",
      contrastText: "white"
    },
    text: {
      primary: "#000",
      secondary: "#9F9D9F",
    },
    success: {
      main: "#00C8B3",
      contrastText: "white"
    },
    info: {
      main: "#B2B2B2",
      contrastText: "white"
    },
    warning: {
      main: "#953735",
      light: "#C255B1",
      contrastText: "white"
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
      }
    `,
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          '&[role="radiogroup"]': { display: "block"},
        },
      },
    },
    MuiMenuItem: {
      variants: [
        {
          props: {},
          style: {
            "&:focus" : {
              outline: "soild black",
            },
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        select: {

        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: "Pretendard",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          "&.spacer": {
            flexGrow: 1,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          width: "100%",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        fontFamily: "Pretendard",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.black":{
            fontWeight: 700,
          },
          "&.bold":{
            fontWeight: 600,
          },
          "&.medium":{
            fontWeight: 500,
          },
          "&.regular":{
            fontWeight: 400,
          },
          "&.light":{
            fontWeight: 300,
          },
          "&.times":{
            fontFamily: "Pretendard",
          },
        },
        caption: {
          fontSize: pxToRem(14),
          [breakpoints.down(LG.max)]: {
            fontSize: pxToRem(9),
          },
          fontWeight: 500,
        },
        body2: {
          fontSize: pxToRem(14),
          fontWeight:500,
          fontFamily: "Pretendard",
        },
        body1: {
          fontSize: pxToRem(16),
          fontWeight:500,
          fontFamily: "Pretendard",
        },
        subtitle2: {
          fontSize: pxToRem(23),
          fontWeight:500,
          fontFamily: "Pretendard",
        },
        subtitle1: {
          fontSize: pxToRem(32),
          lineHeight: "45px",
          fontWeight:500,
          fontFamily: "Pretendard",
        },
        h6: {
          fontSize: pxToRem(60),
          [breakpoints.down(LG.max)]: {
            fontSize: pxToRem(30),
          },
          fontWeight: 500,
        },
        h5: {
          fontSize: pxToRem(90),
          [breakpoints.down(MD.max)]: {
            fontSize: pxToRem(20),
          },
          fontWeight: 500,
        },
        h4: {
          fontSize: pxToRem(50),
          [breakpoints.down(MD.max)]: {
            fontSize: pxToRem(25),
          },
          fontWeight: 500,
        },
      },
    },
  },
});