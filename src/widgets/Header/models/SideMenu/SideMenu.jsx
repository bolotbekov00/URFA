import { useEffect, useState, useRef } from "react";
import { Cross, CustomButton, Logo, SearchInput } from "@/shared";
import style from "./SideMenu.module.scss";
import { Selector } from "../Selector/Selector";
import { PATHS, navigationHeaderLinks } from "@shared/lib/variables";
import { LanguageSelectorMobile } from "../LanguageSelectorMobile/LanguageSelectorMobile";
import { LocationSelectorMobile } from "../LocationSelectorMobile/LocationSelectorMobile";
import { useNavigate } from "react-router-dom";

const { main, services, more } = navigationHeaderLinks;

export const SideMenu = ({ handleClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsVisible(false);
    setTimeout(() => {
      handleClick(false);
    }, 1000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.overflow = "hidden";
    return () => {
      bodyStyle.overflow = "auto";
    };
  }, []);

  const handleModalClick = (event) => {
    if (event.target === modalRef.current) {
      closeMenu();
    }
  };

  const handleNavigation = (path) => {
    closeMenu();
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <div ref={modalRef} onClick={handleModalClick} className={style.modalBg}>
      <div className={`${style.sideMenu} ${!isVisible ? style.slideOut : ""}`}>
        <div className={style.top}>
          <Logo width={80} height={52} color="#12709A" />
          <Cross color="#BFBFBF" className={style.cross} onClick={closeMenu} />
        </div>
        <div className={style.search}>
          <SearchInput size="mobile" onCloseMenu={closeMenu} />
        </div>
        <CustomButton variant="orange" size="small" className={style.button}>
          Записаться онлайн
        </CustomButton>
        <CustomButton link={PATHS.login} variant="neutral" size="small" className={style.button}>
          Войти как пациент
        </CustomButton>
        <nav className={style.nav}>
          <Selector items={main.items} title={main.title} onNavigate={handleNavigation} />
          <Selector items={services.items} title={services.title} onNavigate={handleNavigation} />
          <Selector items={more.items} title={more.title} onNavigate={handleNavigation} />
        </nav>
        <div className={style.selectors}>
          <LanguageSelectorMobile />
          <LocationSelectorMobile />
        </div>
      </div>
    </div>
  );
};
