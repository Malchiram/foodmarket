import { Col, Container, Row } from "react-bootstrap";


const Contents = ({ data, load }) => {

  return (
    <Container className=" homePopular">
      <h3>Popular Restaurant</h3>

      <div className="d-flex" style={{flex:'wrap',gap:'5px'}}>
        {!load && data?.slice(0, 4).map((item) => {
          return (

            <div >
              <div className="popularRestaurant  shadow-lg" >
                <div className="d-flex" style={{width:'100%',height:'100%',justifyContent:'space-between'}} >
                  <div style={{height:'100%',width:"35%",display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={item.image} alt="" className="imagePop" />
                  </div>
                  <div style={{width:'60%',height:'100%',display:'flex',justifyContent:'center', alignItems:'center'}}>
                    <p className="textPop">{item?.shortname}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  );
};

export default Contents;
