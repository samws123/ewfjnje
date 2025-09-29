'use client'


import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
// import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

const Dashboard: React.FC = () => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("fast");
  const [theme, setTheme] = useState("light");
  const [openImport, setOpenImport] = useState(false);
  const [selectedWordLimit, setSelectedWordLimit] = useState(250);
  return (
    <div className="min-h-screen bg-white flex font-inter antialiased">
      {/* Sidebar */}
      {sidebarVisible && (
        <div className="w-64 bg-gray-50 border-r border-gray-200 pt-4 flex flex-col">
          <div className="bg-background-primary overflow-hidden group/sidebar h-full min-h-0  flex flex-col w-full z-50">
            <div className="flex items-center mb-5 px-4">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 rounded-5 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 text-sm w-fit font-semibold gap-1 h-11"
                >
                  <button
                    className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 rounded-5 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 text-sm w-fit font-semibold gap-1 h-11"
                    type="button"
                  >
                    <span className="truncate">
                      <span className="truncate">jasara.pauling</span>
                    </span>
                    <span className="ml-auto">
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chevron-down"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </span>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-4 z-50 overflow-hidden rounded-6 border border-border-primary bg-popover text-text-primary shadow-feint data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-[200px] p-2">
                  <div className="text-sm font-semibold flex flex-col py-2 px-4">
                    <div>
                      <div className="flex flex-row w-full gap-4 items-center">
                        <p className="text-sm font-semibold text-text-primary">
                          taha.h5363
                        </p>
                        <div className="text-xs font-semibold text-blue bg-blue/10 py-1 px-2 rounded-2">
                          Free
                        </div>
                      </div>
                      <p className="text-sm font-medium text-text-secondary">
                        taha.h5363@gmail.com
                      </p>
                    </div>
                  </div>
                  <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="-mx-2 my-2 h-px bg-border"
                  ></div>
                  <div
                    role="menuitem"
                    className="focus:outline-none group"
                    tabIndex={-1}
                    data-orientation="vertical"
                    data-radix-collection-item=""
                  >
                    <button
                      aria-busy="false"
                      className="select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 flex w-full flex-row justify-start items-center"
                    >
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-settings"
                          aria-hidden="true"
                        >
                          <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </span>
                      <span className="truncate">Settings</span>
                    </button>
                  </div>
                  <div
                    role="menuitem"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    className="focus:outline-none group"
                    tabIndex={-1}
                    data-orientation="vertical"
                    data-radix-collection-item=""
                  >
                    {/* Theme Radix Dropdown - open on hover, menu on right */}
                    <div className="relative group" style={{ width: "100%" }}>
                      <DropdownMenu open={undefined}>
                        <DropdownMenuTrigger asChild>
                          <button
                            aria-busy="false"
                            className="select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 flex w-full flex-row justify-start items-center"
                            tabIndex={0}
                            onMouseEnter={(e) => {
                              // Open menu on hover
                              const trigger = e.currentTarget;
                              trigger.click();
                            }}
                            onMouseLeave={(e) => {
                              // Close menu when mouse leaves button and menu
                              const menu = document.getElementById(
                                "theme-dropdown-menu"
                              );
                              if (menu) {
                                menu.dispatchEvent(
                                  new MouseEvent("mouseleave", {
                                    bubbles: true,
                                  })
                                );
                              }
                            }}
                          >
                            <span className="shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-sun"
                                aria-hidden="true"
                              >
                                <circle cx="12" cy="12" r="4"></circle>
                                <path d="M12 2v2"></path>
                                <path d="M12 20v2"></path>
                                <path d="m4.93 4.93 1.41 1.41"></path>
                                <path d="m17.66 17.66 1.41 1.41"></path>
                                <path d="M2 12h2"></path>
                                <path d="M20 12h2"></path>
                                <path d="m6.34 17.66-1.41 1.41"></path>
                                <path d="m19.07 4.93-1.41 1.41"></path>
                              </svg>
                            </span>
                            <span className="truncate">Theme</span>
                            <span className="ml-auto">
                              <span className="shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-chevron-right"
                                  aria-hidden="true"
                                >
                                  <path d="m9 18 6-6-6-6"></path>
                                </svg>
                              </span>
                            </span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          id="theme-dropdown-menu"
                          align="start"
                          side="right"
                          sideOffset={0}
                          className="min-w-[140px]"
                          onMouseLeave={(e) => {
                            // Close menu on mouse leave
                            const trigger =
                              document.activeElement as HTMLElement;
                            if (trigger) trigger.blur();
                          }}
                        >
                          <DropdownMenuItem
                            onSelect={() => setTheme("light")}
                            className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-popover-hover rounded text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-sun"
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="4"></circle>
                              <path d="M12 2v2"></path>
                              <path d="M12 20v2"></path>
                              <path d="m4.93 4.93 1.41 1.41"></path>
                              <path d="m17.66 17.66 1.41 1.41"></path>
                              <path d="M2 12h2"></path>
                              <path d="M20 12h2"></path>
                              <path d="m6.34 17.66-1.41 1.41"></path>
                              <path d="m19.07 4.93-1.41 1.41"></path>
                            </svg>
                            Light
                            {theme === "light" && (
                              <span className="ml-auto">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#1DA1F2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <path d="M9 12l2 2l4-4" />
                                </svg>
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setTheme("dark")}
                            className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-popover-hover rounded text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-moon"
                              aria-hidden="true"
                            >
                              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
                            </svg>
                            Dark
                            {theme === "dark" && (
                              <span className="ml-auto">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#1DA1F2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <path d="M9 12l2 2l4-4" />
                                </svg>
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => setTheme("system")}
                            className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-popover-hover rounded text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-laptop"
                              aria-hidden="true"
                            >
                              <rect
                                x="2"
                                y="4"
                                width="20"
                                height="14"
                                rx="2"
                              ></rect>
                              <path d="M2 20h20"></path>
                            </svg>
                            System
                            {theme === "system" && (
                              <span className="ml-auto">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#1DA1F2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <path d="M9 12l2 2l4-4" />
                                </svg>
                              </span>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div
                    role="menuitem"
                    className="focus:outline-none group"
                    tabIndex={-1}
                    data-orientation="vertical"
                    data-radix-collection-item=""
                  >
                    <button
                      aria-busy="false"
                      className="select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 flex w-full flex-row justify-start items-center"
                    >
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-chrome"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <circle cx="12" cy="12" r="4"></circle>
                          <line x1="21.17" x2="12" y1="8" y2="8"></line>
                          <line x1="3.95" x2="8.54" y1="6.06" y2="14"></line>
                          <line x1="10.88" x2="15.46" y1="21.94" y2="14"></line>
                        </svg>
                      </span>
                      <span className="truncate">Chrome extension</span>
                    </button>
                  </div>
                  <div
                    role="menuitem"
                    className="focus:outline-none group"
                    tabIndex={-1}
                    data-orientation="vertical"
                    data-radix-collection-item=""
                  >
                    <button
                      aria-busy="false"
                      className="select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 flex w-full flex-row justify-start items-center"
                      onClick={() => router.push("/")}
                    >
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-log-out"
                          aria-hidden="true"
                        >
                          <path d="m16 17 5-5-5-5"></path>
                          <path d="M21 12H9"></path>
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        </svg>
                      </span>
                      <span className="truncate">Logout</span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <button
                aria-busy="false"
                className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-4 py-2 rounded-5 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 text-sm w-fit font-semibold gap-1 h-11"
                type="button"
                id="radix-_r_9_"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
              >
                <span className="truncate">
                  <span className="truncate">jasara.pauling</span>
                </span>
                <span className="ml-auto">
                  <span className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-down"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </span>
                </span>
              </button> */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  aria-busy="false"
                  className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 w-11 rounded-4 hover:bg-control-primary md:group-hover/sidebar:opacity-100 md:opacity-0 transition-all duration-200 ease-in-out"
                  id="upload-button"
                  aria-label="Toggle sidebar"
                  onClick={() => setSidebarVisible(false)}
                >
                  <span className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevrons-left transition-transform duration-200 rotate-0 group-data-[peeking=true]/leftnav:rotate-180"
                      aria-hidden="true"
                    >
                      <path d="m11 17-5-5 5-5"></path>
                      <path d="m18 17-5-5 5-5"></path>
                    </svg>
                  </span>
                </button>
                <input
                  id="plus-menu-file-input"
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.md,.txt,.epub,.png,.jpg,.jpeg,.tiff,.bmp,.heic,.mp4,.mp3,.wav"
                  type="file"
                />
                {/* <input
                  id="plus-menu-folder-input"
                  className="hidden"
                  multiple
                  {...({ webkitdirectory: "true" } as any)}
                  type="file"
                /> */}
                <DropdownMenu open={undefined}>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-busy="false"
                      className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover h-11 w-11 rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0"
                      type="button"
                      id="radix-_r_1m_"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      data-state="closed"
                    >
                      <span className="truncate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={0}
                    className="mt-2"
                  >
                    <div className="pb-2">
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <button
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-file-up"
                              aria-hidden="true"
                            >
                              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                              <path d="M12 12v6"></path>
                              <path d="m15 15-3-3-3 3"></path>
                            </svg>
                          </span>
                          <span className="truncate">File upload</span>
                        </button>
                      </div>
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <button
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-folder-up"
                              aria-hidden="true"
                            >
                              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                              <path d="M12 10v6"></path>
                              <path d="m9 13 3-3 3 3"></path>
                            </svg>
                          </span>
                          <span className="truncate">Folder upload</span>
                        </button>
                      </div>
                      <div
                        role="menuitem"
                        id="radix-_r_5j_"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        aria-controls="radix-_r_5i_"
                        data-state="closed"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              aria-busy="false"
                              className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                            >
                              <span className="shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-download"
                                  aria-hidden="true"
                                >
                                  <path d="M12 15V3"></path>
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <path d="m7 10 5 5 5-5"></path>
                                </svg>
                              </span>
                              <span className="truncate">Import</span>
                              <span className="ml-auto">
                                <span className="shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-chevron-right"
                                    aria-hidden="true"
                                  >
                                    <path d="m9 18 6-6-6-6"></path>
                                  </svg>
                                </span>
                              </span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            <div
                              role="menuitem"
                              className="focus:outline-none group"
                              tabIndex={-1}
                              data-orientation="vertical"
                              data-radix-collection-item=""
                            >
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    aria-busy="false"
                                    className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                                  >
                                    <span className="shrink-0">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-scan-barcode"
                                        aria-hidden="true"
                                      >
                                        <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                                        <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                                        <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                                        <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                                        <path d="M8 7v10"></path>
                                        <path d="M12 7v10"></path>
                                        <path d="M17 7v10"></path>
                                      </svg>
                                    </span>
                                    <span className="truncate">ID</span>
                                    <span className="ml-auto">
                                      <span className="shrink-0">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="15"
                                          height="15"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="lucide lucide-chevron-right"
                                          aria-hidden="true"
                                        >
                                          <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                      </span>
                                    </span>
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start">
                                  <form className="flex flex-col p-4">
                                    <div className="w-full flex flex-col items-start">
                                      <div className="flex items-center gap-2 mb-4 pl-4 pt-4">
                                        <label className="text-base font-semibold text-text-primary">
                                          ID
                                        </label>
                                        <button
                                          data-state="closed"
                                          type="button"
                                        >
                                          <div>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="14"
                                              height="14"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="lucide lucide-circle-question-mark text-text-primary"
                                              aria-hidden="true"
                                            >
                                              <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                              ></circle>
                                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                              <path d="M12 17h.01"></path>
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                      <input
                                        className="bg-popover flex flex-row items-center justify-between px-6 h-12 rounded-5 border  text-text-primary border-border-primary focus:outline-none w-full text-sm leading-[100%] placeholder:text-text-secondary tracking-[-0.32px]"
                                        placeholder="DOI, PMID, arXiv"
                                        type="text"
                                        name="sourcesId"
                                      />
                                    </div>
                                    <div className="mt-4 flex flex-row gap-4 justify-end">
                                      <button
                                        aria-busy="false"
                                        className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover py-2 rounded-5 gap-3 h-10 px-5 text-sm"
                                        type="button"
                                      >
                                        <span className="truncate">Cancel</span>
                                      </button>
                                      <button
                                        aria-busy="false"
                                        className="inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-control-primary text-text-primary hover:bg-control-secondary py-2 text-sm rounded-4 font-medium gap-3 px-5 h-10 !text-sm"
                                        type="button"
                                      >
                                        <span className="truncate">Import</span>
                                      </button>
                                    </div>
                                  </form>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div
                              role="menuitem"
                              className="focus:outline-none group"
                              tabIndex={-1}
                              data-orientation="vertical"
                              data-radix-collection-item=""
                            >
                              <button
                                aria-busy="false"
                                className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                              >
                                <span className="shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-link"
                                    aria-hidden="true"
                                  >
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                  </svg>
                                </span>
                                <span className="truncate">URL</span>
                                <span className="ml-auto">
                                  <span className="shrink-0">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="15"
                                      height="15"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="lucide lucide-chevron-right"
                                      aria-hidden="true"
                                    >
                                      <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                  </span>
                                </span>
                              </button>
                            </div>
                            <div
                              role="separator"
                              aria-orientation="horizontal"
                              className="-mx-2 my-2 h-px bg-border"
                            ></div>
                            <div
                              role="menuitem"
                              className="focus:outline-none group"
                              tabIndex={-1}
                              data-orientation="vertical"
                              data-radix-collection-item=""
                            >
                              <button
                                aria-busy="false"
                                className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                              >
                                <span className="shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-cable"
                                    aria-hidden="true"
                                  >
                                    <path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"></path>
                                    <path d="M17 21v-2"></path>
                                    <path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"></path>
                                    <path d="M21 21v-2"></path>
                                    <path d="M3 5V3"></path>
                                    <path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"></path>
                                    <path d="M7 5V3"></path>
                                  </svg>
                                </span>
                                <span className="truncate">
                                  Connect your apps
                                </span>
                              </button>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="h-[1px] bg-border"></div>
                    <div className="py-2">
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <button
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-messages-square"
                              aria-hidden="true"
                            >
                              <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                              <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"></path>
                            </svg>
                          </span>
                          <span className="truncate">New chat</span>
                        </button>
                      </div>
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <button
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-file-pen"
                              aria-hidden="true"
                            >
                              <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5"></path>
                              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                              <path d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                            </svg>
                          </span>
                          <span className="truncate">New note</span>
                        </button>
                      </div>
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <button
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-folder-open"
                              aria-hidden="true"
                            >
                              <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </span>
                          <span className="truncate">New folder</span>
                        </button>
                      </div>
                    </div>
                    <div className="h-[1px] bg-border"></div>
                    <div className="pt-2">
                      <div
                        role="menuitem"
                        className="focus:outline-none group"
                        tabIndex={-1}
                        data-orientation="vertical"
                        data-radix-collection-item=""
                      >
                        <a
                          aria-busy="false"
                          className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-[28px] px-1.5 py-2 text-sm rounded-4 font-medium gap-3 w-full justify-start text-text-secondary"
                          href="https://docs.anara.com/import/file-types"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="shrink-0">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-circle-question-mark"
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                              <path d="M12 17h.01"></path>
                            </svg>
                          </span>
                          <span className="truncate">
                            Learn about file types
                          </span>
                        </a>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 space-y-1">
              <button className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 duration-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-house flex-shrink-0 text-text-primary"
                  aria-hidden="true"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>Home</span>
              </button>
              <button className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 duration-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-rows3 lucide-rows-3 flex-shrink-0 text-text-primary"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M21 9H3"></path>
                  <path d="M21 15H3"></path>
                </svg>
                <span>Library</span>
              </button>
              <button className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 duration-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search flex-shrink-0 text-text-primary"
                  aria-hidden="true"
                >
                  <path d="m21 21-4.34-4.34"></path>
                  <circle cx="11" cy="11" r="8"></circle>
                </svg>
                <span>Search</span>
              </button>
            </div>


            <div className="flex-1 min-h-0 overflow-y-scroll px-4 space-y-1 select-none scrollbar-overlay">
              {/* Chats Section */}
              <div className="flex flex-col group/chats gap-1">
                <div
                  aria-busy="false"
                  className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden w-full justify-start px-4 py-2 rounded-5 rounded-4 gap-3 duration-0 group/chat-header h-9.5 text-text-secondary font-semibold text-[13px]"
                  tabIndex={0}
                  role="button"
                  aria-expanded="true"
                  aria-controls="chats-content"
                >
                  <span className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right text-text-secondary flex-shrink-0 transition-transform duration-200 ease-out rotate-90"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </span>
                  <span className="truncate">Chats</span>
                  <span className="ml-auto">
                    <span className="shrink-0 ml-auto">
                      <button
                        aria-busy="false"
                        className="inline-flex items-center select-none font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground rounded-4 group-hover/chat-header:visible group-hover/chats:visible group-focus-within/chat-header:visible group-focus-within/chats:visible size-9 hover:bg-secondary focus:outline-none invisible absolute right-1 top-1/2 -translate-y-1/2"
                        aria-label="Create a new chat"
                        data-state="closed"
                        type="button"
                      >
                        <span className="truncate">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </span>
                      </button>
                    </span>
                  </span>
                </div>
                <div
                  id="chats-content"
                  className="overflow-hidden"
                  style={{ height: "auto", opacity: 1 }}
                >
                  <div className="space-y-1 select-none" style={{ opacity: 1 }}>
                    <div style={{ opacity: 1, transform: "none" }}>
                      <p className="text-text-secondary py-3 pl-4 text-sm">
                        No chats available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Folders Section */}
              <div className="flex flex-col min-h-0 gap-1 group/sidebar-chatbots">
                <div
                  aria-busy="false"
                  className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden w-full justify-start px-4 py-2 rounded-5 rounded-4 gap-3 duration-0 group/folder-header h-9.5 text-text-secondary font-semibold text-[13px]"
                  tabIndex={0}
                  role="button"
                  aria-expanded="true"
                  aria-controls="folders-content"
                >
                  <span className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-right text-text-secondary flex-shrink-0 transition-transform duration-200 ease-out rotate-90"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </span>
                  <span className="truncate">Folders</span>
                  <span className="ml-auto">
                    <span className="shrink-0 ml-auto">
                      <button
                        aria-busy="false"
                        className="inline-flex items-center select-none font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 group-hover/sidebar-chatbots:visible group-hover/chats:visible group-focus-within/chat-header:visible group-focus-within/chats:visible group-hover/folder-header:visible group-focus-within/folder-header:visible size-9 hover:bg-secondary focus:outline-none invisible absolute right-1 top-1/2 -translate-y-1/2"
                        id="create-button"
                        aria-label="Create a new folder"
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded="false"
                        data-state="closed"
                      >
                        <span className="shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </span>
                      </button>
                    </span>
                  </span>
                </div>
                <div
                  className="absolute right-0 top-12 w-4 h-4"
                  id="open-folder"
                ></div>
                <div
                  className="overflow-hidden flex flex-col"
                  style={{ height: "auto", opacity: 1 }}
                >
                  <div className="" style={{ opacity: 1, transform: "none" }}>
                    <div className="select-none space-y-1">
                      <div
                        className="TreeItem-module__UmvCcW__Wrapper touch-manipulation select-none relative rounded-4 before:absolute before:inset-0 before:rounded-4 before:border-2 before:border-dashed before:border-transparent before:pointer-events-none"
                        role="button"
                        tabIndex={0}
                        aria-disabled="false"
                        aria-roledescription="sortable"
                        aria-describedby="DndDescribedBy-3"
                      >
                        <div className="flex flex-col">
                          <div
                            className="relative hover:bg-control-primary rounded-4"
                            style={{ paddingLeft: 0 }}
                          >
                            <a href="" >
                              <div
                                aria-busy="false"
                                className="inline-flex items-center  select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 box-border focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 w-full justify-start text-foreground focus-visible:!outline-none focus-visible:!ring-0 focus-visible:ring-offset-0 hover:bg-muted hover:pr-10"
                              >
                                <span className="shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-folder flex-shrink-0 z-10 hover:bg-accent rounded-2"
                                    aria-hidden="true"
                                  >
                                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                                  </svg>
                                </span>
                                <span className="truncate">
                                  <span className="text-ellipsis text-text-primary select-none whitespace-nowrap items-center overflow-hidden pr-2">
                                    Age reversal research
                                  </span>
                                </span>
                                <span className="ml-auto">
                                  <span className="shrink-0 ml-4">
                                    <div className="absolute top-1/2 right-1 -translate-y-1/2 z-[999] h-9 flex items-center overflow-hidden group w-10">

                                      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                        <DropdownMenuTrigger asChild>
                                          <button
                                            aria-busy="false"
                                            className="inline-flex items-center select-none font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 absolute  right-0 size-9 hover:bg-secondary focus:outline-none z-20 invisible group-hover:visible data-[state=open]:visible"
                                            type="button"
                                            aria-haspopup="menu"
                                            aria-expanded={isMenuOpen}
                                            data-state={isMenuOpen ? "open" : "closed"}
                                            onClick={(e) => e.preventDefault()}
                                          >
                                            <span className="truncate">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="lucide lucide-ellipsis-vertical"
                                                aria-hidden="true"
                                              >
                                                <circle cx="12" cy="12" r="1"></circle>
                                                <circle cx="12" cy="5" r="1"></circle>
                                                <circle cx="12" cy="19" r="1"></circle>
                                              </svg>
                                            </span>
                                          </button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="start" className="w-40 absolute left-[-138px] bg-white rounded-lg shadow-lg p-2">
                                          {/* Rename Item */}
                                          <DropdownMenuItem className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="15"
                                              height="15"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="mr-3 h-7 w-7 "
                                            >
                                              <path d="M12 20h9" />
                                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                            <span>Rename</span>
                                          </DropdownMenuItem>

                                          {/* Separate Item */}
                                          <DropdownMenuItem className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="15"
                                              height="15"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="mr-3 h-7 w-7"
                                            >
                                              <path d="M16 3h5v5" />
                                              <path d="M8 21H3v-5" />
                                              <path d="M21 3l-7.5 7.5" />
                                              <path d="M3 21l7.5-7.5" />
                                            </svg>
                                            <span>Separate</span>
                                          </DropdownMenuItem>

                                          {/* Share Item */}
                                          <DropdownMenuItem className="flex items-center cursor-pointer p-2 hover:bg-gray-100 rounded">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="15"
                                              height="15"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="mr-3 h-7 w-7"
                                            >
                                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                              <circle cx="9" cy="7" r="4" />
                                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                            </svg>
                                            <span>Share</span>
                                          </DropdownMenuItem>

                                          {/* Delete Item */}
                                          <DropdownMenuItem className="flex items-center text-red-500 cursor-pointer p-2 hover:bg-gray-100 rounded">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="15"
                                              height="15"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="mr-3 h-7 w-7"
                                            >
                                              <path d="M3 6h18" />
                                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                            <span>Delete</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>

                                    </div>
                                  </span>
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* DnD accessibility region */}
                <div id="DndDescribedBy-3" style={{ display: "none" }}>
                  To pick up a draggable item, press the space bar. While
                  dragging, use the arrow keys to move the item. Press space
                  again to drop the item in its new position, or press escape to
                  cancel.
                </div>
                <div
                  id="DndLiveRegion-3"
                  role="status"
                  aria-live="assertive"
                  aria-atomic="true"
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 1,
                    height: 1,
                    margin: -1,
                    border: 0,
                    padding: 0,
                    overflow: "hidden",
                    clip: "rect(0px, 0px, 0px, 0px)",
                    clipPath: "inset(100%)",
                    whiteSpace: "nowrap",
                  }}
                ></div>
              </div>
            </div>


            <div className="flex flex-shrink-0 z-10 flex-col p-4 gap-5">
              <div className="flex flex-col items-center gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      aria-busy="false"
                      className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 duration-0"
                    >
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-award flex-shrink-0 text-text-primary"
                          aria-hidden="true"
                        >
                          <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
                          <circle cx="12" cy="8" r="6"></circle>
                        </svg>
                      </span>
                      <span className="truncate">Invite and earn</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-md">
                    <div className="w-full py-5 px-5">
                      <div className="mb-2">
                        <h2 className="text-lg font-semibold text-gray-900">
                          Invite friends, get Pro for 1 day
                        </h2>
                        <p className="text-xs text-gray-500 mt-3">
                          Unlock 1 day of Atlas Pro each time a friend you
                          invite finishes creating their account
                        </p>
                      </div>
                      <div className="mt-7">
                        <div>
                          <label className="block text-xs font-medium text-gray-800 mb-2">
                            Invite with link
                          </label>
                          <div className="flex items-center bg-gray-100 rounded-xl px-5 py-5">
                            <span
                              className="text-sm text-gray-700 flex-1 truncate select-all"
                              id="invite-link"
                            >
                              www.atlas.org/invite?u=DVGRHZ
                            </span>
                            <button
                              className="ml-3 px-7 py-5 bg-gray-800 hover:bg-gray-300 text-xs font-medium rounded-md transition text-white"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  "www.atlas.org/invite?u=DVGRHZ"
                                );
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Invite code
                          </label>
                          <div className="flex items-center bg-gray-100 rounded-xl px-5 py-5">
                            <span
                              className="text-sm text-gray-700 flex-1 select-all"
                              id="invite-code"
                            >
                              DVGRHZ
                            </span>
                            <button
                              className="ml-3 px-7 py-5 bg-gray-800 hover:bg-gray-300 text-xs font-medium rounded-md transition text-white"
                              onClick={() => {
                                navigator.clipboard.writeText("DVGRHZ");
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="my-8 border-t border-gray-200"></div>
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-1">
                          <span className="block text-xs font-medium text-gray-700 mb-1">
                            Invite history{" "}
                            <span className="font-normal">1</span>
                          </span>
                          <button
                            className="text-gray-400 hover:text-gray-600 p-1 rounded transition"
                            tabIndex={-1}
                          >
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 4v16m8-8H4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center bg-gray-50 rounded-lg px-5 py-5 mt-3">
                          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mr-3">
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-gray-400"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="8" r="4" />
                              <path d="M16 16a4 4 0 0 0-8 0" />
                            </svg>
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-xs font-medium text-gray-800 truncate">
                              LavenderCurlyPerch
                            </span>
                            <span className="block text-[11px] text-gray-400">
                              16 hours ago
                            </span>
                          </div>
                          <button
                            className="ml-2 text-gray-400 hover:text-gray-600 p-1 rounded transition"
                            tabIndex={-1}
                          >
                            <svg
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="w-3.5 h-3.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M18 6L6 18M6 6l12 12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Popover open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                  <PopoverTrigger asChild>
                    <button
                      aria-busy="false"
                      className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 duration-0"
                      type="button"
                    >
                      <span className="shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-thumbs-up flex-shrink-0 text-text-primary"
                          aria-hidden="true"
                        >
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                      </span>
                      <span className="truncate">Feedback</span>
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    side="top"
                    align="start"
                    sideOffset={5}
                    className="w-[250px] bg-white p-4 rounded-xl shadow-lg border"
                  >
                    <div>
                      <textarea
                        placeholder="How can we improve Anara?"
                        className="w-full h-20 p-2 text-base border-none resize-none focus:outline-none placeholder-gray-500"
                      />
                      <div className="flex justify-end items-center mt-2 space-x-3">
                        <button
                          onClick={() => setIsFeedbackOpen(false)}
                          className="px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setIsFeedbackOpen(false)} // Submit के बाद भी बंद करें
                          className="px-4 py-2 text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <button
                  aria-busy="false"
                  className="inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border hover:bg-control-primary focus:bg-popover-hover focus:text-accent-foreground data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground overflow-hidden font-medium w-full text-text-primary justify-start text-sm px-4 py-2 h-9.5 rounded-5 rounded-4 gap-3 data-[state=open]:bg-control-primary focus-visible:outline-none focus-visible:ring-0 duration-0"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                >
                  <span className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-question-mark flex-shrink-0 text-text-primary"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                  </span>
                  <span className="truncate">Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        <div className="sticky top-0 z-10 pl-6 pr-4 py-4 h-[45px] flex-shrink-0 w-full flex flex-row justify-between items-center bg-background-primary">
          <div className="flex items-center gap-4">
            {!sidebarVisible && (
              <button
                aria-busy="false"
                className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 w-11 rounded-4"
                onClick={() => setSidebarVisible(true)}
              >
                <span className="truncate">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-panel-left"
                    aria-hidden="true"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 3v18"></path>
                  </svg>
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-row items-center gap-6 ml-auto">
            <button
              aria-busy="false"
              className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-secondary text-secondary-foreground hover:bg-secondary-hover px-4 py-2 h-9.5 rounded-5 gap-3"
            >
              <span className="truncate">Upgrade</span>
            </button>
          </div>
        </div>

        {/* <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
          
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              title="Back to mosaic"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

          
            <button
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarVisible(!sidebarVisible)}
              title="Toggle sidebar"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <Button className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-2 !rounded-lg">
            Upgrade
          </Button>
        </div> */}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="max-w-4xl w-full text-center space-y-8">
            {/* GPT-Style Chat Input */}
            <div className="max-w-[44rem] w-full p-10 pt-20 flex flex-col gap-10 mx-auto pb-24 relative">
              <div className="relative border-2 border-gray-100 rounded-2xl bg-white shadow-sm flex z-0 flex-col justify-between gap-2 rounded-8 shadow-feint p-[1px] bg-popover-hover-solid ">
                {/* Text Input Area */}
                <div className="relative px-5 pb-3 pt-2">
                  <Textarea
                    placeholder="Understand, research and write about anything"
                    className="min-h-[20px] w-full resize-none border-0 bg-transparent px-2 py-4 text-base placeholder:text-gray-500 focus:outline-none focus:ring-[0!important] focus:ring-offset-0"
                    style={{ fontSize: "15px" }}
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {/* <Textarea
                    placeholder="Understand, research and write about anything"
                    className="min-h-[60px] w-full resize-none border-0 bg-transparent px-2 py-2 text-base placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
                    rows={2}
                  /> */}
                  {/* <div className="absolute bottom-5 right-5">
                    <Button className="bg-black text-white hover:bg-gray-800 text-sm px-4 py-2 !rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </Button>
                  </div> */}
                </div>

                {/* Action Buttons Inside Input */}
                <div className="flex items-center justify-start space-x-3 px-5 pb-5 pb-4">
                  {/* Model Selection Dropdown */}
                  <div className="relative">
                    <Button
                      className="select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 box-border data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none group inline-flex items-center gap-2 px-5 py-2 rounded-4 text-sm font-medium transition-all duration-200 cursor-pointer bg-secondary hover:bg-secondary-hover text-text-primary focus-visible:ring-0 focus-visible:ring-offset-0 w-fit min-w-0 max-w-full"
                      onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                    >
                      <svg
                        width={12}
                        height={12}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span>{selectedModel}</span>
                      <svg
                        width={12}
                        height={12}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Button>

                    {modelDropdownOpen && (
                      <div className="absolute py-2 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[100px]">
                        <div className="py-1">
                          {["fast", "thinking", "pro"].map((option) => (
                            <button
                              key={option}
                              className="block w-full px-5 py-2 text-xs text-left text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedModel(option);
                                setModelDropdownOpen(false);
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 box-border data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none group inline-flex items-center gap-2 px-5 py-2 rounded-4 text-sm font-medium transition-all duration-200 cursor-pointer bg-secondary hover:bg-secondary-hover text-text-primary focus-visible:ring-0 focus-visible:ring-offset-0 w-fit min-w-0 max-w-full">
                        <span style={{ fontSize: "14px" }}>
                          {selectedWordLimit} words
                        </span>
                        <svg
                          width={12}
                          height={12}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="mt-2 max-w-[140px]"
                      align="start"
                    >
                      {[
                        { label: "50 words", value: 50 },
                        { label: "120 words", value: 120 },
                        { label: "250 words", value: 250 },
                        { label: "500 words", value: 500, pro: true },
                        { label: "No limit", value: "unlimited", pro: true },
                      ].map((option) => (
                        <button
                          key={option.value}
                          className={`inline-flex items-center select-none relative whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary hover:bg-control-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground px-1.5 text-sm rounded-4 font-medium gap-3 w-full justify-start h-auto py-2`}
                          onClick={() => {
                            setSelectedWordLimit(option.value as number);
                          }}
                          role="menuitem"
                          tabIndex={-1}
                        >
                          <span className="truncate">
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="font-medium">
                                    {option.label}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </span>
                          <span className="ml-auto">
                            <span className="shrink-0">
                              <div className="flex items-center gap-2">
                                {selectedWordLimit === option.value && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={15}
                                    height={15}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-check h-7 w-7 text-blue"
                                    aria-hidden="true"
                                  >
                                    <path d="M20 6 9 17l-5-5"></path>
                                  </svg>
                                )}
                                {option.pro &&
                                  selectedWordLimit !== option.value && (
                                    <span className="text-xs text-blue bg-blue/10 px-3 py-1 rounded-2 font-medium">
                                      Pro
                                    </span>
                                  )}
                              </div>
                            </span>
                          </span>
                        </button>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* <Button className="select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 box-border data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 rounded-4 data-[state=open]:bg-control-primary focus-visible:outline-none group inline-flex items-center gap-2 px-5 py-2 rounded-4 text-sm font-medium transition-all duration-200 cursor-pointer bg-secondary hover:bg-secondary-hover text-text-primary focus-visible:ring-0 focus-visible:ring-offset-0 w-fit min-w-0 max-w-full">
                    <svg
                      width={12}
                      height={12}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Button> */}

                  <div
                    className="flex flex-row gap-2 flex-shrink-0 "
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    <button
                      aria-busy="false"
                      className="inline-flex items-center select-none relative font-semibold justify-center whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border text-text-primary data-[highlighted]:bg-popover-hover data-[highlighted]:text-accent-foreground data-[state=open]:bg-popover-hover data-[state=highlighted]:bg-popover-hover group-data-[highlighted]:bg-popover-hover group-data-[highlighted]:text-accent-foreground group-focus:bg-popover-hover group-focus:text-accent-foreground h-11 w-11 rounded-4 hover:bg-popover-hover"
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls="radix-_r_29_"
                      data-state="closed"
                    >
                      <span className="truncate">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-plus h-[14px] w-[14px] text-text-primary"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                      </span>
                    </button>
                    <button
                      onClick={() => {
                        if (!inputValue.trim() || isSending) return;
                        setIsSending(true);
                        setTimeout(() => {
                          setIsSending(false);
                          setInputValue("");
                        }, 2000);
                      }}
                      disabled={!inputValue.trim() || isSending}
                      className={`flex justify-center items-center rounded-full p-3 transition-all duration-200 ease-in-out 
      ${isSending
                          ? 'bg-blue-600 text-white cursor-wait'
                          : inputValue.trim()
                            ? 'bg-blue-600 text-white cursor-pointer'
                            : 'bg-secondary text-text-secondary cursor-not-allowed'
                        }`}
                    >
                      {isSending ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" className="h-7 w-7 ">
                          <rect x="5" y="5" width="15" height="15" fill="white" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="m5 12 7-7 7 7"></path>
                          <path d="M12 19V5"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;