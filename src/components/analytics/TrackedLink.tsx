"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics-events";

type LinkProps = ComponentProps<typeof Link>;

interface TrackedLinkProps extends LinkProps {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}
