import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Stethoscope, LineChart, Medal, UserCog, Syringe } from "lucide-react";

const nav = [
  { to: "/dose", label: "Dose", icon: Syringe },
  { to: "/history", label: "History", icon: LineChart },
  { to: "/gamification", label: "Progress", icon: Medal },
  { to: "/profile", label: "Profile", icon: UserCog },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md" aria-hidden>
            <Stethoscope className="text-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight">GlucoLoop</span>
        </Link>
        <ul className="hidden gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
                aria-label={n.label}
              >
                <n.icon className="size-4" /> {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
