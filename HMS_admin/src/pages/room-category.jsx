import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, EllipsisVertical } from "lucide-react";
import { useDispatch } from "react-redux";
import CategoryPostForm from "../components/category/categorypost-form";
import { deleteCategory, getAllCategories } from "../app/features/category/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const Categories = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            await dispatch(getAllCategories());
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    };
    const { categories: categoryList, loading, error } = useSelector((store) => store.category)

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

    const toggleMenu = (categoryId) => {
        setOpenMenuId(openMenuId === categoryId ? null : categoryId);
    };

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setCurrentCategory(null);
        setIsModalOpen(true);
    };
    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;

        try {
            await dispatch(deleteCategory(categoryId)).unwrap();
            alert("Category deleted successfully");
            fetchCategories();
        } catch (error) {
            alert("Failed to delete category: " + (error.message || error));
        }
    };

    const filteredCategories = categoryList.filter(c => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            c.categoryName?.toLowerCase().includes(lowerSearch) ||
            c.description?.toLowerCase().includes(lowerSearch)
        );
    });

    useEffect(() => {
        fetchCategories();
    }, [dispatch]);

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Room Categories</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage all room categories and their descriptions</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={handleAddNew}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </button>
                </div>
            </div>

            {
                isModalOpen && (
                    <CategoryPostForm
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setCurrentCategory(null);
                        }}
                        category={currentCategory}
                        onSuccess={fetchCategories}
                    />
                )
            }

            <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <h2 className="text-lg font-semibold text-gray-900">Category Management</h2>
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                className="pl-8 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {
                isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCategories.map(category => (
                            <div key={category.id} className="bg-white shadow rounded-lg overflow-hidden relative">
                                <div className="p-4 border-b border-gray-200 flex justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">{category.roomCategoryType}</h3>
                                    <button
                                        onClick={() => toggleMenu(category.id)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <EllipsisVertical size={16} />
                                    </button>

                                    {openMenuId === category.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-6 top-10 z-20 w-56 rounded-lg bg-white shadow-xl border border-gray-200"
                                        >
                                            <div className="py-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 transition-colors"
                                                >
                                                    ✏️ <span>Edit Category</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors"
                                                >
                                                    🗑️ <span>Delete Category</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Description</p>
                                        <p className="text-sm text-gray-900">{category.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

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
                </div>
            </div>
        ))}
    </div>
);

export default Categories;