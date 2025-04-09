import Hero from "@/components/Hero";

import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";
import { fetchCars } from "@/utils";
import { CarCard } from "@/components";
import { yearsOfProduction } from "@/constants";
import { fuels } from "@/constants";

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div
        className="mt-12 padding-x padding-y padding-x max-width"
        id="discover"
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters flex max-sm:flex-col flex-row mt-12 ">
          <SearchBar />
          <div className="home__filter-container ">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
      </div>

      {!isDataEmpty ? (
        <section className="w-full max-w-[1440px] mx-auto px-6 py-16">
          <div className="home__cars-wrapper">
            {allCars?.map((car) => (
              <CarCard key={`${car.make}-${car.model}-${car.year}`} car={car} />
            ))}
          </div>
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{allCars?.message}</p>
        </div>
      )}
    </main>
  );
}
