import style from "./ServiceSection.module.scss";
import { ServiceCard, Typography } from "@/shared";
import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";

export const ServiceSection = () => {
  const { popular } = useLoaderData();
  const [activeIndex, setActiveIndex] = useState(null);
  const dropdownRef = useRef(null);
  const selectedCity = localStorage.getItem("location");

  const dataCity = {
    Osh: "Ош",
    "Jalal-Abad": "Джалал-Абад",
    Bishkek: "Бишкек",
  };

  const handleClickActive = (clickedIndex) => {
    if (activeIndex === clickedIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(clickedIndex);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (setActiveIndex) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setActiveIndex(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dataTitle = `Услуги города ${dataCity[selectedCity]}`;

  return (
    <div className={style.servicesBlock} ref={dropdownRef}>
      <Typography variant="h3" weight="bold">
        {dataTitle}
      </Typography>
      <div className={style.cardBlock}>
        {popular?.map((item, index) => (
          <ServiceCard
            cardData={item}
            key={index}
            index={index}
            activeIndex={activeIndex}
            handleClickActive={handleClickActive}
          />
        ))}
      </div>
    </div>
  );
};
