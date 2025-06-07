import React, { useState } from "react";
import { Edit, Eye, Trash2, MoreVertical, User } from "lucide-react";

// Static data for demonstration
const staticGuests = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 555-123-4567",
        address: "123 Main St, Anytown, USA"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+1 555-987-6543",
        address: "456 Oak Ave, Somewhere, USA"
    },
    {
        id: 3,
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert.j@example.com",
        phone: "+1 555-456-7890",
        address: "789 Pine Rd, Nowhere, USA"
    }
];

const staticReservations = [
    { id: 1, guestId: 1, room: { type: "standard", roomNumber: "101" }, checkInDate: "2023-06-15", status: "confirmed" },
    { id: 2, guestId: 1, room: { type: "deluxe", roomNumber: "201" }, checkInDate: "2023-07-20", status: "checked_out" },
    { id: 3, guestId: 2, room: { type: "suite", roomNumber: "301" }, checkInDate: "2023-08-01", status: "pending" }
];

const GuestList = ({ guests = staticGuests, isLoading = false }) => {
    const [page, setPage] = useState(1);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    const ITEMS_PER_PAGE = 10;

    const handleDeleteGuest = (id) => {
        if (confirm("Are you sure you want to delete this guest?")) {
            // In a real app, you would call your API here
            console.log("Guest deleted:", id);
            alert("Guest deleted successfully!");
        }
    };

    const handleViewGuest = (guest) => {
        setSelectedGuest(guest);
        setViewDialogOpen(true);
    };

    const totalPages = Math.ceil(guests.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedGuests = guests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const guestReservations = selectedGuest
        ? staticReservations.filter(reservation => reservation.guestId === selectedGuest.id)
        : [];

    if (isLoading) {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="ml-4">
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex justify-end space-x-2">
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (guests.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No guests found</p>
            </div>
        );
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedGuests.map((guest) => (
                            <tr key={guest.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={`https://ui-avatars.com/api/?name=${guest.firstName}+${guest.lastName}&background=random`}
                                                alt={`${guest.firstName} ${guest.lastName}`}
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {guest.firstName} {guest.lastName}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{guest.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{guest.phone || "—"}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">
                                        {guest.address || "—"}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="relative inline-block text-left">
                                        <button
                                            className="p-2 rounded-md hover:bg-gray-100"
                                            onClick={() => {
                                                // Simple dropdown toggle
                                                const dropdown = document.getElementById(`dropdown-${guest.id}`);
                                                dropdown.classList.toggle('hidden');
                                            }}
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        <div
                                            id={`dropdown-${guest.id}`}
                                            className="hidden absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                                                    Actions
                                                </div>
                                                <button
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => handleViewGuest(guest)}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View Details</span>
                                                </button>
                                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Edit Guest</span>
                                                </button>
                                                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>New Reservation</span>
                                                </button>
                                                <div className="border-t"></div>
                                                <button
                                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                                    onClick={() => handleDeleteGuest(guest.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    <span>Delete Guest</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between my-4">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <button
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                        <button
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                <span className="font-medium">
                                    {Math.min(startIndex + ITEMS_PER_PAGE, guests.length)}
                                </span>{" "}
                                of <span className="font-medium">{guests.length}</span> guests
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                                    disabled={page <= 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === index + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                                        onClick={() => setPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${page >= totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                                    disabled={page >= totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* View Guest Details Modal */}
            {selectedGuest && (
                <div className={`fixed inset-0 overflow-y-auto ${viewDialogOpen ? 'block' : 'hidden'}`}>
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setViewDialogOpen(false)}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Guest Details
                                        </h3>
                                        <div className="mt-4">
                                            <div className="flex items-center mb-6">
                                                <div className="h-16 w-16 rounded-full overflow-hidden">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${selectedGuest.firstName}+${selectedGuest.lastName}&size=64&background=random`}
                                                        alt={`${selectedGuest.firstName} ${selectedGuest.lastName}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {selectedGuest.firstName} {selectedGuest.lastName}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Guest #{selectedGuest.id}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                                        <p className="text-sm text-gray-900">{selectedGuest.email}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                                                        <p className="text-sm text-gray-900">{selectedGuest.phone || "—"}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-500">Address</h4>
                                                    <p className="text-sm text-gray-900">{selectedGuest.address || "—"}</p>
                                                </div>

                                                <div className="pt-4 border-t border-gray-200">
                                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Reservations</h4>

                                                    {guestReservations.length > 0 ? (
                                                        <div className="overflow-x-auto">
                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                <thead className="bg-gray-50">
                                                                    <tr>
                                                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Room
                                                                        </th>
                                                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Check In
                                                                        </th>
                                                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Status
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200">
                                                                    {guestReservations.map((reservation) => (
                                                                        <tr key={reservation.id}>
                                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                                                                                {reservation.room.type} - {reservation.room.roomNumber}
                                                                            </td>
                                                                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                                                                                {new Date(reservation.checkInDate).toLocaleDateString()}
                                                                            </td>
                                                                            <td className="px-3 py-2 whitespace-nowrap text-xs">
                                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                          ${reservation.status === "confirmed" ? "bg-green-100 text-green-800" :
                                                                                        reservation.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                                                            "bg-gray-100 text-gray-800"}`}
                                                                                >
                                                                                    {reservation.status.replace("_", " ")}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-500">No reservations found for this guest.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Edit Guest
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setViewDialogOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestList;