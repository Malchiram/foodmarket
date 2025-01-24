import { useContext, useState } from "react";
import Contents from "../Components/Card";
import Jumbotron from "../Components/Jumbotron";
import Recommended from "../Components/Recommended";
import { useCustomQuery } from "../config/query";
import { Partner } from "../utils/admin";
import { UserContext } from "../utils/context/userContext";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  // let { data, isLoading, isSuccess } = useCustomQuery("partner", Partner)
  // console.log(state, "cel")
  let result = useCustomQuery("partner", Partner)

  return (
    <>

      <Jumbotron />
      <Contents data={result?.data} load={result?.isLoading} />
      <Recommended data={result?.data} load={result?.isLoading} />


    </>
  );
};

export default Home;
