import Aux from "../../hoc/Auxy";
import React from "react";

const Layout = (props) => {
    const preventDefault = (e) => {
        e.preventDefault();
    }
    return (
        <Aux>
            <main onClick={preventDefault}>{props.children}</main>
        </Aux>
    )
}

export default Layout;