import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import InputError from "@/Components/InputError";

export default function Create({ units, requestedBy }) {
  const { auth } = usePage().props;
  const user = auth.user;
    const roles = auth.roles || [];

  const generatePRNumber = () => {
    const year = new Date().getFullYear().toString().slice(-2); // Last 2 digits of the year
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Current month in 2 digits
    const serialNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random serial number
    return `PR-${year}-${month}-${serialNumber}`;
  };
  const [prNumber, setPrNumber] = useState(generatePRNumber());
  // Use useForm hook from inertia
  const { data, setData, post, errors, reset } = useForm({
    pr_number: prNumber,  // New field for PR Number
    purpose: "",
    division: user.division || "",
    focal_person: user.id || "",
    requested_by: requestedBy || "",
    item_name: "",
    quantity: "",
    unit: "",
    unit_price: "",
  });
  console.log(data);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
        post(route('requester.store'));
  };
  const handlePRNumberChange = (e) => {
    setPrNumber(e.target.value);
    setData('pr_number', e.target.value);
  };

  return (
    <AuthenticatedLayout
      title="Create Purchase Request"
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Procurement Management System
        </h2>
      }
    >
      <Head title="Create PR" />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Purchase Request</h1>
          <button
            type="button"
            className="inline-flex items-center px-6 py-0 max-h-10 bg-slate-600 text-10 text-white rounded-md hover:bg-slate-700 transition"
          >
            Print Document
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Department & Requester */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputLabel htmlFor="pr_number" value="PR Number" />
            <TextInput
              id="pr_number"
              name="pr_number"
              value={data.pr_number}
              className="mt-1 block w-full"
              onChange={handlePRNumberChange}
            />
            <InputError message={errors.pr_number} className="mt-2" />
          </div>
            <div>
              <InputLabel htmlFor="focal_person" value="Focal Person" />
              <TextInput
                id="focal_person"
                name="focal_person"
                value={`${user.firstname} ${user.middlename} ${user.lastname}`}
                className="mt-1 block w-full"
                onChange={(e) => setData('focal_person', e.target.value)}
                readOnly
              />
              <InputError message={errors.focal_person} className="mt-2" />
            </div>
            <div>
              <InputLabel htmlFor="division" value="Department" />
              <SelectInput
                id="division"
                name="division"
                value={data.division}
                className="mt-1 block w-full"
                onChange={(e) => setData('division', e.target.value)}
                readOnly
              >
                <option value="">Select Department</option>
                <option value="1">SGOD</option>
                <option value="2">OSDS</option>
                <option value="3">CID</option>
              </SelectInput>
              <InputError message={errors.division} className="mt-2" />
            </div>

            <div>
              <InputLabel htmlFor="requested_by" value="Requested By" />
              <TextInput
                id="requested_by"
                name="requested_by"
                value={data.requested_by}
                className="mt-1 block w-full"
                onChange={(e) => setData('requested_by', e.target.value)}
                readOnly
              />
              <InputError message={errors.requested_by} className="mt-2" />
            </div>
          </div>

          {/* Item Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="item_name" value="Item Name" />
              <TextInput
                id="item_name"
                name="item_name"
                value={data.item_name}
                className="mt-1 block w-full"
                onChange={(e) => setData('item_name', e.target.value)}
              />
              <InputError message={errors.item_name} className="mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputLabel htmlFor="quantity" value="Quantity" />
                <TextInput
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={data.quantity}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('quantity', e.target.value)}
                />
                <InputError message={errors.quantity} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="unit" value="Unit" />
                <SelectInput
                  id="unit"
                  name="unit"
                  value={data.unit}
                  className="mt-1 block w-full"
                  onChange={(e) => setData({...data, unit: e.target.value})}
                >
                  <option value="">Select Unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.unit}
                    </option>
                  ))}

                </SelectInput>
                <InputError message={errors.unit} className="mt-2" />
              </div>
            </div>
          </div>

          {/* Purpose */}
          <div>
            <InputLabel htmlFor="purpose" value="Purpose" />
            <TextAreaInput
              id="purpose"
              name="purpose"
              value={data.purpose}
              className="mt-1 block w-full"
              onChange={(e) => setData('purpose', e.target.value)}
            />
            <InputError message={errors.purpose} className="mt-2" />
          </div>

          {/* Estimated Cost */}
          <div>
            <InputLabel htmlFor="unit_price" value="Estimated Cost per Unit" />
            <TextInput
              id="unit_price"
              name="unit_price"
              type="number"
              value={data.unit_price}
              className="mt-1 block w-full"
              onChange={(e) => setData('unit_price', e.target.value)}
            />
            <InputError message={errors.unit_price} className="mt-2" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
