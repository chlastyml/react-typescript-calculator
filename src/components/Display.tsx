import React, { Component } from "react";

type Props = {
    data: string[],
};

export const Display = (props: Props) => {
    const value = props.data.join("");
    return <div className="Display"> {value} </div>;
};
