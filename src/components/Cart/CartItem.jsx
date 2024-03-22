import styles from "./CartItem.module.css";

const CartItem = (props) => {
    const price = `Rs ${props.price.toFixed(2)}`;

    return (
        <li className={styles["cart-item"]}>
            <div>
                <h2>{props.name}</h2>
                <div className={styles.details}>
                    <span className={styles.price}>{price}</span>
                    <span className={styles.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={props.onRemoveItem}>−</button>
                <button onClick={props.onAddItem}>+</button>
            </div>
        </li>
    );
};

export default CartItem;