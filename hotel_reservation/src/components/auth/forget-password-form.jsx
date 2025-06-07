import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, ArrowLeft, Send } from "lucide-react";
import { Mail } from "lucide-react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../app/features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordForm({ onSuccess, onBack, setEmail }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const resultAction = await dispatch(forgotPassword(data))
            if (forgotPassword.fulfilled.match(resultAction)) {
                const result = unwrapResult(resultAction)
                setEmail(data.email);

                onSuccess(`Verification code sent to  ${data.email}`)
            } else {
                console.error('Login failed:', resultAction.payload?.message || 'Unknown error');
            }
        } catch (error) {
            console.error("Password reset request failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="text-center mb-5">
                <h2 className="text-lg font-medium text-gray-800">Password Recovery</h2>
                <p className="text-xs text-gray-500 mt-1">
                    Enter your email to get a recovery code
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative mt-4">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                        id="recovery-email"
                        type="email"
                        placeholder="Email Address"
                        disabled={isLoading}
                        className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-[10px] text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="pt-1 text-xs text-gray-500">
                    <p>We'll send you a verification code to reset your password</p>
                </div>

                <button
                    type="submit"
                    className="w-full h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md text-xs mt-3 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-1.5 h-3 w-3 animate-spin" />
                            Sending Recovery Code...
                        </>
                    ) : (
                        <>
                            <Send className="mr-1.5 h-3 w-3" />
                            Send Recovery Code
                        </>
                    )}
                </button>

                <div className="mt-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center text-xs text-gray-600 hover:text-blue-600 w-full justify-center"
                    >
                        <ArrowLeft className="h-3 w-3 mr-1" />
                        Back to Login
                    </button>
                </div>
            </form>

            <div className="flex items-center justify-center mt-5">
                <div className="px-3 py-1 rounded-full bg-gray-50 shadow-sm border border-gray-100 text-[10px] text-gray-500 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Secure Recovery Process</span>
                </div>
            </div>
        </>
    );
}
