import Button from 'react-bootstrap/Button';
import { useCart } from '../../context/CartContext'
import { useError } from '../../context/ErrorContext'
import { TIMED_OUT_ERR_MSG, NETWORK_ERR_MSG, TIMED_OUT_CASE } from '../../constants/constant'

function OrderSummary() {
    const { calculateCartItemTotal, onCheckout, totalCartQuantity } = useCart()
    const { showError } = useError()

    /**
     * invokes checkout functionality
     */
    const handleClick = async () => {
        try {
            await onCheckout()
        } catch (err) {
            if (err.code === TIMED_OUT_CASE) {
                showError(TIMED_OUT_ERR_MSG)
            } else if (!err.response) {
                showError(NETWORK_ERR_MSG)
            } else if (err.response?.data?.code === 'INSUFFICIENT_STOCK') {
                showError('Insufficient stock for some products in your cart')
            }
            else {
                showError('Something went wrong, please try again')
            }
        }
    }

    return (
        <div className="shadow rounded sticky-s-top d-flex flex-column sticky-xs-bottom order-summary">
            <h3 className="d-none d-lg-block py-4 px-3" >Order Summary</h3>
            <div className="px-5 total-text">
                {calculateCartItemTotal()}
                <div className="mb-3">{totalCartQuantity} items</div>
            </div>
            <div className="text-center h100 mb-5 checkout-btn">
                <Button onClick={handleClick} size="lg" variant="dark">Check out</Button>
            </div>
        </div>
    )
}

export default OrderSummary
