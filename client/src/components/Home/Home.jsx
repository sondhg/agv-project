import { useSelector } from "react-redux";
import Instruction from "./Instruction";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);

  return (
    <div>
      <Instruction />
    </div>
  );
};

export default Home;
