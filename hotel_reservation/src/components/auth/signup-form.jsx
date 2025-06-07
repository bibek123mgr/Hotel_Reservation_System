import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, UserCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../app/features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// Zod schema for form validation
const signupSchema = z.object({
    firstName: z.string().min(1, { message: "first name is required" }),
    lastName: z.string().min(1, { message: "last name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    terms: z.boolean().refine(val => val === true, { message: "You must agree to the terms" }),
});


export default function SignupForm({ onSuccess, onBack }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            email: "",
            password: "",
            lastName: "",
            terms: false,
        },
    });

    const onSubmit = async (data) => {
        console.log("i am running");

        try {
            setIsLoading(true);
            const resultAction = await dispatch(signupUser(data));
            if (signupUser.fulfilled.match(resultAction)) {
                const result = unwrapResult(resultAction)
                onSuccess(result.message)
                setTimeout(() => {
                    onBack()
                }, 3000)
            } else {
                console.error('Sign Up failed:', resultAction.payload?.message || 'Unknown error');

            }
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-3 bg-white">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                {/* Full Name */}
                <div className="flex space-x-4 mt-4">
                    {/* First Name */}
                    <div className="w-1/2 relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                        <input
                            {...form.register("firstName")}
                            id="signup-first-name"
                            type="text"
                            placeholder="First name"
                            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            disabled={isLoading}
                            aria-invalid={!!form.formState.errors.firstName}
                            aria-describedby="firstName-error"
                        />
                        {form.formState.errors.firstName && (
                            <p id="firstName-error" className="text-xs mt-1 text-red-500 ml-1">
                                {form.formState.errors.firstName.message}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="w-1/2 relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                        <input
                            {...form.register("lastName")}
                            id="signup-last-name"
                            type="text"
                            placeholder="Last name"
                            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            disabled={isLoading}
                            aria-invalid={!!form.formState.errors.lastName}
                            aria-describedby="lastName-error"
                        />
                        {form.formState.errors.lastName && (
                            <p id="lastName-error" className="text-xs mt-1 text-red-500 ml-1">
                                {form.formState.errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="relative mt-4">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        {...form.register("email")}
                        id="signup-email"
                        type="email"
                        placeholder="Email address"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        disabled={isLoading}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs mt-1 text-red-500">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="relative mt-4">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        {...form.register("password")}
                        id="signup-password"
                        type="Password"
                        placeholder="password"
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        disabled={isLoading}
                    />
                    {form.formState.errors.password && (
                        <p className="text-xs mt-1 text-red-500">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2 mt-4">
                    <input
                        {...form.register("terms")}
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 text-blue-500 rounded-sm"
                        disabled={isLoading}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the terms and privacy policy
                    </label>
                    {form.formState.errors.terms && (
                        <p className="text-xs text-red-500">
                            {form.formState.errors.terms.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md text-xs mt-3 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="mr-2 animate-spin">⏳</span>
                    ) : null}
                    {isLoading ? "Creating your account..." : "Sign Up"}
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center my-4">
                    <div className="w-full border-t border-gray-200"></div>
                    <span className="absolute px-2 text-xs text-gray-400">or</span>
                </div>

                {/* Information */}
                <p className="text-xs text-center text-gray-500">
                    Join to receive room upgrades and exclusive offers
                </p>
            </form>
        </div>
    );
}
