import React from "react";

export const getHighResImage = (uri, size = 600) =>
  uri.replace("100x100", `${size}x${size}`);

export function asyncComponent(fetchComponent) {
  return class LazyComponent extends React.Component {
    state = { Component: null };

    async componentDidMount() {
      if (!this.state.Component) {
        const Component = await fetchComponent();
        this.updateComponent(Component);
      }
    }
    updateComponent = Component => {
      this.setState({ Component });
    };

    componentWillUnmount() {
      this.updateComponent = () => {};
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}
