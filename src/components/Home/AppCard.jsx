import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

const AppCard = ({ app }) => {
  if (!app) return null;

  return (
    <>
      <div className="bg-white rounded-[40px] overflow-hidden border-2 border-transparent hover:border-brand-secondary cursor-pointer transition-all">
        <div
          className="h-48 bg-cover bg-center relative bg-gradient-to-br from-brand-secondary/20 to-brand-secondary/5 flex items-center justify-center"
          // style={{ backgroundImage: `url(${app.image_url})` }} // ← add image_url to DB later
        >
          <span className="absolute top-4 right-4 bg-status-active-bg text-status-active-text text-[10px] font-black px-3 py-1 rounded-full">
            ACTIVE
          </span>
        </div>

        <div className="p-6">

          <h3 className="text-xl font-black text-brand-dark">{app.app_name}</h3>
          <div className="text-[10px] text-brand-dark/40 font-bold flex flex-col mt-1">
            <span>📦 {app.app_type.toUpperCase()}</span>
            <span>ID: {app.id.slice(0, 8)}...</span>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-brand-secondary text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-brand-dark transition-colors">
              <FaEdit size={14} /> <span>Edit</span>
            </button>
            <button className="flex-1 bg-white text-brand-secondary border border-brand-secondary/30 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-brand-secondary/10 transition-colors">
              <FaEye size={14} /> <span>View</span>
            </button>
            <button className="flex-1 bg-white text-red-400 border border-red-200 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-red-50 transition-colors">
              <FaTrash size={14} /> <span>Delete</span>
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AppCard;