import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import client from "../api/client";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/useAuth";
import BooksTable from "../components/BooksTable";
import Pagination from "../components/Pagination";
import EditBookModal from "../components/EditBookModal";
import CostPriceModal from "../components/CostPriceModal";

export default function BooksPage() {
  const { user, hasPermission, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks(page);
  }, [page, fetchBooks]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        user={user}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        onLogout={handleLogout}
        onMenuClick={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — drawer on mobile, static on desktop */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200
            transform transition-transform duration-200 ease-in-out
            lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:py-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
                {error}
                <button
                  onClick={() => fetchBooks(page)}
                  className="underline ml-4 shrink-0"
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
        </main>
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
    </div>
  );
}
