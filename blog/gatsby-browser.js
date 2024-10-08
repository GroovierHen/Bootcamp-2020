import * as React from 'react'

import Enhancer from "./src/utils/Enhancer";

import "./src/styles/normalize.css"
import "./src/styles/style.css"

export const wrapRootElement = ({ element }) => (
    <Enhancer>
        {element}
    </Enhancer>
);