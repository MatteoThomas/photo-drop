import { useState } from "react";
import CheckoutForm from "../../components/CheckoutForm";
// import Auth from '../utils/auth';



const Donation = props => {
    const [numDollars, setNumDollars] = useState(1);
  
    const addDollar = () => setNumDollars(num => Math.min(12, num + 1));
    const remDollar = () => setNumDollars(num => Math.max(1, num - 1));
  
    return (
      <Layout title="Donate Now">
        <Row>
          <Donate
            onAddDollar={addDollar}
            onRemoveDollar={remDollar}
            numDollar={numDollar}
          />
        </Row>
        <CheckoutForm
          price={getDonationPrice(numDollar)}
          onSuccessfulCheckout={() => Router.push("/success")}
        />
      </Layout>
    );
  };

export default Donation;