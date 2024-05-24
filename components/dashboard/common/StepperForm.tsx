"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { EStatusStepper, TUseFormReturnCreatePaziente } from "@/enum/types";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, useFormField } from "@/components/ui/form";
import { format } from "date-fns";
import { createPaziente } from "@/actions/actions.clinica";
import { onSubmitCreatePaziente, onSubmitCreatePrestazione } from "@/lib/utils";

export type TStepper = {
  name: string;
  href: string;
  status: EStatusStepper;
};

const StepperForm = ({
  stepper,
  setStepper,
  children,
  form,
  formSchema,
  submitMethod,
  handleCloseModal,
}: {
  stepper: TStepper[];
  setStepper: React.Dispatch<React.SetStateAction<TStepper[]>>;
  children: ReactNode;
  form: any;
  formSchema: z.ZodObject<any>;
  submitMethod(values: z.infer<typeof formSchema>): void;
  handleCloseModal?: () => void;
}) => {
  const [index, setIndex] = useState<number>(0);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const handleNextStepper = () => {
    let foundCurrent = false;

    const updatedStepper = stepper.map((step) => {
      if (foundCurrent && step.status === EStatusStepper.UPCOMING) {
        // Change the status of the first upcoming step after current to CURRENT
        foundCurrent = false; // Reset foundCurrent after the transition
        return { ...step, status: EStatusStepper.CURRENT };
      } else if (step.status === EStatusStepper.CURRENT) {
        foundCurrent = true;
        return { ...step, status: EStatusStepper.COMPLETE };
      }

      return step;
    });
    setStepper(updatedStepper);
    setIndex(index + 1);
  };

  const handlePrevStepper = () => {
    let lastCurrentIndex = -1;

    const updatedStepper = stepper.map((step, index) => {
      if (step.status === EStatusStepper.CURRENT) {
        lastCurrentIndex = index;
      }

      setIndex(index - 1);

      return step;
    });

    if (lastCurrentIndex !== -1) {
      // Change the status of the current element to UPCOMING
      updatedStepper[lastCurrentIndex].status = EStatusStepper.UPCOMING;

      // Change the status of the next element to CURRENT
      updatedStepper[lastCurrentIndex - 1].status = EStatusStepper.CURRENT;
    }

    setStepper(updatedStepper);
  };

  const handleSubmit = () => {
    form.handleSubmit(submitMethod);
  };

  return (
    <div className="w-full">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {stepper.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== stepper.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative"
              )}
            >
              {step.status === EStatusStepper.COMPLETE ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-indigo-600" />
                  </div>
                  <a
                    href="#"
                    className="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900"
                  >
                    <CheckIcon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : step.status === EStatusStepper.CURRENT ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <a
                    href="#"
                    className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
                    aria-current="step"
                  >
                    <span
                      className="h-2.5 w-2.5 bg-indigo-600 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <a
                    href="#"
                    className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                  >
                    <span
                      className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="w-full">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitMethod)}
              className="w-full flex flex-col gap-y-6 "
            >
              {children}
              {/* <Button type="submit">Submit</Button> */}
              <div className="w-full flex flex-col md:flex-row gapx-x-6 gap-y-5">
                {stepper.at(stepper.length - 1)?.status !==
                  EStatusStepper.CURRENT && (
                  <Button
                    onClick={handleNextStepper}
                    // disabled={
                    //   stepper.at(stepper.length - 1)?.status === EStatusStepper.CURRENT
                    // }
                    //type="submit"
                  >
                    Avanti
                  </Button>
                )}
                {stepper.at(stepper.length - 1)?.status ===
                  EStatusStepper.CURRENT && (
                  <Button onClick={handleSubmit}>Invia</Button>
                )}

                <Button
                  onClick={handlePrevStepper}
                  disabled={stepper.at(0)?.status === EStatusStepper.CURRENT}
                  type="button"
                >
                  Indietro
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
