import { useState } from "react";
import { MdPointOfSale, MdOutlineAssignment, MdReceipt, MdSettings } from "react-icons/md";
import { FcStatistics } from "react-icons/fc";
import { RxHamburgerMenu } from "react-icons/rx";

const NAV_ITEMS = [
  { icon: MdPointOfSale, label: "Cash Register" },
  { icon: FcStatistics, label: "Statistics" },
  { icon: MdOutlineAssignment, label: "Audit" },
  { icon: MdReceipt, label: "Receipt" },
  { icon: MdSettings, label: "Settings" },
];

const ICON_SIZE = 28;

export default function AppWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <style>{`
        .app-sidebar { width: 64px; }
        @media (min-width: 640px) {
          .app-sidebar { width: 240px; }
        }
        .app-sidebar .nav-item { justify-content: center; padding-left: 0; padding-right: 0; }
        @media (min-width: 640px) {
          .app-sidebar .nav-item { justify-content: flex-start; padding-left: 8px; padding-right: 8px; }
        }
        .burger-btn { transition: opacity 150ms ease, transform 150ms ease; }
        .burger-btn:hover { opacity: 0.82; }
        .burger-btn:active { transform: scale(0.92); }
      `}</style>

      {/* Burger button – only interactive element */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle sidebar"
        className="burger-btn fixed top-4 left-2.5 flex items-center justify-center rounded-lg focus:outline-none"
        style={{
          zIndex: 200,
          width: 44,
          height: 44,
          backgroundColor: "#1e293b",
          boxShadow: "0 1px 6px rgba(0,0,0,0.22)",
          color: "#f1f5f9",
        }}
      >
        <RxHamburgerMenu size={20} strokeWidth={0.5} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0"
          onClick={() => setOpen(false)}
          style={{ zIndex: 90, background: "rgba(0,0,0,0.28)" }}
        />
      )}

      {/* Sidebar */}
      <aside
        className="app-sidebar fixed top-0 left-0 h-full flex flex-col shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "#008b98",
          zIndex: 100,
          transform: open ? "translateX(0)" : "translateX(-110%)",
          transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex-shrink-0" style={{ height: 68 }} />

        <nav className="flex flex-col gap-1 py-1 flex-grow overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="nav-item flex items-center text-white/90 hover:text-white hover:bg-white/15 rounded-lg py-3 transition-colors duration-150 whitespace-nowrap mx-2"
            >
              <span className="flex items-center justify-center flex-shrink-0" style={{ width: ICON_SIZE + 4, height: ICON_SIZE }}>
                <Icon size={ICON_SIZE} />
              </span>
              <span className="hidden sm:block text-[15px] font-medium ml-3">
                {label}
              </span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#fcfcfc] overflow-auto">
        <div className="text-gray-800 flex flex-col min-h-screen bg-gray-50 font-sans">
          {children}
        </div>
      </main>
    </div>
  );
}