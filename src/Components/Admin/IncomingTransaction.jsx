import { useState } from "react";
import { Container, Table } from "react-bootstrap";

const IncomingTransaction = ({ data, isLoading }) => {
  // cek data
  const [currentPage, setCurrentPage] = useState(1);

  const [activePage, setActivePage] = useState(1);


  // // ...

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan loading state selama data sedang dimuat
  }
  // if (isError) {
  //   return <div>Error: {error.message}</div>; // Tampilkan pesan error jika terjadi kesalahan
  // }

  const recordperPage = 5;
  const lastIndex = currentPage * recordperPage;
  const firstIndex = lastIndex - recordperPage;
  const record = data.slice(firstIndex, lastIndex);
  // urutkan abjad
  data.sort((a, b) => {
    const nameA = a?.userOrder?.fullname.toLowerCase();
    const nameB = b?.userOrder?.fullname.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  const npage = Math.ceil(data.length / recordperPage);

  const number = [...Array(npage + 1).keys()].slice(1);

  console.log(data, "ini datas dari iTransaction");

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
      setActivePage(currentPage + 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
    setActivePage(id);
  };
  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
      setActivePage(currentPage - 1);
    }
  };

  return (
    <>
      <Container>
        <h3 className="mt-5">Incoming Transaction</h3>
        <Table striped className="mt-5" style={{ border: "1px solid #000" }}>
          <thead>
            <tr className="mt-3">
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Product Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && record.map((t, i) => {
              const recordIndex = i + 1 + (currentPage - 1) * recordperPage;
              return (

                <tr className="mt-5" key={i} >
                  <td>{recordIndex}</td>
                  <td>{t?.userOrder?.fullname}</td>
                  <td>-</td>
                  <td key={i}>
                    {!isLoading && t?.carts?.map((product, i) => {
                      return (

                        <p className="text-truncate">{product?.product?.title}</p>
                      )
                    })}
                  </td>
                  <td className={
                    t?.status === "SUCCESS" && "Success" ? "green" : "orange"
                  } >
                    <p>{t?.status}</p>
                  </td>
                </tr>
              )
            })}


          </tbody>
        </Table>
        <nav>
          <ul
            style={{ display: "flex", justifyContent: "center" }}
            className="listAdmin"
          >
            <li className="preStyle me-3">
              <a onClick={() => prePage()} className="">
                Prev
              </a>
            </li>
            {number?.map((n, i) => (
              <li key={i} className={n === activePage ? "active" : ""}>
                <a onClick={() => changePage(n)}

                >{n}</a>
              </li>
            ))}
            <li className="nextStyle ms-3">
              <a onClick={() => nextPage()}>Next</a>
            </li>
          </ul>
        </nav>
      </Container>
    </>
  );
};

export default IncomingTransaction;
