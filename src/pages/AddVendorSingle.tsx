import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserDetailsContext from "@/hooks/UserDetailsContext";

const AddVendorSingle = () => {
  const navigate = useNavigate();
  const userDetails = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    PhoneNo: "",
    EmailID: "",
    CompanyName: "",
    VendorType: "",
    Status: "Active",
    Address: "",
    Notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // 1. Add Contact
      const contactPayload = {
        BusinessID: userDetails?.userDetails?.BusinessID?.toString() || "",
        FirstName: form.FirstName,
        LastName: form.LastName,
        PhoneNo: form.PhoneNo,
        CompanyName: form.CompanyName,
        EmailID: form.EmailID,
        Notes: form.Notes,
        TeamContactID: userDetails?.userDetails?.TeamContactID?.toString() || "",
      };
      const contactRes = await axios.post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PORTNO}/ST/AddBusinessContact`,
        contactPayload
      );
      const contactId = contactRes.data.ContactID || contactRes.data.id || contactRes.data.ID;
      // 2. Add Vendor
      const vendorPayload = {
        ContactID: contactId?.toString() || "",
        Address: form.Address,
        VendorType: form.VendorType,
        Status: form.Status,
        Notes: form.Notes,
      };
      const vendorRes = await axios.post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_PORTNO}/purchases/AddVendor`,
        vendorPayload
      );
      const vendorId = vendorRes.data.VendorID || vendorRes.data.id || vendorRes.data.ID;
      setMessage("Vendor added successfully!");
      // Redirect to vendors list after adding
      navigate("/vendors");
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message || "Failed to add vendor. Please check the fields."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Add Vendor</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              type="text"
              name="FirstName"
              value={form.FirstName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              type="text"
              name="LastName"
              value={form.LastName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="text"
              name="PhoneNo"
              value={form.PhoneNo}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              name="EmailID"
              value={form.EmailID}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Business Name *</label>
          <input
            type="text"
            name="CompanyName"
            value={form.CompanyName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Type *</label>
          <input
            type="text"
            name="VendorType"
            value={form.VendorType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              name="Status"
              value={form.Status}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <input
              type="text"
              name="Address"
              value={form.Address}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="Notes"
            value={form.Notes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-sm"
            rows={3}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
          >
            {loading ? "Submitting..." : "Add Vendor"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/vendors")}
            className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
        {message && (
          <div className="text-sm text-center text-gray-700 mt-3">{message}</div>
        )}
      </form>
    </div>
  );
};

export default AddVendorSingle; 