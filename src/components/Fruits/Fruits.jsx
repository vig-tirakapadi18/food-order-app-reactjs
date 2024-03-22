import React, { Fragment } from "react";
import FruitsDetails from "./FruitsDetails";
import InstockFruits from "./InstockFruits";

const Fruits = () => {
    return (
        <Fragment>
            <FruitsDetails />
            <InstockFruits />
        </Fragment>
    );
};

export default Fruits;
