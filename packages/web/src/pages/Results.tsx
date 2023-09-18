import {useNavigate} from "react-router-dom";


const Results = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => {
      navigate("/round/1");
    }}>
      results
    </div>
  );
};

export default Results;