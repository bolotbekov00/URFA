import style from "./DoctorsCard.module.scss";
import { CustomButton, Typography } from "@/shared";

export const DoctorsCard = ({ data, link }) => {
  return (
    <div className={style.articlesCard} key={data.id}>
      <div className={style.image} style={{ background: `url(${data.image})` }}>
        <CustomButton color="orange" link={link}>
          {data.slug}
        </CustomButton>
      </div>
      <div className={style.contentPiece}>
        <Typography variant="h6" weight="bold" color="blue500">
          {data.title}
        </Typography>
        <Typography variant="body" weight="regular" color="black300">
          {data.pub_date}
        </Typography>
      </div>
      <Typography
        variant="body"
        weight="regular"
        color="black400"
        className={style.contentPiece}
      >
        {data.description}
      </Typography>
    </div>
  );
};
