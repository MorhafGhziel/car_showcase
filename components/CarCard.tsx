"use client";

import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent } from "@/utils";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [isOpen, setIsOpen] = useState(false);

  // Generate a stable MPG value based on the car's properties
  const generateStableMPG = (make: string, model: string, year: number) => {
    const seed =
      make.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
      model.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) +
      year;
    return (seed % 15) + 20;
  };

  const mpgValue =
    typeof city_mpg === "string"
      ? generateStableMPG(make, model, year)
      : city_mpg;
  const carRent = calculateCarRent(mpgValue, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>

        <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
          <span className="self-start text-[14px] leading-[17px] font-semibold">
            $
          </span>
          {carRent}
          <span className="self-end text-[14px] leading-[17px] font-medium">
            /day
          </span>
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
          <Image
            src="/hero.png"
            alt="car model"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="relative flex w-full mt-2">
          <div className="flex group-hover:invisible w-full justify-between text-grey">
            <div className="car-card__icon">
              <Image
                src="/steering-wheel.svg"
                width={20}
                height={20}
                alt="steering wheel"
              />
              <p className="car-card__icon-text">
                {transmission === "a" ? "Automatic" : "Manual"}
              </p>
            </div>
            <div className="car-card__icon">
              <Image src="/tire.svg" width={20} height={20} alt="tire" />
              <p className="car-card__icon-text">{drive.toUpperCase()}</p>
            </div>
            <div className="car-card__icon">
              <Image src="/gas.svg" width={20} height={20} alt="gas" />
              <p className="car-card__icon-text">{mpgValue} MPG</p>
            </div>
          </div>

          <div className="car-card__btn-container">
            <CustomButton
              title="View More"
              containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              rightIcon="/right-arrow.svg"
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
