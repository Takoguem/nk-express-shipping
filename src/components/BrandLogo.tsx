import { useMemo, useState } from "react";
import type { CompanyPartner } from "../types/site";

const logoModules = import.meta.glob<string>(
  "../assets/logos/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, query: "?url", import: "default" },
);

interface BrandLogoProps {
  partner: CompanyPartner;
  compact?: boolean;
  alt?: string;
}

export function BrandLogo({ partner, compact = false, alt }: BrandLogoProps) {
  const logoSource = useMemo(
    () =>
      Object.entries(logoModules).find(([path]) =>
        path.endsWith(`/${partner.logoFile}`),
      )?.[1],
    [partner.logoFile],
  );
  const [imageFailed, setImageFailed] = useState(false);

  if (logoSource && !imageFailed) {
    return (
      <img
        className={compact ? "brand-logo brand-logo--compact" : "brand-logo"}
        src={logoSource}
        alt={alt ?? `${partner.name} logo`}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span className={compact ? "brand-fallback brand-fallback--compact" : "brand-fallback"}>
      <span>{partner.name}</span>
      {!compact && partner.slogan ? <small>{partner.slogan}</small> : null}
    </span>
  );
}
