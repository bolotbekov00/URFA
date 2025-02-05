import { BranchesSection, HeroHome, ServiceSection, TreatmentAndDetailSection } from "@/widgets";
import db from "./Home.db.json";
import { Container } from "@/shared";

export const HomePage = () => {
  const heroData = db.hero;
  const branchesData = db.card;
  const detailData = db.detail;
  const serviceData = db.service;
  return (
    <Container>
      <HeroHome heroData={heroData} />
      <ServiceSection serviceData={serviceData} />
      <TreatmentAndDetailSection detailData={detailData} />
      <BranchesSection branchesData={branchesData} />
    </Container>
  );
};
