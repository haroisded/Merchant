import { MdInventory2, MdAttachMoney, MdDescription, MdImage } from 'react-icons/md';

export default function ProductInputPage() {
  return (
    <div className="px-6 py-8 max-w-3xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-brand-dark tracking-tight">
          New Product
        </h1>
        <p className="text-gray-500 text-sm font-medium mt-1">
          Fill in the details to add a product to your inventory.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-accent/30 shadow-sm space-y-6">
        {/* Product Name */}
        <div>
          <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-xs tracking-wide mb-2">
            <MdInventory2 className="text-brand-secondary" size={16} />
            Product Name
          </label>
          <input
            type="text"
            placeholder="e.g. Mango Jam"
            className="input input-bordered w-full bg-brand-light/50 border-brand-accent/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 font-medium text-sm"
            readOnly // UI only
          />
        </div>

        {/* Price & Category row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-xs tracking-wide mb-2">
              <MdAttachMoney className="text-brand-secondary" size={16} />
              Price (₱)
            </label>
            <input
              type="text"
              placeholder="0.00"
              className="input input-bordered w-full bg-brand-light/50 border-brand-accent/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 font-medium text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-xs tracking-wide mb-2">
              <MdInventory2 className="text-brand-secondary" size={16} />
              Category
            </label>
            <select className="select select-bordered w-full bg-brand-light/50 border-brand-accent/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 font-medium text-sm">
              <option>Select category</option>
              <option>Food & Beverages</option>
              <option>Merchandise</option>
              <option>Services</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-xs tracking-wide mb-2">
            <MdDescription className="text-brand-secondary" size={16} />
            Description
          </label>
          <textarea
            placeholder="Brief product description..."
            className="textarea textarea-bordered w-full bg-brand-light/50 border-brand-accent/50 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 font-medium text-sm h-24"
            readOnly
          />
        </div>

        {/* Image Upload Placeholder */}
        <div>
          <label className="flex items-center gap-2 text-brand-dark font-black uppercase text-xs tracking-wide mb-2">
            <MdImage className="text-brand-secondary" size={16} />
            Product Image
          </label>
          <div className="border-2 border-dashed border-brand-accent/60 rounded-xl p-6 bg-brand-light/30 text-center cursor-pointer hover:bg-brand-light/70 transition-colors">
            <MdImage className="mx-auto text-brand-secondary/40" size={32} />
            <p className="text-sm text-gray-400 font-medium mt-2">
              Drag & drop an image here, or click to browse
            </p>
            <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Digital / Physical Toggle */}
        <div className="flex items-center justify-between p-3 bg-brand-light rounded-xl">
          <span className="text-sm font-bold text-brand-dark">Physical Product</span>
          <input
            type="checkbox"
            className="toggle toggle-success"
            defaultChecked
            readOnly
            // DaisyUI toggle for visual only
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button className="btn btn-outline border-brand-accent text-brand-dark hover:bg-brand-light/50 font-bold text-sm px-6">
            Cancel
          </button>
          <button className="btn bg-brand-secondary text-white hover:bg-brand-dark font-bold text-sm px-8 shadow-md shadow-brand-secondary/20">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}