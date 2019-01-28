import React from "react";

export const getHighResImage = (uri, size = 600) =>
  uri.replace("100x100", `${size}x${size}`);

export function asyncComponent(fetchComponent) {
  return class LazyComponent extends React.Component {
    static Component = null;
    state = { Component: LazyComponent.Component };

    async componentDidMount() {
      if (!this.state.Component) {
        const Component = await fetchComponent();
        LazyComponent.Component = Component;
        this.setState({ Component });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  };
}
