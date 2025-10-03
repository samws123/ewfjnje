import React, { Suspense } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import EmailVerificationContent from "./EmailVerificationContent";

export default function EmailVerification() {
  return (
    <ProtectedRoute requireAuth={false} redirectTo="/user-purpose">
      <Suspense fallback={
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }>
        <EmailVerificationContent />
      </Suspense>
    </ProtectedRoute>
  );
}
