import loadingSvg from '@/assets/loading.svg';

const LoadingSpinner = ({ size = 64 }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={loadingSvg}
        alt="Loading..."
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LoadingSpinner;