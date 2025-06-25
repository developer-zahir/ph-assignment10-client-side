import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ChevronRight, CreditCard, Smartphone, Shield, Share2, Users, BookOpen } from "lucide-react";
import Banner from "../../components/Banner/Banner";
import CTASection from "../../components/CTASection/CTASection";
import { Link } from "react-router";
import PageTitle from "../../components/PageTitle/PageTitle";
import Marquee from "react-fast-marquee";
import { AuthContent } from "../../contexts/Authcontext";
import TrendingTips from "../../components/TrendingTips/TrendingTips";
import FeaturedGardeners from "../../components/FeaturedGardeners/FeaturedGardeners";
import EventSlider from "../../components/EventSlider/EventSlider";
import MarqueeSection from "../../components/Marquee/MarqueeSection";
import { Fade, Slide } from "react-awesome-reveal";
import WhyOurCommunity from "../../components/WhyOurCommunity/WhyOurCommunity";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContent);
  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      {/* Hero Section */}
      <Fade cascade triggerOnce>
        <Banner></Banner>
      </Fade>
      {/* event slider  */}
      <EventSlider></EventSlider>
      {/* marquee secton  */}
      <MarqueeSection></MarqueeSection>
      {/* Featured Gardeners */}
      <FeaturedGardeners></FeaturedGardeners>

      {/* trending tips */}
      <TrendingTips></TrendingTips>

      {/* Why Join Our Community? */}
      <WhyOurCommunity></WhyOurCommunity>

      {/* CTA Section */}
      <CTASection
        title={"Join Our Community"}
        desc={
          "Join our community of passionate gardeners to share knowledge, find local gardening enthusiasts, and grow your skills with expert tips."
        }
        cta={user ? "Browse Gardeners" : "Join Now"}
        link={user ? "/all-gardeners" : "/register"}
      ></CTASection>
    </div>
  );
};

export default Home;
