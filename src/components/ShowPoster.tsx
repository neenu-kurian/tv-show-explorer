"use client";

import Image from "next/image";
import { useState } from "react";

type ShowPosterProps = {
  src?: string;
  alt: string;
  loading?: "lazy" | "eager";
  className?: string;
  children?: React.ReactNode;
};

export function ShowPoster({ src, alt, loading = "lazy", className, children }: ShowPosterProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className ?? "relative h-full w-full"}>
      <Image
        src={src}
        alt={alt}
        loading={loading}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
