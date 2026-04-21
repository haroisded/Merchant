const HomeHeader = () => {
  return (
    <>
        <header className="max-w-7xl mx-auto flex items-center justify-between px-12 py-6 bg-white border-b border-brand-secondary/20 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-secondary/20"></div>
                <div className="text-2xl font-black leading-none text-brand-dark tracking-tighter">
                Merchant
                </div>
            </div>


            <div className="flex items-center gap-8">

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-brand-secondary tracking-widest uppercase">Support</p>
                        <p className="text-xs font-bold text-brand-dark">Help Center</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">?</div>
                </div>

                <button className="text-3xl text-brand-secondary">⚙️</button>

            </div>
        </header>
    </>
  )
}

export default HomeHeader