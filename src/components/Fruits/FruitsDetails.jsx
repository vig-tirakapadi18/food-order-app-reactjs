import styles from "./FruitsDetails.module.css";

const FruitsDetails = () => {
    return (
        <section className={styles.detail}>
            <h2>Delicious Food, Delivered To You</h2>
            <p>
                Choose your favorite fruits from our broad selection of
                available fruits and enjoy a delicious fruits as desserts after
                lunch or dinner at home.
            </p>
            <p>
                All our fruits are fresh with high-quality, just-in-time and of
                course without any harmful chemicals!
            </p>
        </section>
    );
};

export default FruitsDetails;
