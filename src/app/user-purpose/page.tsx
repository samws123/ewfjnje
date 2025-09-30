'use client'

import React, { useState, useEffect, useLayoutEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

interface School {
  id: string;
  lms: string;
  base_url: string;
}

export default function UserPurpose() {
  const [checkingProfile, setCheckingProfile] = useState<boolean>(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();


  const schools: School[] = [
    { id: '1', name: 'Stanford University', lms: 'canvas', base_url: 'https://canvas.stanford.edu' },
    { id: '2', name: 'Massachusetts Institute of Technology', lms: 'canvas', base_url: 'https://canvas.mit.edu' },
    { id: '3', name: 'UC Berkeley (bCourses)', lms: 'canvas', base_url: 'https://bcourses.berkeley.edu' },
    { id: '4', name: 'UCLA (Bruin Learn)', lms: 'canvas', base_url: 'https://bruinlearn.ucla.edu' },
    { id: '5', name: 'University of Chicago', lms: 'canvas', base_url: 'https://canvas.uchicago.edu' },
    { id: '6', name: 'Yale University', lms: 'canvas', base_url: 'https://canvas.yale.edu' },
    { id: '7', name: 'Columbia University (CourseWorks)', lms: 'canvas', base_url: 'https://courseworks.columbia.edu' },
    { id: '8', name: 'Princeton University', lms: 'canvas', base_url: 'https://princeton.instructure.com' },
    { id: '9', name: 'University of Pennsylvania', lms: 'canvas', base_url: 'https://canvas.upenn.edu' },
    { id: '10', name: 'University of Michigan', lms: 'canvas', base_url: 'https://canvas.umich.edu' },
    { id: '11', name: 'Penn State', lms: 'canvas', base_url: 'https://psu.instructure.com' },
    { id: '12', name: 'University of Florida', lms: 'canvas', base_url: 'https://ufl.instructure.com' },
    { id: '13', name: 'University of Utah', lms: 'canvas', base_url: 'https://utah.instructure.com' }
  ];

  useLayoutEffect(() => {
    // Check if user is authenticated
    if (!authLoading && !user) {
      router.push('/signup');
      return;
    }
    
    // Check if user already has a school selected
    if (user) {
      checkExistingSchoolSelection();
    }
  }, [user, authLoading, router]);

  const checkExistingSchoolSelection = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (response.ok) {
        const data = await response.json();
        if (data.profile && data.profile.school_id) {
          // User already has a school selected, redirect to dashboard
         
          router.push('/dashboard');
          return;
        }
        else{
          setCheckingProfile(false);
        }
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
      // Continue with school selection if there's an error
    } finally {

    }
  };

  
  

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  const handleInputFocus = () => {
    // Don't show suggestions if a school is already selected
    if (selectedSchool) {
      return;
    }
    
    if (searchQuery.length === 0) {
      // Show all schools when input is focused but empty
      setFilteredSchools(schools.slice(0, 8));
      setShowSuggestions(true);
    } else if (searchQuery.length >= 1) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    // Don't show suggestions if a school is already selected
    if (selectedSchool) {
      setShowSuggestions(false);
      return;
    }
    
    if (searchQuery.length >= 1) {
      const filtered = schools.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSchools(filtered.slice(0, 8)); // Show up to 8 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedSchool]);

  const handleSchoolSelect = (school: School) => {
    console.log('School selected:', school);
    setSelectedSchool(school);
    setSearchQuery(school.name);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // If user starts typing after selecting a school, clear the selection
    if (selectedSchool && value !== selectedSchool.name) {
      setSelectedSchool(null);
    }
  };


  const handleContinue = async () => {
    if (!selectedSchool) return;

    setLoading(true);
    try {
      const response = await fetch('/api/user/select-school', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          schoolName: selectedSchool.name,
          lms: selectedSchool.lms,
          baseUrl: selectedSchool.base_url
        }),
      });

      if (response.ok) {
        toast.success('School selection saved!');
        router.push("/dashboard");
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to save school selection');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while checking auth or profile
  if (authLoading || checkingProfile) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAuth={true} redirectTo="/signup">
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
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
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
                  key={school.id}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input from losing focus
                    handleSchoolSelect(school);
            
                  }}
                  style={{
                    fontSize: "14px",
                  }}
                  className="w-full px-6 py-5 text-left text-base font-normal text-gray-900 hover:bg-gray-50 first:rounded-t-2xl last:rounded-b-2xl transition-colors"
                >
                  {school.name}
                </button>
              ))}
            </div>
          )}
        </div>




        {/* Continue Button */}
        <Button
          variant="primary"
          size="lg"
          className={`w-full mb-4 ${
              selectedSchool
              ? "bg-black text-white hover:bg-gray-800"
              : "inline-flex items-center select-none relative justify-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 box-border bg-control-primary text-text-primary hover:bg-control-secondary px-1.5 py-2 text-sm rounded-4 font-medium gap-3 h-14 rounded-6 hover:scale-[1.02] ease-in transition-transform"
            }`}
          onClick={handleContinue}
          disabled={!selectedSchool || loading}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>

        {/* Join Text */}
        <p className="text-sm text-text-primary mt-9 mb-8 text-center">
          Join 100k+ students and start tracking your progress today!
        </p>

        {/* User Info */}
        <div className="flex flex-col items-center justify-center py-8 text-text-primary w-120 text-center text-sm">
          <p>
            Continuing as{" "}
            <span className="font-medium text-black">
              {user?.name || user?.email}
            </span>
          </p>
          <p>
            <button
              onClick={signOut}
              className="text-blue-600 underline hover:text-blue-700"
            >
              Logout
            </button>
          </p>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}