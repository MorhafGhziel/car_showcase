import Hero from "@/components/Hero";

import CustomFilter from "@/components/CustomFilter";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <>
      <Hero />

      <div
        className="mt-12 padding-x padding-y padding-x max-width"
        id="discover"
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
        </div>

        <div className="home__filter-container">
          <CustomFilter />
          <CustomFilter />
        </div>
      </div>
    </>
  );
}
