import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout/Layout";
import HeroSection01 from "./HeroSection01";
import HeroSection02 from "./HeroSection02";
import HeroSection03 from "./HeroSection03";
import HeroSection04 from "./HeroSection04";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        {/* <meta
          name="description"
          content="Welcome to the homepage of My Website. Discover our amazing content!"
        />
        <meta name="keywords" content="home, website, content, hero sections" />
        <meta property="og:title" content="Home - My Website" />
        <meta
          property="og:description"
          content="Welcome to the homepage of My Website."
        />
        <meta property="og:type" content="website" /> */}
      </Helmet>

      <Layout>
        <section className="lg:px-[10%] md:px-[8%] px-[3%]">
          <HeroSection01 />
          <HeroSection02 />
          <HeroSection03 />
          <HeroSection04 />
        </section>
      </Layout>
    </>
  );
}
