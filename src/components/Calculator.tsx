import math from "mathjs";
import React, { Component } from "react";
import "../css/Calculator.css";
import Button from "./Button";
import Buttons from "./Buttons";
import { Display } from "./Display";

type Props = {};
type States = typeof initialState;

const initialState = {
    operations: new Array<string>(),
};

class Calculator extends Component<Props, States> {
    state = initialState;

    calculateOperations = () => {
        let result = this.state.operations.join("");
        if (result) {
            result = math.eval(result);
            result = math.format(result, { precision: 14 });
            result = String(result);
            this.setState({
                operations: result.split(""),
            });
        }
    }
    processNumber = (value: string) => {
        switch (value) {
            case "Delete":
                this.setState({
                    operations: [],
                });
                break;
            case "Backspace":
                const copy = [...this.state.operations];
                copy.pop();
                this.setState({
                    operations: copy,
                });
                break;
            case "Enter":
                this.calculateOperations();
                break;
            default:
                if (value === "0" && this.state.operations.length === 0) { break; }
                this.setState({
                    operations: [...this.state.operations, value],
                });
                break;
        }
    }
    handleClick = (e: any) => {
        const value = e.target.getAttribute("data-value");
        this.processNumber(value);
    }

    handleKeyDown = (e: any) => {
        const value = e.code === "Space" ? "0" : e.key;
        if (
            (new RegExp("[0-9]")).test(value) ||
            value === "Delete" ||
            value === "Backspace" ||
            value === "Enter" ||
            value === "/" ||
            value === "*" ||
            value === "-" ||
            value === "+") {
            this.processNumber(value);
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    render() {
        return (
            <div className="App">
                <Display data={this.state.operations} />
                <Buttons>
                    <Button onClick={this.handleClick} label="C" value="Delete" />
                    <Button onClick={this.handleClick} label="7" value="7" />
                    <Button onClick={this.handleClick} label="4" value="4" />
                    <Button onClick={this.handleClick} label="1" value="1" />
                    <Button onClick={this.handleClick} label="0" value="0" />

                    <Button onClick={this.handleClick} label="/" value="/" />
                    <Button onClick={this.handleClick} label="8" value="8" />
                    <Button onClick={this.handleClick} label="5" value="5" />
                    <Button onClick={this.handleClick} label="2" value="2" />
                    <Button onClick={this.handleClick} label="." value="." />

                    <Button onClick={this.handleClick} label="x" value="*" />
                    <Button onClick={this.handleClick} label="9" value="9" />
                    <Button onClick={this.handleClick} label="6" value="6" />
                    <Button onClick={this.handleClick} label="3" value="3" />
                    <Button onClick={this.handleClick} label="<" value="Backspace" />

                    <Button onClick={this.handleClick} label="-" size="2" value="-" />
                    <Button onClick={this.handleClick} label="+" size="2" value="+" />
                    <Button onClick={this.handleClick} label="=" value="Enter" />
                </Buttons>
            </div>
        );
    }
}

export default Calculator;
