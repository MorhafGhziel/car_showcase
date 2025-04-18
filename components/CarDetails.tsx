"use client";

import { CarProps } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
              <div className="flex-1 flex flex-col gap-3">
                <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                  <Image
                    src="/hero.png"
                    alt="car model"
                    fill
                    priority
                    className="object-contain"
                  />
                  <button
                    type="button"
                    className="absolute top-[-12px] right-[-12px] z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={16}
                      height={16}
                      className="object-contain"
                    />
                  </button>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 relative w-full h-24 bg-grey bg-opacity-5 rounded-lg">
                    <Image
                      src="/hero.png"
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 relative w-full h-24 bg-grey bg-opacity-5 rounded-lg">
                    <Image
                      src="/hero.png"
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 relative w-full h-24 bg-grey bg-opacity-5 rounded-lg">
                    <Image
                      src="/hero.png"
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="text-xl font-semibold capitalize">
                    {car.make} {car.model}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {Object.entries(car).map(([key, value]) => (
                      <div
                        className="flex justify-between gap-5 w-full text-right"
                        key={key}
                      >
                        <h4 className="text-grey capitalize">
                          {key.split("_").join(" ")}
                        </h4>
                        <p className="text-black-100 font-semibold">
                          {value ===
                          "this field is for premium subscribers only"
                            ? "None"
                            : value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetails;
