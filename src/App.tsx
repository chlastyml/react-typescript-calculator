import React, { Component } from "react";
import Calculator from "./components/Calculator";

export class App extends Component {
    render() {
        return <>
            <Calculator />
            <Calculator />
            <Calculator />
        </>;
    }
}

export default App;
