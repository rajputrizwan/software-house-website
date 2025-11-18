"use client";

import { delay } from "framer-motion";
import LandingPage from "../components/LandingPage";

export default async function Home() {
   await delay(1000)
  return (
    <section>
      <LandingPage />
    </section>
  );
}
