import React from "react";
import classes from "./Home.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Home = props => {
    return (
        <div className={classes.home_container}>
            <p>HOME PAGE</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authStatus: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);