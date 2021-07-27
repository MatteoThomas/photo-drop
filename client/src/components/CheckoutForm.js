import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Row from "./prebuilt/Row";
import BillingDetailsFields from "./prebuilt/BillingDetailsFields";
import SubmitButton from "./prebuilt/SubmitButton";
import CheckoutError from "./prebuilt/CheckoutError";

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;


const CheckoutForm = ({ price, onSuccessfulCheckout }) => {
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
  
    const stripe = useStripe();
    const elements = useElements()

    const handleCardDetailsChange = ev => {
        ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
      };
    
      const handleFormSubmit = async ev => {
        ev.preventDefault();
    
        const billingDetails = {
          name: ev.target.name.value,
          email: ev.target.email.value,
          address: {
            city: ev.target.city.value,
            line1: ev.target.address.value,
            state: ev.target.state.value,
            postal_code: ev.target.zip.value
          }
        };
    
        setProcessingTo(true);
    
        const cardElement = elements.getElement("card");
    
        //sending to api / payment_intents 
        try {
          const { data: clientSecret } = await axios.post("/api/payment_intents", {
            amount: price * 100
          });
    
          const paymentMethodReq = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: billingDetails
          });
    
          if (paymentMethodReq.error) {
            setCheckoutError(paymentMethodReq.error.message);
            setProcessingTo(false);
            return;
          }
    
          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethodReq.paymentMethod.id
          });
    
          if (error) {
            setCheckoutError(error.message);
            setProcessingTo(false);
            return;
          }
    
          onSuccessfulCheckout();
        } catch (err) {
          setCheckoutError(err.message);
        }
      };
      return (
        <form onSubmit={handleFormSubmit}>
          <Row>
            <BillingDetailsFields />
          </Row>
          <Row>
            <CardElementContainer>
              <CardElement
                options={cardElementOpts}
                onChange={handleCardDetailsChange}
              />
            </CardElementContainer>
          </Row>
          {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
          <Row>
            {/* TIP always disable your submit button while processing payments */}
            <SubmitButton disabled={isProcessing || !stripe}>
              {isProcessing ? "Processing..." : `Pay $${price}`}
            </SubmitButton>
          </Row>
        </form>
      );
    };
    
    export default CheckoutForm;      