"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";



export default function Sheet() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/add-dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add dispute");
     toast.success("Dispute added successfully!");
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 heading">Add Dispute</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:ring-0 focus:border-[#F2B124]"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Bureau</label>
          <input
            type="text"
            {...register("bureau", { required: "Bureau is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
            placeholder="Equifax, Experian, etc."
          />
          {errors.bureau && <p className="text-red-500 text-sm">{errors.bureau.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Account</label>
          <input
            type="text"
            {...register("account", { required: "Account is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
            placeholder="Account name/number"
          />
          {errors.account && <p className="text-red-500 text-sm">{errors.account.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
            placeholder="Describe the dispute"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Response</label>
          <input
            type="text"
            {...register("response", { required: "Response is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
          />
          {errors.response && <p className="text-red-500 text-sm">{errors.response.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="date"
            {...register("deadline", { required: "Deadline is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
          />
          {errors.deadline && <p className="text-red-500 text-sm">{errors.deadline.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border rounded-lg p-2 border-[#F2B124] focus:outline-none focus:ring-0 focus:border-[#F2B124]"
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F2B124] text-white py-2 px-4 rounded-lg hover:bg-[#F2B124] transition disabled:opacity-50 submit-btn"
        >
          {loading ? "Saving..." : "Add Dispute"}
        </button>

      </form>
    </div>
  );
}
