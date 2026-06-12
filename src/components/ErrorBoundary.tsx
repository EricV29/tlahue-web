import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4 bg-canvas-white px-4 text-center"
        >
          <h1 className="font-display text-3xl font-semibold text-dark-charcoal">
            Algo salió mal
          </h1>
          <p className="max-w-md font-body text-slate-gray">
            Ocurrió un error inesperado. Intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-tlahu-clay px-6 py-2 font-body font-medium text-white transition-colors hover:brightness-90"
          >
            Recargar página
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 max-w-lg overflow-auto rounded-lg bg-ash-gray p-4 text-left font-body text-sm text-dark-charcoal">
              {this.state.error.message}
            </pre>
          )}
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
