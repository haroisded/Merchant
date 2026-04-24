import {
  MdPointOfSale,
  MdTrendingUp,
  MdPeopleOutline,
  MdInventory2,
  MdMoreVert,
} from 'react-icons/md';

// Dummy stats for visual representation
const STATS = [
  { label: 'Total Revenue', value: '₱124,500', icon: MdTrendingUp, change: '+12.5%' },
  { label: 'Transactions', value: '1,204', icon: MdPointOfSale, change: '+8.2%' },
  { label: 'Active Users', value: '32', icon: MdPeopleOutline, change: '+3' },
  { label: 'Products', value: '156', icon: MdInventory2, change: 'No change' },
];

// Dummy recent activities
const ACTIVITIES = [
  { user: 'Juan Dela Cruz', action: 'added new product "Mango Jam"', time: '2 min ago' },
  { user: 'Maria Santos', action: 'processed sale #1023', time: '15 min ago' },
  { user: 'Admin', action: 'updated inventory counts', time: '1 hour ago' },
  { user: 'Juan Dela Cruz', action: 'refunded transaction #1018', time: '2 hours ago' },
];

export default function DashboardPage() {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="badge badge-outline border-brand-secondary/30 text-brand-secondary text-xs font-semibold px-4 py-2">
          Last updated: just now
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, change }) => (
          <div
            key={label}
            className="bg-white rounded-2xl p-5 border border-brand-accent/30 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-2xl font-black text-brand-dark">{value}</p>
                <span
                  className={`text-[11px] font-semibold ${
                    change.includes('+') ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {change} from last week
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center">
                <Icon className="text-brand-secondary" size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column layout: Recent Activity + Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-brand-accent/30 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-brand-dark text-lg">Recent Activity</h2>
            <button className="btn btn-ghost btn-sm text-gray-400">
              <MdMoreVert size={18} />
            </button>
          </div>
          <ul className="space-y-4">
            {ACTIVITIES.map((act, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-black text-brand-secondary">
                    {act.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {act.user}{' '}
                    <span className="font-normal text-gray-500">{act.action}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chart placeholder */}
        <div className="bg-white rounded-2xl p-6 border border-brand-accent/30 shadow-sm flex flex-col">
          <h2 className="font-black text-brand-dark text-lg mb-2">Sales Overview</h2>
          <p className="text-xs text-gray-400 mb-4">Weekly performance</p>
          <div className="flex-1 bg-gradient-to-br from-brand-light to-brand-accent/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MdTrendingUp className="mx-auto text-brand-secondary/30" size={48} />
              <p className="text-sm text-gray-400 font-medium mt-2">
                Chart will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}