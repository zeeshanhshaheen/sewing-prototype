'use client';

interface NotificationProps {
  message: string;
  subMessage?: string;
  onClose: () => void;
}

export default function Notification({
  message,
  subMessage,
  onClose,
}: NotificationProps) {
  return (
    <div className='flex items-center p-4 bg-green-50 border border-green-200 rounded-md shadow w-[300px]'>
      <svg
        className='w-6 h-6 text-green-600'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        viewBox='0 0 24 24'
      >
        <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2L15 9' />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.5c4.142 0 7.5 3.358 7.5 7.5S16.142 19.5 12 19.5 4.5 16.142 4.5 12 7.858 4.5 12 4.5z'
        />
      </svg>
      <div className='ml-3'>
        <p className='font-semibold text-green-800'>{message}</p>
        {subMessage && <p className='text-sm text-green-700'>{subMessage}</p>}
      </div>
      <button
        onClick={onClose}
        className='ml-auto text-green-700 hover:text-green-900'
      >
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}
