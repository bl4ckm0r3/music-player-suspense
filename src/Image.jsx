import React, { PureComponent } from "react";
import { asyncComponent } from "./util";

const Loader = asyncComponent(() => import("./Loader").then(mod => mod.default));

export default class Image extends PureComponent {
  state = {
    src: null
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate() {
    this.loadImage();
  }

  loadImage = () => {
    if (this.props.src) {
      this.loader = new window.Image();
      this.loader.onload = () => this.setState({ src: this.props.src });
      this.loader.src = this.props.src;
    }
  };
  componentWillUnmount() {
    this.loader.onload = () => {};
  }
  render() {
    return this.state.src ? (
      <img className={this.props.className} alt="cover" src={this.state.src} />
    ) : (
      <div className="loader">
        <Loader css={this.props.className} sizeUnit={"px"} size={140} />
      </div>
    );
  }
}
