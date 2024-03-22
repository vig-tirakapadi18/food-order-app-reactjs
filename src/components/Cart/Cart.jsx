import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import checkMark from "../../assets/check.svg";
import loader from "../../assets/loader.svg";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const addItemToCartHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const removeItemFromCartHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderDataHandler = async (userInfo) => {
        setIsSubmitting(true);
        await fetch(
            "https://books-data-10a93-default-rtdb.asia-southeast1.firebasedatabase.app/fruitsOrders.json",
            {
                method: "POST",
                body: JSON.stringify({
                    user: userInfo,
                    orderedItems: cartCtx.items,
                }),
            }
        );

        setIsSubmitting(false);
        setIsSubmitted(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemoveItem={removeItemFromCartHandler.bind(null, item.id)}
                    onAddItem={addItemToCartHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {isCheckout && (
                <Checkout
                    onHideCart={props.onHideCart}
                    onConfirmData={submitOrderDataHandler}
                />
            )}
            {!isCheckout && (
                <div className={styles.actions}>
                    <button
                        className={styles["button--alt"]}
                        onClick={props.onHideCart}>
                        Close
                    </button>
                    {hasItems && (
                        <button
                            className={styles.button}
                            onClick={orderHandler}>
                            Order
                        </button>
                    )}
                </div>
            )}
        </Fragment>
    );

    const submittingModalContent = (
        <Fragment>
            <div className={styles.loader}>
                <img
                    src={loader}
                    alt="Loading..."
                />
            </div>
        </Fragment>
    );

    const submittedModalData = (
        <Fragment>
            <div className={styles["success-msg"]}>
                <p>Cart data submitted successfully!</p>
                <img
                    src={checkMark}
                    alt="success"
                    className={styles["check-mark"]}
                />
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.button}
                    onClick={props.onHideCart}>
                    Close
                </button>
            </div>
        </Fragment>
    );

    return (
        <Modal onHideCart={props.onHideCart}>
            {!isSubmitting && !isSubmitted && cartModalContent}
            {isSubmitting && submittingModalContent}
            {!isSubmitting && isSubmitted && submittedModalData}
        </Modal>
    );
};

export default Cart;
