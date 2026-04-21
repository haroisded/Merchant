function FilterApps() {
    return (
    <>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="relative w-full md:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary text-lg">🔍</span>
            <input
                type="text"
                placeholder="Search systems..."
                className="w-full bg-brand-secondary/10 border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-secondary outline-none text-sm font-medium text-brand-dark placeholder:text-brand-dark/40"
            />
            </div>

            <div className="bg-brand-dark/10 p-1 rounded-full flex gap-1">
            <button className="px-6 py-2 rounded-full text-xs font-bold uppercase bg-white text-brand-secondary shadow-sm">All Systems</button>
            <button className="px-6 py-2 rounded-full text-xs font-bold uppercase text-brand-dark/50 hover:text-brand-dark transition-colors">Active</button>
            <button className="px-6 py-2 rounded-full text-xs font-bold uppercase text-brand-dark/50 hover:text-brand-dark transition-colors">Draft</button>
            </div>
        </div>
    </>
  )
}

export default FilterApps