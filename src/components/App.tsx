import { BrowserRouter } from "react-router-dom";
import MainPage from "./HomePage";
import NavBar from "./navigation/NavBar";


export default function App() {

    return (
        <BrowserRouter>
            <NavBar />
            <MainPage />
        </BrowserRouter>
    )
}