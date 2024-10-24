import {useLocation} from "react-router-dom";
import {Fragment} from "react";
import ViewAllCareers from "./ViewAllCareers";
import {RootPath} from "../../services/RootPath";
import CareerPage from "./CareerPage";

export default function CareerWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Career) ? <ViewAllCareers/> : <CareerPage/>}
        </Fragment>
    )
}