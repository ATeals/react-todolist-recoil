// import { Outlet } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";

function Layout() {
    return (
        <>
            <GlobalStyle />
            <Outlet />
        </>
    );
}

export default Layout;
