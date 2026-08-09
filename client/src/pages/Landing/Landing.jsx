import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import CareerTracks from "../../components/CareerTracks/CareerTracks";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/Faq/Faq"; 
import Footer from "../../components/Footer/Footer";
function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CareerTracks />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <footer />
    </>
  );
}
export default Landing;