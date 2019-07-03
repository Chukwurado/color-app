import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import MiniPalette from "./MiniPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialogue: false,
      deletingId: ""
    };
  }

  toggleDialog = id => {
    if (this.state.openDeleteDialogue) {
      this.setState({
        openDeleteDialogue: !this.state.openDeleteDialogue,
        deletingId: ""
      });
    } else {
      this.setState({
        openDeleteDialogue: !this.state.openDeleteDialogue,
        deletingId: id
      });
    }
  };

  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.toggleDialog();
  };

  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialogue } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div>
            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                  <MiniPalette
                    {...palette}
                    handleClick={() => this.goToPalette(palette.id)}
                    // handleDelete={this.props.deletePalette}
                    toggleDialog={this.toggleDialog}
                    key={palette.id}
                    id={palette.id}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <Dialog
          open={openDeleteDialogue}
          aria-labelledBy="delete-dialog-title"
          onClose={this.toggleDialog}
        >
          <DialogTitle id="delete-dialog-title" onClose={this.toggleDialog}>
            Delete this palette
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.toggleDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100] }}>
                  <Close />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
