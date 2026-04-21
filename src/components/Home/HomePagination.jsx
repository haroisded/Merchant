const HomePagination = () => {
  return (
    <div className="flex justify-center mt-12 mb-8">
      <div className="flex items-center gap-1 bg-brand-dark/10 p-1 rounded-full px-4 py-2">
        <button className="w-8 h-8 flex items-center justify-center text-brand-dark font-black hover:bg-brand-dark/10 rounded-full transition-colors">
          &lt;
        </button>
        <button className="w-10 h-10 flex items-center justify-center bg-brand-secondary text-white font-bold rounded-full shadow-sm">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-brand-dark font-bold hover:bg-brand-dark/10 rounded-full transition-colors">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-brand-dark font-bold hover:bg-brand-dark/10 rounded-full transition-colors">
          3
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-brand-dark font-bold hover:bg-brand-dark/10 rounded-full transition-colors">
          4
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-brand-dark font-bold hover:bg-brand-dark/10 rounded-full transition-colors">
          5
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-brand-dark font-black hover:bg-brand-dark/10 rounded-full transition-colors">
          &gt;
        </button>
      </div>
    </div>
  )
}

export default HomePagination