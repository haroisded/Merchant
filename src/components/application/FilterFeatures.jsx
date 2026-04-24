import { IoArrowBack } from "react-icons/io5";
import {
  MdDashboard,
  MdDescription,
  MdMonetizationOn,
  MdAccountBalance,
  MdLocalOffer,
  MdCreditCard,
  MdUndo,
  MdReceipt,
} from "react-icons/md";

const features = [
  {
    icon: MdDashboard,
    title: "Dashboard",
    description: "Real-time analytics and sales overview for the main terminal screen.",
    enabled: true,
  },
  {
    icon: MdDescription,
    title: "Audit Logs",
    description: "Track every action and system change for compliance and security monitoring.",
    enabled: true,
  },
  {
    icon: MdMonetizationOn,
    title: "Cash Register Mode",
    description: "Enable manual cash entry and physical drawer integration for transactions.",
    enabled: true,
  },
  {
    icon: MdAccountBalance,
    title: "Tax Configuration",
    description: "Automated tax calculation and invoice reporting tool. Calculate VAT and local sales tax.",
    enabled: false,
  },
  {
    icon: MdLocalOffer,
    title: "Discount Settings",
    description: "Apply custom percentage or fixed-amount discounts to individual items.",
    enabled: true,
  },
  {
    icon: MdCreditCard,
    title: "Loyalty/Membership Card Program",
    description: "Real-time analytics and sales overview for the main terminal screen.",
    enabled: true,
  },
  {
    icon: MdUndo,
    title: "Refund Module",
    description: "Process returns and issue refunds quickly while keeping transactions accurate and secure.",
    enabled: false,
  },
  {
    icon: MdReceipt,
    title: "Generate Receipt",
    description: "Create and print receipts instantly for accurate and professional transaction records.",
    enabled: true,
  },
];

// Static visual toggle – no interactivity
function Toggle({ enabled }) {
  return (
    <div
      className={`w-12 h-6 rounded-full flex items-center p-1 flex-shrink-0 transition-colors ${
        enabled ? "bg-brand-secondary" : "bg-brand-primary"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transition-transform ${
          enabled ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, enabled }) {
  return (
    <div className="bg-gray-100 rounded-xl p-5 border border-transparent hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-brand-secondary shadow-sm flex-shrink-0">
            <Icon className="w-6 h-6 text-[1.375rem]" />
          </div>
          <h3 className="font-bold text-lg text-brand-dark leading-tight">{title}</h3>
        </div>
        <div className="ml-3 flex-shrink-0">
          <Toggle enabled={enabled} />
        </div>
      </div>
      <p className="text-gray-500 text-sm font-medium leading-relaxed pr-4">{description}</p>
    </div>
  );
}

export default function FilterFeatures() {
  return (
    <>
      {/* Main Content */}
      <main className="flex-grow px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-brand-dark mt-10 mb-2">Features Management</h2>
          <p className="text-gray-500 font-medium text-sm">
            Customize and filter your POS System by enabling or disabling features and functions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        {/* Footer Actions – static buttons */}
        <div className="flex items-center justify-between mt-8">
          <button className="flex items-center text-gray-500 font-bold text-lg hover:text-gray-600 transition-colors">
            <IoArrowBack className="mr-2 text-xl" />
            Back
          </button>

          <button className="bg-brand-secondary hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-colors text-sm uppercase tracking-wider">
            Save Changes
          </button>
        </div>
      </main>
    </>
  );
}