import { createTheme,ThemeOptions } from "@mui/material";

export const customTheme:ThemeOptions=createTheme({
    palette:{
        mode:'dark',
        primary: {
            light: '#cfd8dc',
            main: '#607d8b',
            dark: '#455a64', 
          },
          secondary: {
            main: '#757575',
          },
          background: {
            paper: '#212121',
            default: '#212121',
          },
    }
});