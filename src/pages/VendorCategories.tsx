import React, { useState } from 'react';

interface VendorCategory {
  id: number;
  name: string;
  description: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [vendorCategories, setVendorCategories] = useState<VendorCategory[]>([
    { id: 62, name: 'test', description: 'test', status: 'Active' },
    { id: 61, name: 'Miscellaneous Vendors', description: '', status: 'Active' },
    { id: 60, name: 'Diesel Suppliers', description: '', status: 'Active' },
    { id: 59, name: 'Water Tanker Suppliers', description: '', status: 'Active' },
    { id: 58, name: 'IT Services', description: '', status: 'Active' },
    { id: 57, name: 'Insurance Providers', description: '', status: 'Active' },
    { id: 56, name: 'Audit & Accounting Services', description: '', status: 'Active' },
    { id: 55, name: 'Legal Services', description: '', status: 'Active' },
    { id: 54, name: 'Courier Services', description: '', status: 'Active' },
    { id: 53, name: 'Printing & Stationery', description: '', status: 'Active' },
    { id: 52, name: 'Event Management', description: '', status: 'Active' },
    { id: 51, name: 'Hardware Suppliers', description: '', status: 'Active' },
    { id: 50, name: 'Equipment & Tools Suppliers', description: '', status: 'Active' },
    { id: 49, name: 'AMC Services', description: '', status: 'Active' },
    { id: 48, name: 'Internet Services', description: '', status: 'Active' },
    { id: 47, name: 'CCTV & Security Equipment', description: '', status: 'Active' },
    { id: 46, name: 'Fire Safety Equipment', description: '', status: 'Active' },
    { id: 45, name: 'Waste Management', description: '', status: 'Active' },
    { id: 44, name: 'STP Maintenance', description: '', status: 'Active' },
    { id: 43, name: 'WTP Maintenance', description: '', status: 'Active' },
    { id: 42, name: 'Generator Maintenance', description: '', status: 'Active' },
    { id: 41, name: 'Lift Maintenance', description: '', status: 'Active' },
    { id: 40, name: 'Civil Works Contractors', description: '', status: 'Active' },
    { id: 39, name: 'Electrical Contractors', description: '', status: 'Active' },
    { id: 38, name: 'Plumbing Contractors', description: '', status: 'Active' },
    { id: 37, name: 'Gardening Services', description: '', status: 'Active' },
    { id: 36, name: 'Pest Control Services', description: '', status: 'Active' },
    { id: 35, name: 'Housekeeping Services', description: '', status: 'Active' },
    { id: 34, name: 'Security Services', description: '', status: 'Active' },
  ]);

  const [editingCategory, setEditingCategory] = useState<VendorCategory | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = (category: VendorCategory) => {
    setEditingCategory(category);
    setEditedName(category.name);
    setEditedDescription(category.description);
  };

  const handleUpdate = () => {
    if (editingCategory) {
      setVendorCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, name: editedName, description: editedDescription }
            : cat
        )
      );
      setEditingCategory(null);
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setVendorCategories(prev => prev.filter(item => item.id !== deleteId));
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Vendors Management</h1>
      <h2 className="text-xl font-semibold">Vendor Service Types</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vendorCategories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{category.name}</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {category.status}
              </span>
            </div>
            <p className="text-xs text-gray-500">ID: {category.id}</p>
            <hr className="my-1" />
            <p className="text-xs text-gray-500 mb-4">
              Description: {category.description || '-'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="text-xs border px-3 py-1 rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-xs border px-3 py-1 rounded text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h3 className="text-lg font-semibold mb-4">Edit Vendor Service</h3>

            <label className="block text-sm mb-1">
              Service Type<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border px-2 py-1 rounded mb-3 text-sm"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <label className="block text-sm mb-1">Description</label>
            <textarea
              className="w-full border px-2 py-1 rounded mb-4 text-sm"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingCategory(null)}
                className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 p-4">
            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Deletion</h3>
            <p className="text-sm text-gray-700 mb-6 text-center">
              Are you sure you want to delete ID: {deleteId}?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-xs px-3 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
