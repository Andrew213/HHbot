import React, {ErrorInfo, ReactNode} from "react";

export interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export interface Props {
  children: ReactNode;
}

export default class ErrorBoundary extends React.PureComponent<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({error, errorInfo});
  }

  public render() {
    const {children} = this.props;

    if (process.env.NODE_ENV === "development" && this.state.errorInfo) {
      return (
        <>
          <h2>Что-то пошло не так.</h2>
          <details style={{whiteSpace: "pre-wrap"}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }

    return children;
  }
}
