import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
  deletePalette = e => {
    e.stopPropagation();
    this.props.toggleDialog(this.props.id);
  };
  render() {
    const { classes, paletteName, emoji, colors, id } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={() => this.props.handleClick(id)}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.5s ease-in-out" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>{" "}
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
