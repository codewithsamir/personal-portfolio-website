"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a Google AdSense unit. Returns null until both
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID and a slot id are configured, so no empty
 * ad containers ship before the account is approved.
 */
export function AdSlot({ slot, className = "" }: { slot: string; className?: string }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!clientId || !slot) return;
    try {
      // @ts-expect-error - injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet (e.g. ad blocker) — safe to ignore.
    }
  }, [clientId, slot]);

  if (!clientId || !slot) return null;

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
