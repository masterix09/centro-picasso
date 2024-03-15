"use client";

/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { it } from "date-fns/locale/it";

const CalendarMonthView = () => {
  function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }

  // const locale = it;
  let today = startOfToday();

  const [currentMonth, setCurrentMonth] = useState(
    format(today, "MMMM-yyyy", { locale: it })
  );
  let firstDayOfCurrentMonth = parse(currentMonth, "MMMM-yyyy", new Date(), {
    locale: it,
  });
  const [selectedDay, setSelectedDay] = useState(today);

  const nextMonth = () => {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMMM-yyyy", { locale: it }));
  };
  const prevMonth = () => {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayOfNextMonth, "MMMM-yyyy", { locale: it }));
  };

  let newDays = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth, { locale: it }),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth), { locale: it }),
  });

  const events = [
    {
      id: "1",
      nomePrestazione: "Nome Prestazione",
      paziente: "Andrea Verde",
      start: "10",
      end: "11",
      date: format(new Date(), "dd-MM-yyyy", { locale: it }),
    },
    {
      id: "2",
      nomePrestazione: "Nome Prestazione 2",
      paziente: "Mimmo Verde",
      start: "15",
      end: "16",
      date: format(new Date(), "dd-MM-yyyy", { locale: it }),
    },
    {
      id: "3",
      nomePrestazione: "Nome Prestazione",
      paziente: "Andrea Verde",
      start: "10",
      end: "11",
      date: format(new Date(), "dd-MM-yyyy", { locale: it }),
    },
    {
      id: "4",
      nomePrestazione: "Nome Prestazione 2",
      paziente: "Mimmo Verde",
      start: "15",
      end: "16",
      date: format(new Date(), "dd-MM-yyyy", { locale: it }),
    },
    {
      id: "5",
      nomePrestazione: "Nome Prestazione 2",
      paziente: "Mimmo Verde",
      start: "15",
      end: "16",
      date: format(new Date(), "dd-MM-yyyy", { locale: it }),
    },
    {
      id: "6",
      nomePrestazione: "Implantologia",
      paziente: "Mariagioia Verde",
      start: "16",
      end: "17",
      date: format(add(new Date(), { days: 1 }), "dd-MM-yyyy", { locale: it }),
    },
  ];

  console.log(events);
  return (
    <div className="lg:flex lg:h-full lg:flex-col h-full ">
      <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime={format(today, "dd-MM-yyyy")}>
            {format(firstDayOfCurrentMonth, "MMMM yyyy")}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch">
            <button
              type="button"
              onClick={prevMonth}
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              onClick={nextMonth}
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="focus:outline-none ml-6 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Create event
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Go to today
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Day view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Week view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Month view
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Year view
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            L<span className="sr-only sm:not-sr-only">unedì</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">artedì</span>
          </div>
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">ercoledì</span>
          </div>
          <div className="bg-white py-2">
            G<span className="sr-only sm:not-sr-only">iovedì</span>
          </div>
          <div className="bg-white py-2">
            V<span className="sr-only sm:not-sr-only">enerdì</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">abato</span>
          </div>
          <div className="bg-white py-2">
            D<span className="sr-only sm:not-sr-only">omenica</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {newDays.map((day, idx) => (
              <div
                key={idx}
                className={classNames(
                  isSameMonth(day, currentMonth)
                    ? "bg-white"
                    : "bg-gray-50 text-gray-500",
                  "relative py-2 px-3",
                  idx === 0 &&
                    colStartClasses[
                      getDay(format(day, "dd-M-yyyy", { locale: it }))
                    ]
                )}
              >
                {/* {format(day, "d", { locale: it })} */}
                <time
                  dateTime={format(day, "dd-MM-yyyy")}
                  className={
                    isToday(day)
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {format(day, "d")}
                </time>

                <ScrollArea className="w-full h-[100px] " key={idx}>
                  <ol className="mt-2">
                    {events.map(
                      (item, idx) =>
                        isSameDay(item.date, format(day, "dd-MM-yyyy")) && (
                          <li key={item.id}>
                            <a
                              href={item.id}
                              className="group flex items-center"
                            >
                              <div className="bg-red-500 h-2 w-2 rounded-full mr-2" />
                              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {item.paziente}
                              </p>
                              <time
                                dateTime={item.date}
                                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                              >
                                {item.start} - {item.end}
                              </time>
                            </a>
                          </li>
                        )
                    )}
                  </ol>
                </ScrollArea>
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {newDays.map((day, idx) => (
              <button
                key={idx}
                type="button"
                className={classNames(
                  isSameMonth(day, firstDayOfCurrentMonth)
                    ? "bg-white"
                    : "bg-gray-50",
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    "font-semibold",
                  isEqual(day, selectedDay) && "text-white",
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    "text-indigo-600",
                  !isEqual(day, selectedDay) &&
                    isSameMonth(day, firstDayOfCurrentMonth) &&
                    !isToday(day) &&
                    "text-gray-900",
                  !isEqual(day, selectedDay) &&
                    !isSameMonth(day, today) &&
                    !isToday(day) &&
                    "text-gray-500",
                  "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.toString()}
                  className={classNames(
                    isEqual(day, selectedDay) &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-indigo-600",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {format(day, "d")}
                </time>
                <p className="sr-only">
                  {
                    events.filter((item) =>
                      isSameDay(
                        format(day, "dd-MM-yyyy", { locale: it }),
                        item.date
                      )
                    ).length
                  }{" "}
                  events
                </p>
                {events.filter((item) =>
                  isSameDay(
                    format(day, "dd-MM-yyyy", { locale: it }),
                    item.date
                  )
                ).length > 0 && (
                  <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {events.map(
                      (event, idx) =>
                        isSameDay(event.date, format(day, "dd-MM-yyyy")) && (
                          <div
                            key={event.id}
                            className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                          />
                        )
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {events.filter((item) =>
        isSameDay(format(selectedDay, "dd-MM-yyyy", { locale: it }), item.date)
      ).length > 0 && (
        <div className="py-10 px-4 sm:px-6 lg:hidden">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
            {events.map(
              (event, idx) =>
                isSameDay(event.date, format(selectedDay, "dd-MM-yyyy")) && (
                  <li
                    key={event.id}
                    className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">
                        {event.nomePrestazione}
                      </p>
                      <time
                        dateTime={event.date}
                        className="mt-2 flex items-center text-gray-700"
                      >
                        <ClockIcon
                          className="mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.start} - {event.end}
                      </time>
                    </div>
                    <a
                      href={event.id}
                      className="ml-6 flex-none self-center rounded-md border border-gray-300 bg-white py-2 px-3 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-gray-50 focus:opacity-100 group-hover:opacity-100"
                    >
                      Edit
                      <span className="sr-only">, {event.nomePrestazione}</span>
                    </a>
                  </li>
                )
            )}
          </ol>
        </div>
      )}
    </div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default CalendarMonthView;
