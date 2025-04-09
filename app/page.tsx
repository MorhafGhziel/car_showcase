"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import { fetchCars } from "@/utils";
import { CarCard, ShowMore } from "@/components";
import { yearsOfProduction } from "@/constants";
import { fuels } from "@/constants";
import Image from "next/image";

export default function Home() {
  const [limit, setLimit] = useState(3); // Start by showing 3 cards
  const [isLoadingMore, setIsLoadingMore] = useState(false); // New loading state for "Show More"

  const fetchData = async () => {
    const allCars = await fetchCars();
    return allCars;
  };

  // Fetch the initial data
  const [allCars, setAllCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchData().then((cars) => {
      setAllCars(cars);
      setIsLoading(false);
    });
  }, []);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  // Create an array of 10 copies of the cars
  const duplicatedCars = isDataEmpty ? [] : Array(10).fill(allCars).flat();

  // Calculate pagination values
  const pageNumber = Math.ceil(limit / 3);
  const isNext = limit >= duplicatedCars.length;

  // Get the cars to display based on current limit
  const carsToDisplay = duplicatedCars.slice(0, limit);

  // Handle showing more cars with a smooth transition
  const handleShowMore = (newLimit: number) => {
    setIsLoadingMore(true);
    // Simulate loading delay for smooth transition
    setTimeout(() => {
      setLimit(newLimit);
      setIsLoadingMore(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters flex max-sm:flex-col flex-row mt-12">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
      </div>

      {!isDataEmpty ? (
        <section className="w-full max-w-[1440px] mx-auto px-6 py-16">
          <div className="home__cars-wrapper">
            {carsToDisplay.map((car, index) => (
              <CarCard
                car={car}
                key={`${car.make}-${car.model}-${car.year}-${index}`}
              />
            ))}
            {!isNext && !isLoadingMore && (
              <div className="flex items-center justify-center w-full h-[320px]">
                <p className="text-5xl text-gray-400 font-medium tracking-widest">
                  . . . . .
                </p>
              </div>
            )}
            {isLoadingMore && (
              <div className="flex items-center justify-center w-full h-[320px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-blue"></div>
              </div>
            )}
          </div>

          <ShowMore
            pageNumber={pageNumber}
            isNext={isNext}
            setLimit={handleShowMore}
          />
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>No cars found.</p>
        </div>
      )}
    </main>
  );
}
