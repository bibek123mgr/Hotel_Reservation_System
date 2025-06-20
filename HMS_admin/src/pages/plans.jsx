import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, EllipsisVertical, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
// import { deleteSubscriptionPlan, getAllSubscriptionPlans, updateSubscriptionPlanStatus } from "../app/features/subscription/subscriptionSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import SubscriptionPlanPostForm from "../components/plans/subscriptionpost-form";
import { deleteSubscriptionPlan, getAllSubscriptionPlans } from "../app/features/plans/planSlice";


const Subscriptions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [planList, setPlanList] = useState([]);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            const resultAction = await dispatch(getAllSubscriptionPlans());
            if (getAllSubscriptionPlans.fulfilled.match(resultAction)) {
                const result = unwrapResult(resultAction);
                setPlanList(result);
            }
        } catch (error) {
            console.error("Failed to fetch subscription plans:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = (planId) => {
        setOpenMenuId(openMenuId === planId ? null : planId);
    };

    const handleStatusUpdate = async (planId, newStatus) => {
        try {
            // await dispatch(updateSubscriptionPlanStatus({ planId, status: newStatus })).unwrap();
            alert("Plan status updated successfully");
            fetchPlans();
        } catch (error) {
            alert("Failed to update plan status: " + (error.message || error));
        }
    };

    const handleEdit = (plan) => {
        setCurrentPlan(plan);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentPlan(null);
        setIsModalOpen(true);
    };
    const handleDelete = async (planId) => {
        try {
            await dispatch(deleteSubscriptionPlan(planId)).unwrap();
            alert("Plan deleted successfully");
            fetchPlans();
        } catch (error) {
            alert("Failed to delete plan: " + (error.message || error));
        }
    };

    const filteredPlans = planList.filter(plan => {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
            plan.name?.toLowerCase().includes(lowerSearch) ||
            plan.description?.toLowerCase().includes(lowerSearch);
        return matchesSearch;
    });

    useEffect(() => {
        fetchPlans();
    }, [dispatch]);

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Subscription Plans</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all subscription plans and their status</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={handleAddNew}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Plan
                    </button>
                </div>
            </div>

            {isModalOpen &&
                <SubscriptionPlanPostForm
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCurrentPlan(null);
                    }}
                    plan={currentPlan}
                    onSuccess={fetchPlans}
                />}

            <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <h2 className="text-lg font-semibold text-gray-900">Plan Management</h2>
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search plans..."
                                className="pl-8 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {isLoading ? (
                <LoadingSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredPlans.map(plan => (
                        <div key={plan.id} className="bg-white shadow rounded-lg overflow-hidden relative">
                            <div className="p-4 border-b border-gray-200 flex justify-between">
                                <div className="flex items-center gap-2">
                                    <CreditCard size={16} />
                                    <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                                </div>
                                <button
                                    onClick={() => toggleMenu(plan.id)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <EllipsisVertical size={16} />
                                </button>

                                {openMenuId === plan.id && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-6 top-10 z-20 w-56 rounded-lg bg-white shadow-xl border border-gray-200"
                                    >

                                        <div className="border-t border-gray-200" />
                                        <div className="py-2">
                                            <button
                                                onClick={() => handleEdit(plan)}
                                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                                            >
                                                ✏️ <span>Edit Plan</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(plan.id)}
                                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors"
                                            >
                                                🗑️ <span>Delete Plan</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 space-y-4">
                                <InfoRow label="Monthly Price" value={`Rs.${plan.monthlyPrice}`} />
                                <InfoRow label="Yearly Price" value={`Rs.${plan.yearlyPrice}`} />
                                <div>
                                    <p className="text-sm text-gray-500">Features</p>
                                    <p className="text-sm text-gray-900">{plan.features}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Description</p>
                                    <p className="text-sm text-gray-900">{plan.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};



const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const InfoRow = ({ label, value }) => (
    <div className="flex items-center gap-1 text-sm text-gray-500 capitalize justify-between">
        <p>{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
);

const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
                <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    <div className="flex justify-between">
                        <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                        <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default Subscriptions;