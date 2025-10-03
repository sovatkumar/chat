"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

export default function Sheet() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const doc = new jsPDF();
      doc.setFont("times", "normal");
      doc.setFontSize(12);

      const letter = `
Initial Bureau Dispute (FCRA §611)

Name : ${data.name}
Address : ${data.address}
City : ${data.city || ""}, State : ${data.state || ""} ZIP : ${data.zip || ""}

Date : ${data.date}

Bureau : ${data.bureau}
Bureau Address : ${data.BureauAddress}

RE: Dispute of Inaccurate Information under FCRA §611

To Whom It May Concern:

I am disputing the accuracy of the following item(s) on my credit report: ${
        data.creditor || "[Creditor/Account #]"
      }. The information is inaccurate because ${
        data.reason || "[reason]"
      }. Please investigate and delete or correct within 30 days. I have enclosed copies of supporting documents.

Sincerely,
${data.name}
`;

      const lines = doc.splitTextToSize(letter, 170);
      doc.text(lines, 20, 20);
      toast.success("Dispute Letter has been downloaded successfully!");
      doc.save("Dispute_Letter.pdf");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 heading">Add Dispute</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Enter Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Enter Your Address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
              placeholder="Enter City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
              placeholder="ST"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">ZIP</label>
            <input
              type="text"
              {...register("zip", { required: "ZIP is required" })}
              className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
              placeholder="ZIP Code"
            />
            {errors.zip && (
              <p className="text-red-500 text-sm">{errors.zip.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Bureau Name</label>
          <input
            type="text"
            {...register("bureau", { required: "Bureau Name is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Equifax, Experian, TransUnion"
          />
          {errors.bureau && (
            <p className="text-red-500 text-sm">{errors.bureau.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Bureau Address</label>
          <input
            type="text"
            {...register("BureauAddress", {
              required: "Bureau Address is required",
            })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Enter Bureau Address"
          />
          {errors.BureauAddress && (
            <p className="text-red-500 text-sm">
              {errors.BureauAddress.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Creditor/Account #</label>
          <input
            type="text"
            {...register("creditor", { required: "Creditor is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Creditor or Account #"
          />
          {errors.creditor && (
            <p className="text-red-500 text-sm">{errors.creditor.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Reason</label>
          <textarea
            {...register("reason", { required: "Reason is required" })}
            className="w-full border border-[#F2B124] rounded-lg p-2 focus:outline-none focus:border-[#F2B124]"
            placeholder="Enter reason for dispute"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full submit-btn bg-[#F2B124] text-white rounded-lg cursor-pointr transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Generate & Download Letter"}
        </button>
      </form>
    </div>
  );
}
