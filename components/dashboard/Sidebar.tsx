"use client";
import { Building, Gauge, HeartPulse, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { FaBriefcaseMedical } from "react-icons/fa6";

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleTriggerSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  const handleTriggerDropDown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={handleTriggerSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div className="flex w-full h-full relative">
        <div
          id="sidebar-multi-level-sidebar"
          className={`z-40 lg:z-0 h-screen w-0 lg:w-[300px] ${
            openSidebar ? `block w-[300px]` : `hidden lg:block `
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 md:px-4 py-7 md:py-10 overflow-y-auto bg-[#2a4b9a]">
            <div className="w-full flex justify-end items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 block lg:hidden text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                onClick={handleTriggerSidebar}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <ul className="space-y-5 font-medium">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <Gauge className="text-white group-hover:text-black" />
                  <span className="ms-3 text-white group-hover:text-black">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/clinica/pianoCura"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <HeartPulse className="text-white group-hover:text-black" />

                  <span className="ms-3 text-white group-hover:text-black">
                    Clinica
                  </span>
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={handleTriggerDropDown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap text-white group-hover:text-black">
                    Agenda
                  </span>
                  <svg
                    className="w-3 h-3 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    openDropdown ? `block` : `hidden`
                  } py-2 space-y-2`}
                >
                  <li className="ps-3">
                    <a
                      href="/agenda/santantimo"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>

                      <span className="ms-3 text-white group-hover:text-black text-sm">
                        Sede Sant&apos;Antimo
                      </span>
                    </a>
                  </li>
                  <li className="ps-3">
                    <a
                      href="/agenda/giugliano"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>

                      <span className="ms-3 text-white group-hover:text-black text-sm">
                        Sede Giugliano
                      </span>
                    </a>
                  </li>
                  <li className="ps-3">
                    <a
                      href="/agenda/aversa"
                      className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      >
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>

                      <span className="ms-3 text-white group-hover:text-black text-sm">
                        Sede Aversa
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  href="/prestazioniLista"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-3 text-white group-hover:text-black">
                    Lista Prestazioni
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/operatoriLista"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-3 text-white group-hover:text-black">
                    Lista Operatori
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sediLista"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <Building className="text-white group-hover:text-black" />

                  <span className="ms-3 text-white group-hover:text-black">
                    Lista Sedi
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/listaPazienti"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group"
                >
                  <FaBriefcaseMedical className="text-white group-hover:text-black" />

                  <span className="ms-3 text-white group-hover:text-black">
                    Lista Pazienti
                  </span>
                </Link>
              </li>
              <li>
                <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#E6E6EA] group">
                  <LogOut className="text-white group-hover:text-black" />
                  <p
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="ms-3 text-white group-hover:text-black"
                  >
                    Signout
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <section className="w-full">{children}</section>
      </div>
    </>
  );
};

export default Sidebar;
