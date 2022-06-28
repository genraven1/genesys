import { BrowserRouter } from "react-router-dom";
import MainPage from "./HomePage";
import NavBar from "./navigation/NavBar";
import {createTheme, ThemeProvider} from "@mui/material";


export default function App() {

    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        }
    })

    return (
        <ThemeProvider theme={darkTheme} >
            <BrowserRouter>
                <NavBar />
                <MainPage />
            </BrowserRouter>
        </ThemeProvider>
    )
}