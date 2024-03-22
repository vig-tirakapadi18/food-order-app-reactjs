import { useContext } from "react";
import styles from "./FruitItem.module.css";
import FruitItemForm from "./FruitItemForm";
import CartContext from "../../../store/cart-context";

const FruitItem = (props) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount,
            price: props.price,
        });
    };

    return (
        <li className={styles.fruit}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.desc}>{props.desc}</div>
                <div className={styles.price}>{`Rs ${props.price.toFixed(
                    2
                )}`}</div>
            </div>
            <div>
                <FruitItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default FruitItem;
