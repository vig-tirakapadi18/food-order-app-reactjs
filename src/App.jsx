import { useState } from "react";
import Header from "./components/Layout/Header";
import Fruits from "./components/Fruits/Fruits";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {
    const [isCartShown, setIsCartShown] = useState(false);

    const showCartHandler = () => {
        setIsCartShown(true);
    };

    const hideCartHandler = () => {
        setIsCartShown(false);
    };

    return (
        <CartProvider>
            {isCartShown && <Cart onHideCart={hideCartHandler} />}
            <Header
                onShowCart={showCartHandler}
                onHideCart={hideCartHandler}
            />
            <main>
                <Fruits />
            </main>
        </CartProvider>
    );
};

export default App;
