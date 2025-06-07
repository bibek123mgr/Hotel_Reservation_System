import { useState } from "react";
import AdminLoginForm from "./admin-login-form";
import LoginForm from "./login-form";
import FormSuccess from "./form-success";

export default function AuthForm() {
    const [activeForm, setActiveForm] = useState('hotel-admin');
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSuccess = (message) => {
        setSuccessMessage(message);
    };

    const goToForgotPassword = () => {
        setActiveForm('forgot-password');
        setSuccessMessage(null);
    };

    const toggleAdminType = () => {
        setActiveForm(activeForm === 'hotel-admin' ? 'system-admin' : 'hotel-admin');
        setSuccessMessage(null);
    };

    const getFormHeader = () => {
        switch (activeForm) {
            case 'hotel-admin': return "Hotel Admin Portal";
            case 'system-admin': return "System Admin Portal";
            default: return "Welcome";
        }
    };

    const getFormDescription = () => {
        switch (activeForm) {
            case 'hotel-admin': return "Manage your hotel's operations and reservations";
            case 'system-admin': return "System configuration and global management";
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
                Manage your warehouse's operations and reservations
            </p>

            <div className="flex justify-center mb-2">
                <button
                    onClick={toggleAdminType}
                    className="text-[9px] space-x-1 bg-blue-50/70 px-1.5 py-0.5 rounded-full flex items-center hover:bg-blue-100 transition-colors"
                >
                    <span className="inline-block w-1 h-1 rounded-full bg-blue-500/60"></span>
                    <span className="text-gray-500 uppercase tracking-wider">
                        Switch to {activeForm === 'hotel-admin' ? 'System Admin' : 'Hotel Admin'}
                    </span>
                </button>
            </div>

            <div className="form-container animate-in fade-in duration-300">
                {successMessage ? (
                    <FormSuccess message={successMessage} />
                ) : (
                    <>
                        {activeForm === 'hotel-admin' && (
                            <LoginForm
                                onSuccess={handleSuccess}
                                onForgotPassword={goToForgotPassword}
                            />
                        )}
                        {activeForm === 'system-admin' && (
                            <AdminLoginForm
                                onSuccess={handleSuccess}
                                onForgotPassword={goToForgotPassword}
                            />
                        )}
                    </>
                )}
            </div>

            <div className="flex flex-col items-center justify-center mt-3 space-y-1.5">
                <div className="text-[8px] text-gray-400 tracking-wider">
                    <span className="text-blue-500">★</span> HOTEL MANAGEMENT SYSTEM <span className="text-blue-500">★</span>
                </div>
            </div>
        </>
    );
}
