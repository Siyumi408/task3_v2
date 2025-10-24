import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import { apiGet, apiJSON } from "../src/api.js";

export default function InterestsDialog({ open, onClose, onSaved }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const [cats, mine] = await Promise.all([
          apiGet("/api/interests/categories"),
          apiGet("/api/interests/me").catch(() => ({ categories: [] }))
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setSelected(new Set((mine.categories || []).map(c => c.category_id)));
      } catch (e) {
        console.error(e);
        setError("Couldn’t load categories. Check API URL / CORS / server.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [open]);

  const toggle = id => setSelected(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const submit = async () => {
    const ids = Array.from(selected);
    setSaving(true);
    try {
      await apiJSON("POST", "/api/interests/me", { categories: ids });
      onSaved?.(ids);
      onClose?.();
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose your interests</h2>

      {loading ? (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">Loading...</div>
      ) : error ? (
        <div className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800 text-sm">
          {error}
        </div>
      ) : categories.length === 0 ? (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">No categories available.</div>
      ) : (
        <div className="flex flex-wrap gap-2 max-h-[50vh] overflow-auto pr-2 my-4">
          {categories.map(c => (
            <button
              key={c.category_id}
              onClick={() => toggle(c.category_id)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${selected.has(c.category_id)
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-md dark:from-purple-500 dark:to-pink-500 dark:shadow-lg"
                  : "bg-white hover:bg-gray-50 border-gray-300 text-gray-700 shadow-sm hover:shadow-md dark:bg-slate-800 dark:text-gray-200 dark:border-slate-600 dark:hover:bg-slate-700 dark:hover:border-slate-500"}`}
            >
              {c.category_name}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
        <button 
          onClick={onClose} 
          className="px-5 py-2.5 border rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-800 dark:hover:border-slate-500 font-medium"
        >
          Not now
        </button>
        <button 
          onClick={submit} 
          disabled={!selected.size || saving}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 dark:from-purple-500 dark:to-pink-500 dark:hover:shadow-purple-500/50"
        >
          {saving ? "Saving..." : "Save interests"}
        </button>
      </div>
    </Modal>
  );
}

