import Card from "../UI/Card";
import FruitItem from "./FruitItem/FruitItem";
import styles from "./InstockFruits.module.css";

const FRUITS = [
    {
        id: "f1",
        name: "Watermelon",
        desc: "Best treat for summer!",
        price: 120,
    },
    {
        id: "f2",
        name: "Grapes",
        desc: "Sweet and Tasty.",
        price: 40,
    },
    {
        id: "f3",
        name: "Banana",
        desc: "Rich in nutrients.",
        price: 60,
    },
    {
        id: "f4",
        name: "Strawberry",
        desc: "Vitamines & Minerals.",
        price: 45,
    },
    {
        id: "f5",
        name: "Kiwi",
        desc: "Loaded with Vitamin C.",
        price: 150,
    },
];

const InstockFruits = () => {
    return (
        <section className={styles.fruits}>
            <Card>
                <ul>
                    {FRUITS.map((fruit) => (
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
