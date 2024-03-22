import React, { Fragment } from "react";
import fruitsImg from "../../assets/fruits.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>Fruits</h1>
                <HeaderCartButton
                    onShowCart={props.onShowCart}
                    onHideCart={props.onHideCart}
                />
            </header>
            <div className={styles["main-image"]}>
                <img
                    src={fruitsImg}
                    alt="Fruits"
                />
            </div>
        </Fragment>
    );
};

export default Header;
