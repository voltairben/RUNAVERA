import { Button } from "@/components/Button";
import { NavLink } from "@/components/NavLink";
import { ctaNavItem, primaryNavItems } from "@/lib/navigation";

// 768px+ only (see globals.css breakpoints) — the collapse boundary sits at
// --breakpoint-tablet, not --breakpoint-desktop, so tablet gets the full
// horizontal nav too, not the mobile takeover.
export function DesktopNav() {
  return (
    <div className="hidden items-center gap-component tablet:flex">
      <ul className="flex items-center gap-content text-nav">
        {primaryNavItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
      <Button variant="secondary" href={ctaNavItem.href}>
        {ctaNavItem.label}
      </Button>
    </div>
  );
}
