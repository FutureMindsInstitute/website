'use client';

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Agenda from "./components/Agenda";
import EventDetails from "./components/EventDetails";
import Bonuses from "./components/Bonuses";
import Educators from "./components/Educators";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import CoursesWrapper from "./components/CoursesWrapper";
import BenefitsSection from "./components/Benefits";
import Gallery from "./components/Gallery";
import Stories from "./components/Stories";
import LoginModal from "./components/modals/login";
import SignupModal from "./components/modals/signup";
import BillingModal from "./components/modals/Billing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-primary-dark">
      <Navbar />
      <Hero />
      <About />
      {/* <Agenda /> */}
      {/* <EventDetails /> */}
      <CoursesWrapper />
      <BenefitsSection />
      {/* <Bonuses /> */}
      <Stories />
      <Educators />
      <Gallery />
      {/* <CallToAction /> */}
      <Footer />
      <LoginModal />
      <SignupModal />
      <BillingModal />
    </div>
  );
};

export default LandingPage;
