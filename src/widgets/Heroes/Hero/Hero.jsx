import style from "./Hero.module.scss";
import { Container } from "@/shared";
import { Typography } from "@/shared";
import { Line } from "@/shared";

export const Hero = ({ heroData }) => {
  return (
    <Container>
      <div className={style.blockHero}>
        <div className={style.heroTitle}>
          <Typography variant="large" color="black" weight="bold">
            {heroData.h1}
          </Typography>
          <Typography variant="large" color="black" weight="regular">
            {heroData.h2}
          </Typography>
          <Line color={"black200"} />
          <Typography color="black" weight="regular">
            {heroData.p}
          </Typography>
        </div>
      </div>
    </Container>
  );
};
