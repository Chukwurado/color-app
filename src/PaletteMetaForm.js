import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
export class PaletteMetaForm extends Component {
  state = {
    stage: "form",
    newPaletteName: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showEmojiPicker = () => {
    this.setState({
      stage: "emoji"
    });
  };

  savePalette = emoji => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
  };
  render() {
    return (
      <div>
        <Dialog open={this.state.stage === "emoji"}>
          <Picker onSelect={this.savePalette} title="Pick a Palette Emoji" />
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.props.hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your palette.
              </DialogContentText>

              <TextValidator
                name="newPaletteName"
                label="Palette Name"
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette Name Already Used"
                ]}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
