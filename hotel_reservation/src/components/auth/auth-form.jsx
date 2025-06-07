import { useState } from "react";
import LoginForm from "./login-fom";
import SignupForm from "./signup-form";
import ForgotPasswordForm from "./forget-password-form";
import OTPVerificationForm from "./otp-verification-form";
import ResetPasswordForm from "./reset-password-form";
import FormSuccess from "./form-success";
import { useEffect } from "react";


export default function AuthForm() {
    const [activeForm, setActiveForm] = useState('login');
    const [successMessage, setSuccessMessage] = useState(null);
    const [userEmail, setUserEmail] = useState('');

    const toggleForm = () => {
        setActiveForm(activeForm === 'login' ? 'signup' : 'login');
        setSuccessMessage(null);
    };

    const toggleEmail = (email) => {
        setUserEmail(email);
    }

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setActiveForm(prevForm => {
            if (prevForm === 'forgot-password') {
                const emailMatch = message.match(/sent to ([^\s]+@[^\s]+\.[^\s]+)/);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 4000);
                return 'otp-verification';
            }
            else if (prevForm === 'otp-verification') {
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 4000);
                return 'reset-password';
            }
            else if (prevForm === 'reset-password') {
                setTimeout(() => {
                    setSuccessMessage(null);
                    setActiveForm('login');
                }, 4000);
                return prevForm;
            }
            return prevForm;
        });
    };
    const goToForgotPassword = () => {
        setActiveForm('forgot-password');
        setSuccessMessage(null);
    };


    const goBack = () => {
        if (activeForm === 'forgot-password') {
            setActiveForm('login');
        } else if (activeForm === 'otp-verification') {
            setActiveForm('forgot-password');
        } else if (activeForm === 'reset-password') {
            setActiveForm('otp-verification');
        } else {
            setActiveForm('login');
        }
        setSuccessMessage(null);
    };

    const getFormHeader = () => {
        switch (activeForm) {
            case 'login': return "Welcome Back";
            case 'signup': return "Join Our Rewards Club";
            case 'forgot-password': return "Forgot Password";
            case 'otp-verification': return "Verify Code";
            case 'reset-password': return "Reset Password";
            default: return "Welcome";
        }
    };

    const getFormDescription = () => {
        switch (activeForm) {
            case 'login': return "Access your reservations and exclusive member benefits";
            case 'signup': return "Create an account for personalized travel experiences";
            case 'forgot-password': return "We'll help you recover your account";
            case 'otp-verification': return "Enter the verification code we sent";
            case 'reset-password': return "Create a new secure password";
            default: return "";
        }
    };

    const getFormIndicator = () => {
        switch (activeForm) {
            case 'login': return "Member Portal";
            case 'signup': return "New Registration";
            case 'forgot-password': return "Password Recovery";
            case 'otp-verification': return "Verification Step";
            case 'reset-password': return "Security Zone";
            default: return "";
        }
    };

    return (
        <>
            <h2 className="text-center text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-500/80 bg-clip-text text-transparent mb-0.5">
                {getFormHeader()}
            </h2>

            <div className="flex items-center justify-center mb-2">
                <div className="h-[1px] w-6 bg-blue-500/10 rounded-full"></div>
                <div className="mx-1.5">
                    <div className="inline-block w-1 h-1 rounded-full bg-blue-500/30"></div>
                </div>
                <div className="h-[1px] w-6 bg-blue-500/10 rounded-full"></div>
            </div>

            <p className="mb-2 text-center text-[10px] text-gray-600 max-w-[220px] mx-auto">
                {getFormDescription()}
            </p>

            <div className="flex justify-center mb-2">
                <div className="text-[9px] space-x-1 bg-blue-50/70 px-1.5 py-0.5 rounded-full flex items-center">
                    <span className="inline-block w-1 h-1 rounded-full bg-blue-500/60"></span>
                    <span className="text-gray-500 uppercase tracking-wider">{getFormIndicator()}</span>
                </div>
            </div>

            {(activeForm === 'login' || activeForm === 'signup') && (
                <p className="mb-3 text-center text-[10px] text-gray-600">
                    {activeForm === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="font-medium text-blue-500 hover:text-blue-500/90 transition-colors underline-offset-1 underline"
                        onClick={toggleForm}
                    >
                        {activeForm === 'login' ? "Sign up now" : "Sign in here"}
                    </button>
                </p>
            )}

            <div className="form-container animate-in fade-in duration-300">
                {successMessage ? (
                    <FormSuccess message={successMessage} />
                ) : activeForm === 'login' ? (
                    <LoginForm onSuccess={handleSuccess} onForgotPassword={goToForgotPassword} />
                ) : activeForm === 'signup' ? (
                    <SignupForm onSuccess={handleSuccess} onBack={goBack} />
                ) : activeForm === 'forgot-password' ? (
                    <ForgotPasswordForm onSuccess={handleSuccess} onBack={goBack} setEmail={toggleEmail} />
                ) : activeForm === 'otp-verification' ? (
                    <OTPVerificationForm onSuccess={handleSuccess} onBack={goBack} email={userEmail} />
                ) : (
                    <ResetPasswordForm onSuccess={handleSuccess} onBack={goBack} />
                )}
            </div>

            <div className="flex flex-col items-center justify-center mt-3 space-y-1.5">
                <div className="text-[8px] text-gray-400 tracking-wider">
                    <span className="text-blue-500">★</span> PREMIUM GUEST EXPERIENCE <span className="text-blue-500">★</span>
                </div>

                <div className="flex items-center justify-center space-x-1.5">
                    <div className="flex items-center bg-green-50 px-1.5 py-0.5 rounded-sm border border-green-100">
                        <span className="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
                        <span className="text-[8px] text-green-800">Available</span>
                    </div>
                    <div className="h-3 w-px bg-gray-100"></div>
                    <div className="flex items-center">
                        <span className="text-[8px] text-gray-400">REF: SKY-{new Date().getFullYear().toString().slice(2)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
