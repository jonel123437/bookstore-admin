import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import client from "../api/client";
import { useAuth } from "../context/useAuth";
import EditBookModal from "../components/EditBookModal";
import CostPriceModal from "../components/CostPriceModal";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BooksTable from "../components/BooksTable";
import Pagination from "../components/Pagination";

export default function BooksPage() {
  const { user, hasPermission, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const canViewCostPrice = hasPermission("books.cost_price.view");
  const canEditBooks = hasPermission("books.update");

  const [costPriceBook, setCostPriceBook] = useState(null);
  const [editBook, setEditBook] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await client.post("/api/logout");
    } catch {
      // silently ignore
    } finally {
      logout();
      navigate("/login");
    }
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)),
    );
  };

  const fetchBooks = useCallback(async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await client.get("/api/books", {
        params: { page: p, per_page: 15 },
      });
      setBooks(res.data.data);
      setMeta(res.data.meta);
    } catch {
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks(page);
  }, [page, fetchBooks]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1 min-h-0">
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <Header
            user={user}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            onLogout={handleLogout}
          />

          <div className="max-w-5xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
                {error}
                <button
                  onClick={() => fetchBooks(page)}
                  className="underline ml-4"
                >
                  Retry
                </button>
              </div>
            )}

            <BooksTable
              books={books}
              loading={loading}
              canViewCostPrice={canViewCostPrice}
              canEditBooks={canEditBooks}
              onCostPriceClick={setCostPriceBook}
              onEditClick={setEditBook}
            />

            <Pagination meta={meta} onPageChange={setPage} />
          </div>

          {costPriceBook && (
            <CostPriceModal
              book={costPriceBook}
              onClose={() => setCostPriceBook(null)}
            />
          )}
          {editBook && (
            <EditBookModal
              book={editBook}
              onClose={() => setEditBook(null)}
              onUpdated={handleBookUpdated}
            />
          )}
        </main>
      </div>
    </div>
  );
}
