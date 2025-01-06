import SvgIcon from "CommonElements/Icons/SvgIcon";
import { sidebarItemType } from "Types/LayoutDataType";
import CustomizerContext from "helper/Customizer";
import layoutContext from "helper/Layout";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"; // Import Link from Next.js

type menuListType = {
  MENUITEMS: sidebarItemType[];
  handleActive: (title: string, level: number) => void;
  active: string;
  setActiveLink: Function;
  setActive: Function;
  activeLink: string | undefined;
  level: number;
  className?: string;
};

const Menulist = ({
  setActive,
  handleActive,
  active,
  MENUITEMS,
  level,
  activeLink,
  setActiveLink,
}: menuListType) => {
  const { pinedMenu, setPinedMenu } = useContext(layoutContext);
  const { layoutName } = useContext(CustomizerContext);
  const { t } = useTranslation();

  const handlePined = (value: string | undefined) => {
    if (!pinedMenu.includes(value || "")) {
      setPinedMenu((data) => [...data, value || ""]);
    } else {
      const filterMenu = pinedMenu.filter((item) => item !== value);
      setPinedMenu(filterMenu);
    }
  };

  return (
    <>
      {MENUITEMS.map((item, i) => (
        <li
          key={i}
          className={`${pinedMenu.includes(item.title || "") ? "pined" : ""} ${level === 0 ? "sidebar-list" : ""
            }`}
        >
          {level === 0 && (
            <i
              className="fa fa-thumb-tack"
              onClick={() => handlePined(item.title)}
            ></i>
          )}
          <Link
            href={
              item.type === "sub"
                ? "#"
                : layoutName
                  ? `${item.path}?layout=${layoutName.toLowerCase()}`
                  : `/${item.path}`
            }
            className={
              level === 0
                ? `sidebar-link sidebar-title ${(item.pathSlice && active.includes(item.pathSlice)) ||
                  activeLink ===
                  item.path?.split("/")[
                  item.path.split("/").length - 1
                  ]
                  ? "active"
                  : ""
                }`
                : `text-decoration-none ${activeLink ===
                  item.path?.split("/")[
                  item.path.split("/").length - 1
                  ]
                  ? "active"
                  : ""
                }`
            }
            onClick={(e) => {
              if (item.type === "sub") {
                e.preventDefault(); // Prevent navigation for submenus
                handleActive(item.pathSlice || "", level);
              } else {
                if (level === 0) {
                  setActive("");
                }
                setActiveLink(
                  item.path?.split("/")[
                  item.path.split("/").length - 1
                  ]
                );
              }
            }}
          >
            {item.icon && (
              <SvgIcon
                className="stroke-icon"
                iconId={`stroke-${item.icon}`}
              />
            )}
            {item.icon && (
              <SvgIcon className="fill-icon" iconId={`fill-${item.icon}`} />
            )}
            <span>{t(`${item.title}`)}</span>
            {item.badge ? (
              <label className={item.badge}>{item.badgetxt}</label>
            ) : (
              ""
            )}
            {item.children && (
              <div className="according-menu">
                {item.pathSlice && active.includes(item.pathSlice) ? (
                  <i className="fa fa-angle-down" />
                ) : (
                  <i className="fa fa-angle-right" />
                )}
              </div>
            )}
          </Link>
          {item.children && (
            <ul
              className={`${level >= 1
                  ? "nav-sub-childmenu submenu-content"
                  : "sidebar-submenu list-group"
                }`}
              style={
                item.pathSlice && active.includes(item.pathSlice)
                  ? {
                    opacity: "1",
                    transition: "opacity 500ms ease-in 0s",
                    display: "block",
                  }
                  : { display: "none" }
              }
            >
              <Menulist
                setActive={setActive}
                MENUITEMS={item.children}
                handleActive={handleActive}
                active={active}
                level={level + 1}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
              />
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default Menulist;
