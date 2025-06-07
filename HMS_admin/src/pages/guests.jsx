import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit, Eye } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllHotel, getAllUsers } from "../app/features/auth/authSlice";
import { useSelector } from "react-redux";


const Guests = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);



    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getAllUsers())
    }, [])

    const { users, error, loading } = useSelector((store) => store.auth)


    const filteredGuests = users.filter(guest => {
        const searchLower = searchTerm.toLowerCase();
        return (
            guest.name.toLowerCase().includes(searchLower) ||
            guest.email.toLowerCase().includes(searchLower));
    });

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Guests</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage guest information and profiles
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Guest
                    </button>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">All Guests</h2>
                        <div className="mt-3 sm:mt-0 relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search guests..."
                                className="pl-8 w-full sm:w-[300px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {filteredGuests.length} total guests
                    </p>
                </div>
                <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                        </div>
                                        <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredGuests.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No guests found</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Guest
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredGuests.map((guest) => (
                                        <tr key={guest.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img
                                                            className="h-10 w-10 rounded-full"
                                                            src={`https://ui-avatars.com/api/?name=${guest.name}&background=random`}
                                                            alt={`${guest.name}`}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {guest.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Guest #{guest.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{guest.email}</div>
                                                {/* <div className="text-sm text-gray-500">{guest.phone}</div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Link href={`/guests/${guest.id}`}>
                                                        <button className="p-2 rounded-md hover:bg-gray-100">
                                                            <Edit className="h-4 w-4 text-blue-600" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/guests/${guest.id}`}>
                                                        <button className="p-2 rounded-md hover:bg-gray-100">
                                                            <Eye className="h-4 w-4 text-gray-600" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {filteredGuests.length} of {filteredGuests.length} guests
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guests;