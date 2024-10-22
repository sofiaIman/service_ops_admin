import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#004138",
          500: "#000000",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#DCDCDC", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[800], // Use a neutral or grey background
              paper: colors.primary[900],   // Paper-like surfaces (e.g., cards, modals) use this color
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fbfbfb",
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#95eec5" : "#b13d33", // Change icon color based on mode
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? colors.primary[100] : colors.greenAccent[500], // Customize text color for Tabs
            "&.Mui-selected": {
              color: mode === "light" ? colors.primary[500] : colors.greenAccent[500], // Customize text color for selected Tab
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            color: mode === "dark" ? "#FFFFFF" : "#FFFFFF", // Customize text color for contained button
            backgroundColor: mode === "dark" ? colors.greenAccent[800]: colors.redAccent[500], // Customize background color for contained button
            '&:hover': {
              backgroundColor: mode === "dark" ? colors.greenAccent[700] : colors.redAccent[300], // Customize hover background color for contained button
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#FFFFFF" : "#000000", // Set label color based on mode
            '&.Mui-focused': {
              color: mode === "dark" ? "#70d8bd" : "#004138", // Customize focused label color
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: mode === "dark" ? "#FFFFFF" : "#000000", // Change dropdown icon color based on mode
          },
        },
      },
      MuiOutlinedInput: {
  styleOverrides: {
    root: {
      backgroundColor: mode === 'dark' ? '#1e1e1e' : '#FFFFFF', // Set the default background color
      '&.Mui-focused': {
        backgroundColor: mode === 'dark' ? '#1e1e1e' : '#FFFFFF', // Keep the same color when focused
      },
      '&:hover': {
        backgroundColor: mode === 'dark' ? '#2a2a2a' : '#f7f7f7', // Set a more neutral hover color
      },
      '&.Mui-disabled': {
        backgroundColor: mode === 'dark' ? '#3d3d3d' : '#e0e0e0', // Set the disabled background color
      },
      '& .MuiOutlinedInput-input': {
        color: mode === 'dark' ? '#FFFFFF' : '#000000', // Ensure the text color is appropriate
      },
      '& fieldset': {
        borderColor: mode === 'dark' ? '#525252' : '#c4c4c4', // Control the border color to prevent bluish appearance
      },
      '&.Mui-focused fieldset': {
        borderColor: mode === 'dark' ? '#70d8bd' : '#004138', // Change border color when focused
      },
    },
  },
},
      
      // MuiTextField: {
      //   styleOverrides: {
      //     root: {
      //       color: mode === "dark" ? colors.primary[100] : colors.primary[700], // Customize text color for TextField
      //     },
      //   },
      // },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
