import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Edit, Plus, Trash2, Search, Info, CreditCard, Hotel } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import PaymentPostForm from "../components/payment/paymentcreate-form";
import { deletePayment, getAllPayments } from "../app/features/payment/paymentSlice";

const Payments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showNewPaymentDialog, setShowNewPaymentDialog] = useState(false);
    const [paymentToEdit, setPaymentToEdit] = useState(null);

    const dispatch = useDispatch();
    const { payments = [], loading, error } = useSelector((store) => store.payment);

    useEffect(() => {
        dispatch(getAllPayments());
    }, [dispatch]);

    const filteredPayments = payments.filter((payment) => {
        const searchLower = searchTerm.toLowerCase();
        const hotelName = payment.hotelName?.toLowerCase() || "";
        const paymentMethod = payment.paymentMethod?.toLowerCase() || "";
        const amount = payment.amount?.toString() || "";
        const status = payment.paymentStatus?.toLowerCase() || "";
        const transactionId = payment.transactionId?.toLowerCase() || "";
        const createdBy = payment.createdBy?.toLowerCase() || "";

        return (
            hotelName.includes(searchLower) ||
            paymentMethod.includes(searchLower) ||
            amount.includes(searchLower) ||
            status.includes(searchLower) ||
            transactionId.includes(searchLower) ||
            createdBy.includes(searchLower)
        );
    });

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
            case "pending":
                return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
            case "failed":
                return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
            case "refunded":
                return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
            default:
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
        }
    };

    const formatDate = (date) => {
        try {
            return format(new Date(date), "MMM dd, yyyy hh:mm a");
        } catch (error) {
            return "Invalid date";
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount || 0);
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm("Are you sure you want to delete this payment?")) {
            await dispatch(deletePayment(paymentId));
        }
    };

    const handleEdit = (payment) => {
        setPaymentToEdit(payment);
        setShowNewPaymentDialog(true);
    };

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all payment transactions</p>
                </div>
                <button
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                        setPaymentToEdit(null);
                        setShowNewPaymentDialog(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Payment
                </button>
            </div>

            {showNewPaymentDialog && (
                <PaymentPostForm
                    open={showNewPaymentDialog}
                    onClose={() => {
                        setShowNewPaymentDialog(false);
                        setPaymentToEdit(null);
                    }}
                    fetchPayments={() => dispatch(getAllPayments())}
                    paymentToEdit={paymentToEdit}
                />
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">All Payments</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                className="pl-8 w-[300px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {filteredPayments.length} total payments
                    </p>
                </div>

                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr><td colSpan="8" className="p-6 text-center text-gray-500">Loading payments...</td></tr>
                                ) : filteredPayments.length === 0 ? (
                                    <tr><td colSpan="8" className="p-6 text-center text-gray-500">No payments found</td></tr>
                                ) : (
                                    filteredPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <Hotel className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {payment.hotelName || "N/A"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 capitalize">
                                                    {payment.paymentMethod?.toLowerCase() || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatCurrency(payment.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-mono">
                                                    {payment.transactionId || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={getStatusBadgeClass(payment.paymentStatus)}>
                                                    {payment.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {payment.createdBy || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(payment.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(payment)}
                                                        className="p-2 rounded-md hover:bg-gray-100"
                                                    >
                                                        <Edit className="h-4 w-4 text-blue-600" />
                                                    </button>
                                                    <Link to={`/payments/${payment.id}`}>
                                                        <button className="p-2 rounded-md hover:bg-gray-100">
                                                            <Info className="h-4 w-4 text-gray-600" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(payment.id)}
                                                        className="p-2 rounded-md hover:bg-gray-100"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
                    Showing {filteredPayments.length} payment(s)
                </div>
            </div>
        </div>
    );
};

export default Payments;