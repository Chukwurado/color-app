import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "teal", newName: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  handleSubmit = () => {
    const newColor = {
      name: this.state.newName,
      color: this.state.currentColor
    };
    this.props.addNewColor(newColor);
  };

  render() {
    const { paletteIsFull } = this.props;
    return (
      <div>
        <ChromePicker
          color={this.state.currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={this.state.newName}
            name="newName"
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "Color name must be unique",
              "Color already used!"
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: this.state.currentColor }}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
