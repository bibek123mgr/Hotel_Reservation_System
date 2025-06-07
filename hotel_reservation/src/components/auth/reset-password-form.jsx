import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, ArrowLeft, CheckCircle2 } from "lucide-react";
import React from "react";
import { Lock } from "lucide-react";


const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),  // Adjusted validation for min length
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});


export default function ResetPasswordForm({ onSuccess, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onSuccess("Your password has been reset successfully!");
        }, 1500);
      }, 1500);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isComplete) {
    return (
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="mb-4 bg-green-50 w-14 h-14 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-lg font-medium text-gray-800">Password Reset</h2>
        <p className="text-xs text-gray-500 mt-1 text-center">
          Your password has been reset successfully.
          <br />You will be redirected to the login page.
        </p>
        <div className="mt-4 w-full">
          <div className="h-1 bg-gray-100 rounded-full w-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-5">
        <h2 className="text-lg font-medium text-gray-800">Reset Password</h2>
        <p className="text-xs text-gray-500 mt-1">Create a new secure password</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            {...form.register("password")}
            id="new-password"
            type="password"
            placeholder="Password"
            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

          <input
            {...form.register("confirmPassword")}
            id="confirm-new-password"
            type="password"
            placeholder="Confirm Password"
            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="pt-1 text-xs text-gray-500">
          <p className="flex items-start">
            <span className="text-blue-500 font-bold mr-1">•</span>
            <span>Password must be at least 8 characters</span>
          </p>
          <p className="flex items-start mt-1">
            <span className="text-blue-500 font-bold mr-1">•</span>
            <span>Include numbers and special characters for better security</span>
          </p>
        </div>

        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md text-xs mt-3 rounded"
          disabled={isLoading}
        >
          {isLoading && <Loader className="mr-1.5 h-3 w-3 animate-spin" />}
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </button>

        <div className="mt-3">
          <button
            type="button"
            className="flex items-center text-xs text-gray-600 hover:text-blue-500 w-full justify-center"
            onClick={onBack}
          >
            <ArrowLeft className="h-3 w-3 mr-1" />
            Back
          </button>
        </div>
      </form>

      {/* Hotel security badge */}
      <div className="flex items-center justify-center mt-5">
        <div className="px-3 py-1 rounded-full bg-gray-50 shadow-sm border border-gray-100 text-[10px] text-gray-500 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span>Secure Password Reset</span>
        </div>
      </div>
    </>
  );
}
