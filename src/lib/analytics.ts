/**
 * Lightweight Privacy-First Client Analytics
 * Anonymous metric logging: page views, resume downloads, project demo clicks.
 * Does not set cookies, does not collect personal identifiers.
 */

// In-memory throttle store to prevent React StrictMode double-mount duplicates
// and rapid double-clicks on buttons
let lastPageView: { path: string; timestamp: number } | null = null;
const eventThrottleMap = new Map<string, number>();

const PAGEVIEW_THROTTLE_MS = 5000;
const EVENT_THROTTLE_MS = 2500;

export const trackPageView = async (path?: string) => {
  try {
    const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const now = Date.now();

    // Client-side debounce: ignore identical pageview within 5s (e.g. React StrictMode)
    if (lastPageView && lastPageView.path === currentPath && now - lastPageView.timestamp < PAGEVIEW_THROTTLE_MS) {
      return;
    }
    lastPageView = { path: currentPath, timestamp: now };

    await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: currentPath,
        referrer: typeof document !== 'undefined' && document.referrer ? document.referrer : undefined,
      }),
    });
  } catch {
    // Silently continue without disrupting user experience
  }
};

export const trackEvent = async (eventName: string, eventData?: string) => {
  try {
    const key = `${eventName}:${eventData || ''}`;
    const now = Date.now();
    const lastTimestamp = eventThrottleMap.get(key) || 0;

    // Client-side debounce: ignore identical clicks within 2.5s (e.g. rapid double-clicks)
    if (now - lastTimestamp < EVENT_THROTTLE_MS) {
      return;
    }
    eventThrottleMap.set(key, now);

    // Prune throttle map if it grows large
    if (eventThrottleMap.size > 50) {
      for (const [k, ts] of eventThrottleMap.entries()) {
        if (now - ts > EVENT_THROTTLE_MS * 2) {
          eventThrottleMap.delete(k);
        }
      }
    }

    await fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_data: eventData,
      }),
    });
  } catch {
    // Silently continue
  }
};
