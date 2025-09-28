'use client'

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function UserPurpose() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [filteredSchools, setFilteredSchools] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const router = useRouter();

  const schools = [
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology (MIT)",
    "University of California, Berkeley",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Chicago",
    "University of Pennsylvania",
    "California Institute of Technology (Caltech)",
    "Duke University",
    "Johns Hopkins University",
    "Northwestern University",
    "Dartmouth College",
    "Brown University",
    "Cornell University",
    "Rice University",
    "University of Notre Dame",
    "Vanderbilt University",
    "Washington University in St. Louis",
    "Emory University",
    "Georgetown University",
    "Carnegie Mellon University",
    "University of Southern California",
    "University of California, Los Angeles (UCLA)",
    "Tufts University",
    "Wake Forest University",
    "University of Michigan",
    "Boston College",
    "New York University",
  ];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = schools.filter((school) =>
        school.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSchools(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setFilteredSchools([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setSearchQuery(school);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    if (selectedSchool) {
      router.push("/invite-friends");
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center px-4 font-inter font-medium leading-6 tracking-[-0.32px] antialiased"
      style={{
        colorScheme: "light",
        fontFeatureSettings: "normal",
        fontVariationSettings: "normal",
      }}
    >
      <div className="fixed top-0 flex flex-row justify-between px-9 py-11 w-full">
        <div>
          <button
            className="flex justify-center items-center w-11 h-11 rounded-4 p-3 ease-in transition-all duration-150 cursor-pointer hover:bg-popover-hover"
            type="button"
            onClick={() => router.push("/verify-email")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666666"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="w-80 flex flex-col items-stretch">
        <h2 className="text-xl text-center mb-3">
          <span
            style={{
              display: "inline-block",
              verticalAlign: "top",
              textDecoration: "inherit",
              textWrap: "balance",
              maxWidth: "250px",
            }}
          >
            What school do you go to?
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-base mb-8">
          Start typing to search. Pick your school to save it.
        </p>

        {/* School Search */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Find your institution"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            style={{
              fontSize: "14px",
            }}
            className="w-full px-6 py-9 rounded-l border border-gray-300  text-base font-normal bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSchools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredSchools.map((school, index) => (
                <button
                  key={index}
                  onClick={() => handleSchoolSelect(school)}
                  style={{
                    fontSize: "14px",
                  }}
                  className="w-full px-6 py-5 text-left text-base font-normal text-gray-900 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                >
                  {school}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          size="lg"
          className={`w-full py-4 text-base font-medium !rounded-xl mb-8 transition-all duration-200 ${
            selectedSchool
              ? "bg-black text-white hover:bg-gray-800"
              : "inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-control-primary text-text-primary hover:bg-control-secondary px-1.5 py-2 text-sm rounded-4 font-medium gap-3 h-14 rounded-6 hover:scale-[1.02] ease-in transition-transform"
          }`}
          onClick={handleContinue}
          disabled={!selectedSchool}
        >
          Continue
        </Button>

        {/* Join Text */}
        <p className="text-sm text-text-primary mt-9 mb-8 text-center">
          Join 100k+ students
        </p>

        {/* Email Info */}
        <div className="flex flex-col items-center justify-center py-8 text-text-primary w-120 text-center text-sm">
          <p>
            Continuing as{" "}
            <span className="font-medium text-black">
              aakashgoel2040@gmail.com
            </span>
          </p>
          <p>
            Log in with another email{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-600 underline hover:text-blue-700"
            >
              here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}