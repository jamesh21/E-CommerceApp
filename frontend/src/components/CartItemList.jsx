import CartItem from './CartItem'
import { Row, Col } from 'react-bootstrap';


function CartItemList({ cartItems, updateCartItemQuantity, onDelete }) {
    return (
        <>
            <Row className="shadow rounded">
                {cartItems.map((cartItem) => (
                    <Col key={cartItem.cartItemId} sm={12} className="mb-4">
                        <hr />
                        <CartItem
                            cartItem={cartItem}
                            onQuantityChange={updateCartItemQuantity}
                            onDelete={onDelete}>
                        </CartItem>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default CartItemList

