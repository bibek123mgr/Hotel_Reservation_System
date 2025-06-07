import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../app/features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";

// Zod schema for form validation
const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(1, { message: "Password is required" }),
    rememberMe: z.boolean(),
});

const LoginForm = ({ onSuccess, onForgotPassword }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const resultAction = await dispatch(loginUser(data));
            if (loginUser.fulfilled.match(resultAction)) {
                const result = unwrapResult(resultAction);
                onSuccess(result.message)
                setTimeout(() => navigate('/'), 2000)
            } else {
                console.error('Login failed:', resultAction.payload?.message || 'Unknown error');
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <div className="w-full max-w-md mx-auto p-3 bg-white">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div className="relative mt-4">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                        <input
                            {...form.register("email")}
                            id="login-email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            disabled={isLoading}
                        />

                        {form.formState.errors.email && (
                            <p className="text-xs mt-1 text-red-500 ml-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>


                    <div className="relative mt-4">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            {...form.register("password")}
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                            disabled={isLoading}
                        />
                        {form.formState.errors.password && (
                            <p className="text-xs mt-1 text-red-500">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <input
                                {...form.register("rememberMe")}
                                type="checkbox"
                                id="remember-me"
                                className="h-4 w-4 text-blue-500 rounded-sm"
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="remember-me"
                                className="text-sm text-gray-700"
                            >
                                Remember me
                            </label>
                        </div>

                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-sm text-blue-500 hover:text-blue-400 transition-colors cursor-pointer">
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md text-xs mt-3 rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="mr-2 animate-spin">⏳</span>
                        ) : null}
                        {isLoading ? "Checking in..." : "Access My Reservations"}
                    </button>

                    <div className="flex items-center justify-center my-4">
                        <div className="w-full border-t border-gray-200"></div>
                        <span className="absolute px-2 text-xs text-gray-400">or</span>
                    </div>

                    <p className="text-xs text-center text-gray-500">
                        Secure access to bookings and special offers
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginForm;
