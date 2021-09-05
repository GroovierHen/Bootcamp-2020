import * as React from 'react'

import Enhancer from "./src/utils/Enhancer";

export const wrapRootElement = ({ element }) => (
    <Enhancer>
        {element}
    </Enhancer>
);