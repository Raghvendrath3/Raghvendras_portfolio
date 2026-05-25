import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidMount() {
    const handleKeyDown = (): void => {
      if (this.state.hasError) {
        window.location.reload();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary] Caught error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 select-none"
          style={{ backgroundColor: '#000080' }}
        >
          <div
            className="text-white font-mono text-sm max-w-md text-center space-y-4"
            style={{ lineHeight: '1.8' }}
          >
            <div>A fatal exception has occurred at 0x00000000:0x00000000</div>
            <div>&nbsp;</div>
            <div>* Press any key to restart.</div>
            <div>&nbsp;</div>
            <div>PORTFOLIO.EXE — 0x00000000</div>
            <div className="pt-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
