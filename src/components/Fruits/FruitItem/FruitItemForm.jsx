import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./FruitItemForm.module.css";

const FruitItemForm = (props) => {
    const [isAmountValid, setIsAmountValid] = useState(true);
    const inputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const inputValue = inputRef.current.value;
        const inputValueNumber = +inputValue;

        if (
            inputValue.trim().length === 0 ||
            inputValueNumber < 1 ||
            inputValueNumber > 5
        ) {
            setIsAmountValid(true);
            return;
        }

        props.onAddToCart(inputValueNumber);
    };

    return (
        <form
            action=""
            className={styles.form}
            onSubmit={submitHandler}>
            <Input
                ref={inputRef}
                label="Amount"
                input={{
                    id: "amount",
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button>+ Add</button>
            {!isAmountValid && (
                <p className={styles["error-msg"]}>
                    Please enter a valid value!(Must be greater than 1 & less
                    than 5)
                </p>
            )}
        </form>
    );
};

export default FruitItemForm;
