import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [isBtnAnimated, setIsBtnAnimated] = useState(false);
    const cartCtx = useContext(CartContext);

    const numOfCartItems = cartCtx.items.reduce(
        (currNum, item) => currNum + item.amount,
        0
    );

    const btnClasses = `${styles.button} ${isBtnAnimated ? styles.bump : ""}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setIsBtnAnimated(true);

        const timer = setTimeout(() => {
            setIsBtnAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    return (
        <button
            className={btnClasses}
            onClick={props.onShowCart}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
