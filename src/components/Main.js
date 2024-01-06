import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';

const Main = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/setup'); 
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 flex flex-col justify-center items-center h-screen">
        <h1 className="text-white text-4xl font-bold leading-none mb-8 ">
          Vibe Check
        </h1>
        <div className="flex flex-row justify-evenly items-center w-full max-w-xs">
          <Button label="Start" onClick={handleStartClick} />
          {/* <Button label="Exit" onClick={() => {}} /> */}
        </div>
      </div>
      <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </>
  );
};

export default Main;
