import IncomingTrip from "../../Components/Admin/IncomingTransaction";
import { useCustomQuery } from "../../config/query";
import { transactionPartner } from "../../utils/admin";
const Admin = () => {
  let { data: transaction, isLoading } = useCustomQuery("partner", transactionPartner)
  return (
    <>
      <IncomingTrip data={transaction} isLoading={isLoading} />


    </>
  );
};

export default Admin;
