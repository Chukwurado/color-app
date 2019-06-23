import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }
  changeCopyState = () => {
    this.setState({ copied: true }, () =>
      setTimeout(() => this.setState({ copied: false }), 1500)
    );
    //this.setState({ copied: true });
  };
  render() {
    const { background, name, id, paletteId } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          {/* prevent other event from parent */}
          <Link
            to={`/palette/${paletteId}/${id}`}
            onClick={e => e.stopPropagation()}
          >
            <span className="see-more">More</span>
          </Link>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
