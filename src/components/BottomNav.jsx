import { NavLink } from "react-router-dom";
import { pages } from "../pageConfig";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {pages.map((page) => (
        <NavLink
          key={page.slug}
          to={page.path}
          className={({ isActive }) =>
            isActive ? "bottom-nav__item bottom-nav__item--active" : "bottom-nav__item"
          }
          aria-label={page.title}
        >
          {({ isActive }) =>
            isActive ? (
              <img className="bottom-nav__icon" src={page.iconFill} alt="" />
            ) : (
              <span
                className="bottom-nav__icon bottom-nav__icon--outline"
                style={{ maskImage: `url(${page.iconOutline})`, WebkitMaskImage: `url(${page.iconOutline})` }}
              />
            )
          }
        </NavLink>
      ))}
    </nav>
  );
}
