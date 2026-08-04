import React, { useEffect, useRef } from 'react';

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  action?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  onExpire,
  onError,
  action = 'turnstile-spin-v2'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let intervalId: any;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: '0x4AAAAAAEGXp6jV1XEcdkMJ',
            action: action,
            theme: 'auto',
            callback: (token: string) => {
              onVerify(token);
            },
            'expired-callback': () => {
              onVerify('');
              onExpire?.();
            },
            'error-callback': () => {
              onVerify('');
              onError?.();
            }
          });
        } catch (e) {
          console.error('[Turnstile] Widget render error:', e);
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      intervalId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(intervalId);
          renderWidget();
        }
      }, 200);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (window.turnstile && widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [action]);

  return (
    <div className="my-3 flex justify-center">
      <div
        ref={containerRef}
        className="cf-turnstile"
        data-sitekey="0x4AAAAAAEGXp6jV1XEcdkMJ"
        data-action={action}
      ></div>
    </div>
  );
};
