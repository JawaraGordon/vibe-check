const Button = ({ label, onClick, primary }) => {
  const buttonClass = primary
    ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'
    : 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
