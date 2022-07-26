import '../styles/globals.css';
import '../styles/index.css';

// import { AppProps } from "next/app";
import CssBaseline from '@mui/material/CssBaseline';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import MainLayout from '../components/Layouts/MainLayout';

// the chain id 4 represents the rinkeby network and
//the injected connector is a web 3 connection method used by meta mask
const supportedChainIds = [4];
const connectors = {
  injected: {}
};

import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Navigation from '../components/Navigation';

const themeColors = {
  purple: {
    main: '#C200FB',
    light: '#CE33FB',
    dark: '#8700AF',
    contrastText: '#FFFFFF'
  },
  pink: {
    main: '#FF6685',
    light: '#FF849D',
    dark: '#B2475D',
    contrastText: rgbToHex('rgba(0, 0, 0, 0.87)')
  },
  brown: {
    main: '#714732',
    light: '#BB8063'
  },
  yellow: {
    main: '#FFAE03',
    light: '#FFBE35',
    dark: '#B27902',
    contrastText: rgbToHex('rgba(0, 0, 0, 0.87)')
  },
  orange: {
    main: '#E25E17',
    light: '#E77E45',
    dark: '#9E4110',
    contrastText: '#FFFFFF'
  },
  whiteBackground: {
    main: '#FFE0C2',
    light: '#FFF5EB'
  },
  white: {
    main: '#FFE0C2',
    dark: '#858585'
  },
  dark: {
    main: '#00171f'
  }
};

const darkTheme = createTheme(themeColors, {
  palette: {
    mode: 'dark',
    background: {
      main: themeColors.brown.main,
      paper: themeColors.brown.light,
      default: themeColors.brown.main
    },
    text: {
      primary: '#FFEBEE',
      secondary: '#FFCDD2',
      hint: '#aaaaaa',
      disabled: '#aaaaaa'
    },
    primary: {
      main: themeColors.purple.main,
      light: themeColors.purple.light,
      dark: themeColors.purple.dark,
      contrastText: themeColors.purple.contrastText
    },
    secondary: {
      main: '#933548',
      light: themeColors.pink.light,
      dark: themeColors.pink.dark,
      contrastText: themeColors.pink.contrastText
    },
    error: {
      main: themeColors.orange.main,
      light: themeColors.orange.light,
      dark: themeColors.orange.dark,
      contrastText: themeColors.orange.contrastText
    },
    warning: {
      main: themeColors.yellow.main,
      light: themeColors.yellow.light,
      dark: themeColors.yellow.dark,
      contrastText: themeColors.yellow.contrastText
    }
  }
});

const lightTheme = createTheme(themeColors, {
  palette: {
    mode: 'light',
    background: {
      main: themeColors.whiteBackground.main,
      paper: themeColors.whiteBackground.light,
      default: themeColors.whiteBackground.main
    },
    text: {
      primary: '#161616',
      secondary: '#525050',
      hint: '#aaaaaa',
      disabled: '#aaaaaa'
    },
    primary: {
      main: themeColors.purple.main,
      light: themeColors.purple.light,
      dark: themeColors.purple.dark,
      contrastText: themeColors.purple.contrastText
    },
    secondary: {
      main: themeColors.pink.main,
      light: themeColors.pink.light,
      dark: themeColors.pink.dark,
      contrastText: themeColors.pink.contrastText
    },
    error: {
      main: themeColors.orange.main,
      light: themeColors.orange.light,
      dark: '#ED8045',
      contrastText: themeColors.orange.contrastText
    },
    warning: {
      main: themeColors.yellow.main,
      light: themeColors.yellow.light,
      dark: themeColors.yellow.dark,
      contrastText: themeColors.yellow.contrastText
    }
  }
});

const theme = {
  typography: {
    root: {
      textTransform: 'lowercase'
    },
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    button: {
      textTransform: 'lowercase'
    }
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
};

const MyApp = ({ Component, pageProps }) => {
  const [themeColor, setThemeColor] = useState(true);
  const getLightorDarkTheme = (isLightTheme) => {
    return isLightTheme === true
      ? createTheme(lightTheme, {
          ...theme
        })
      : createTheme(darkTheme, {
          ...theme
        });
  };
  return (
    <ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
      <ThemeProvider theme={getLightorDarkTheme(themeColor)}>
        <CssBaseline />
        <Navigation themeColor={themeColor} setThemeColor={setThemeColor} />
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </ThirdwebWeb3Provider>
  );
};

export default MyApp;
