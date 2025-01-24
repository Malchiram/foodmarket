import IncomingTrip from "../../Components/Admin/IncomingTransaction";
import { useCustomQuery } from "../../config/query";
import { transactionPartner } from "../../utils/transaction";
const Admin = () => {
   const { data, isLoading } = useCustomQuery(
     "transactionPartner",
     transactionPartner, {
       staleTime: Infinity, // Data akan dianggap selalu valid (tidak basi)
       cacheTime: 1000 * 60 * 5, // Data akan tetap di-cache selama 5 menit
     }
   );
 
  return (
    <>
      <IncomingTrip data={data} isLoading={isLoading} />


    </>
  );
};

export default Admin;
