import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length < 6;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredNameValue = nameRef.current.value;
        const enteredStreetValue = streetRef.current.value;
        const enteredPostalCodeValue = postalCodeRef.current.value;
        const enteredCityValue = cityRef.current.value;

        const enteredNameValueIsValid = !isEmpty(enteredNameValue);
        const enteredStreetValueIsValid = !isEmpty(enteredStreetValue);
        const enteredCityValueIsValid = !isEmpty(enteredCityValue);
        const enteredPostalCodeIsValid = !isSixChars(enteredPostalCodeValue);

        setFormValidity({
            name: enteredNameValueIsValid,
            street: enteredStreetValueIsValid,
            city: enteredCityValueIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredNameValueIsValid &&
            enteredStreetValueIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityValueIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirmData({
            name: enteredNameValue,
            street: enteredStreetValue,
            postalCode: enteredPostalCodeValue,
            city: enteredCityValue,
        });
    };

    const nameControlClasses = `${styles.control} ${
        formValidity.name ? "" : styles.invalid
    }`;
    const streetControlClasses = `${styles.control} ${
        formValidity.street ? "" : styles.invalid
    }`;
    const postalCodeControlClasses = `${styles.control} ${
        formValidity.postalCode ? "" : styles.invalid
    }`;
    const cityControlClasses = `${styles.control} ${
        formValidity.city ? "" : styles.invalid
    }`;

    return (
        <form
            onSubmit={confirmHandler}
            className={styles.form}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    ref={nameRef}
                />
                {!formValidity.name && <p>Please enter a valid Name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    ref={streetRef}
                />
                {!formValidity.street && <p>Please enter a Street Name!</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    ref={postalCodeRef}
                />
                {!formValidity.postalCode && (
                    <p>Please enter a valid Postal Code(Must be 6 chars)!</p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    ref={cityRef}
                />
                {!formValidity.city && <p>Please enter a valid City!</p>}
            </div>
            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={props.onHideCart}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.submit}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
