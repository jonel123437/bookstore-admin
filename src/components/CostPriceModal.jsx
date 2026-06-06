import { useState } from "react";
import client from "../api/client";

export default function CostPriceModal({ book, onClose }) {
  const [reason, setReason] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);
  const [costPrice, setCostPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError("");

    if (reason.trim().length < 5) {
      setFieldError("Reason must be at least 5 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await client.post(`/api/books/${book.id}/cost-price`, {
        reason,
      });
      setCostPrice(res.data.data);
    } catch (err) {
      if (err.response?.status === 422) {
        setFieldError(
          err.response.data.errors?.reason?.[0] ?? "Invalid reason.",
        );
      } else {
        setFieldError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-base font-medium text-gray-900">
              View cost price
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{book.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {/* Cost price result — only rendered after successful API call */}
        {costPrice ? (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-center">
            <p className="text-sm text-green-700 mb-1">Cost price</p>
            <p className="text-2xl font-medium text-green-800">
              {costPrice.currency} {parseFloat(costPrice.cost_price).toFixed(2)}
            </p>
            <button
              onClick={onClose}
              className="mt-4 text-sm text-green-700 underline"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for viewing
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="e.g. Auditing margin for Q3 review"
                disabled={loading}
                className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  fieldError ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {fieldError && (
                <p className="text-red-600 text-xs mt-1">{fieldError}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Minimum 5 characters</p>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
              >
                {loading ? "Fetching..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
