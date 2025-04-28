// lib/toast.ts
import { toast as hotToast } from 'react-hot-toast';
import { FaRegCheckCircle } from "react-icons/fa"; 
import { FiInfo } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import { TbAlertTriangle } from "react-icons/tb";


type ToastType = 'notice' | 'success' | 'error' | 'warning';

const toastColors = {
  notice: 'bg-blue-500 border-2 border-blue-600',
  success: 'bg-green-500 border-2 border-green-600',
  error: 'bg-red-500 border-2 border-red-600',
  warning: 'bg-yellow-500 border-2 border-yellow-600',
};

const toastIcons = {
  notice: <FiInfo className="h-5 w-5 mr-2" />,
  success: <FaRegCheckCircle className="h-5 w-5 mr-2" />,
  error: <FiXCircle className="h-5 w-5 mr-2" />,
  warning: <TbAlertTriangle className="h-5 w-5 mr-2" />,
};

export const showToast = (type: ToastType, title: string, message: string, duration = 4000) => {
  hotToast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } relative max-w-sm w-full ${toastColors[type]} text-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
    >
      {/* Cross button */}
      <button
        onClick={() => hotToast.dismiss(t.id)}
        className="absolute top-2 right-2 text-white hover:text-gray-300"
      >
      </button>

      {/* Icon + Content */}
      <div className="flex flex-col w-full">
        {/* Top: Icon + Title */}
        <div className="flex items-center font-bold text-slate-200">
          <div className="flex-shrink-0">
            {toastIcons[type]}
          </div>
          <p className="text-sm font-semibold">{title}</p>
        </div>

        {/* Bottom: Message */}
        <p className="mt-1 text-sm">{message}</p>
      </div>
    </div>
  ),  { duration } );
};
