"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCT_LOGO_URL, PRODUCT_NAME } from "@/lib/product";
import { Logo } from "./Icons";

export default function ProductLogo({ className }: { className?: string }) {
  const [customLogoFailed, setCustomLogoFailed] = useState(false);

  if (!PRODUCT_LOGO_URL || customLogoFailed) {
    return <Logo className={className} />;
  }

  return (
    <Image
      src={PRODUCT_LOGO_URL}
      alt={`${PRODUCT_NAME} logo`}
      width={64}
      height={64}
      unoptimized
      onError={() => setCustomLogoFailed(true)}
      className={className}
    />
  );
}
