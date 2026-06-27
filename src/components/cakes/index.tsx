"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Container from "../shared/container/Container";
import GlobalBanner from "../shared/globalBanner";
import CakeList from "./CakeList";
import Filter from "./Filter";
import MobileFilter from "./MobileFilter";

const CakePageComponent = () => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <GlobalBanner title="Cakes" />
      <Container className="mt-10 px-5 md:px-2">
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Mobile Filter Button */}
          <div className="md:hidden absolute top-0 left-0  mr-4 z-10">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className=" cursor-pointer  flex gap-1  text-sm font-medium"
            >
              <svg
                width="14px"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Filter</title>
                <path
                  fill="currentColor"
                  d="M480 1408v128h-352v-128h352zm352-128q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm160-384v128h-864v-128h864zm-640-512v128h-224v-128h224zm1312 1024v128h-736v-128h736zm-960-1152q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm640 512q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm320 128v128h-224v-128h224zm0-512v128h-864v-128h864z"
                />
              </svg>{" "}
              Filter
            </button>
          </div>
          {/* Desktop Filter - Hidden on Mobile */}
          <div className="hidden md:block md:w-1/4">
            <Filter />
          </div>

          {/* Cake List */}
          <div className="w-full md:w-3/4">
            <CakeList />
          </div>
        </div>

        {/* Mobile Filter Drawer */}

        <AnimatePresence>
          <MobileFilter
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default CakePageComponent;
