'use client';

import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import BentoFeatures from "./components/BentoFeatures";
import Stories from "./components/Stories";
import Educators from "./components/Educators";
import B2BTraining from "./components/B2BTraining";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import LoginModal from "./components/modals/login";
import SignupModal from "./components/modals/signup";
import BillingModal from "./components/modals/Billing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-void">
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <BentoFeatures />
      <Stories />
      <Educators />
      <B2BTraining />
      <Gallery />
      <Footer />
      <LoginModal />
      <SignupModal />
      <BillingModal />
    </div>
  );
};

export default LandingPage;
