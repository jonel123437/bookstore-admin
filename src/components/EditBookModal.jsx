import { useState } from "react";
import client from "../api/client";

export default function EditBookModal({ book, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    retail_price: book.retail_price,
    stock: book.stock,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");
    setLoading(true);

    try {
      const res = await client.put(`/api/books/${book.id}`, {
        title: form.title,
        author: form.author,
        retail_price: parseFloat(form.retail_price),
        stock: parseInt(form.stock),
      });
      onUpdated(res.data.data);
      onClose();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors ?? {});
      } else if (err.response?.status === 403) {
        setGeneralError("You do not have permission to edit books.");
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", label: "Title", type: "text" },
    { name: "author", label: "Author", type: "text" },
    { name: "retail_price", label: "Retail price", type: "number" },
    { name: "stock", label: "Stock", type: "number" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-base font-medium text-gray-900">Edit book</h2>
            <p className="text-sm text-gray-500 mt-0.5">{book.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none ml-4"
          >
            ✕
          </button>
        </div>

        {generalError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                disabled={loading}
                min={type === "number" ? 0 : undefined}
                className={`w-full px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors[name] ? "border-red-400 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors[name] && (
                <p className="text-red-600 text-xs mt-1">{errors[name][0]}</p>
              )}
            </div>
          ))}

          <div className="flex gap-2 justify-end pt-2">
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
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
