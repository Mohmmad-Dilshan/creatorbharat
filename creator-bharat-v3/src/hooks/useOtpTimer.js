import { useState, useEffect, useCallback } from 'react';

/**
 * Countdown timer hook for OTP resend flows.
 *
 * @param {number} initialSeconds - Default duration passed to startTimer when no
 *   argument is provided. Defaults to 30.
 *
 * @returns {{ timer: number, startTimer: (seconds?: number) => void, isActive: boolean }}
 *   - timer:      seconds remaining (0 when idle / finished)
 *   - startTimer: call with an optional duration to reset and start the countdown
 *   - isActive:   true while timer > 0 (use to disable the Resend button)
 */
export function useOtpTimer(initialSeconds = 30) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer <= 0) return;

    const id = setInterval(() => setTimer(t => t - 1), 1000);

    // Clean up on unmount or when timer changes (re-run / reaches 0)
    return () => clearInterval(id);
  }, [timer]);

  const startTimer = useCallback(
    (seconds = initialSeconds) => {
      setTimer(seconds);
    },
    [initialSeconds],
  );

  return { timer, startTimer, isActive: timer > 0 };
}
