import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef((props, ref) => {
    return (
        <div className={styles.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input
                type="text"
                {...props.input}
                ref={ref}
            />
        </div>
    );
});

export default Input;
