import React, { Component } from "react";

import ColorBox from "./ColorBox";
import "./Palette.css";

export class Palette extends Component {
  render() {
    console.log(this.props);
    const ColorBoxes = this.props.palette.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return (
      <div className="Palette">
        <div className="Palette-colors">{ColorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
