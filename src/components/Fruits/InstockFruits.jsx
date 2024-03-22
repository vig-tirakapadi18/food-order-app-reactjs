import { useEffect, useState } from "react";
import Card from "../UI/Card";
import FruitItem from "./FruitItem/FruitItem";
import styles from "./InstockFruits.module.css";
import loader from "../../assets/loader.svg";
import error from "../../assets/error.svg";

// const FRUITS = [
//     {
//         id: "f1",
//         name: "Watermelon",
//         desc: "Best treat for summer!",
//         price: 120,
//     },
//     {
//         id: "f2",
//         name: "Grapes",
//         desc: "Sweet and Tasty.",
//         price: 40,
//     },
//     {
//         id: "f3",
//         name: "Banana",
//         desc: "Rich in nutrients.",
//         price: 60,
//     },
//     {
//         id: "f4",
//         name: "Strawberry",
//         desc: "Vitamines & Minerals.",
//         price: 45,
//     },
//     {
//         id: "f5",
//         name: "Kiwi",
//         desc: "Loaded with Vitamin C.",
//         price: 150,
//     },
// ];

const InstockFruits = () => {
    const [fruits, setFruits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasHttpError, setHasHttpError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(
                "https://books-data-10a93-default-rtdb.asia-southeast1.firebasedatabase.app/fruits.json"
            );

            if (!resp.ok) {
                throw new Error("Something went wrong!");
            }

            const respData = await resp.json();

            const loadedData = [];

            for (let key in respData) {
                loadedData.push({
                    id: key,
                    name: respData[key].name,
                    desc: respData[key].desc,
                    price: respData[key].price,
                });
            }

            setFruits(loadedData);
            setIsLoading(false);
        };

        fetchData().catch((err) => {
            setIsLoading(false);
            setHasHttpError(err.message);
        });
    }, []);

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <img
                    src={loader}
                    alt="Loading..."
                />
            </div>
        );
    }

    if (hasHttpError) {
        return (
            <div className={styles.error}>
                <img
                    src={error}
                    alt="OOPS!"
                    className={styles["error-icon"]}
                />
                <div>{hasHttpError}</div>
            </div>
        );
    }

    return (
        <section className={styles.fruits}>
            <Card>
                <ul>
                    {fruits.map((fruit) => (
                        <FruitItem
                            key={fruit.id}
                            id={fruit.id}
                            name={fruit.name}
                            desc={fruit.desc}
                            price={fruit.price}
                        />
                    ))}
                </ul>
            </Card>
        </section>
    );
};

export default InstockFruits;
