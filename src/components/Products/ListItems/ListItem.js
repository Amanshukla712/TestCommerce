import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddToCartIcon from "../../../assets/icons/add_cart.svg"
import Modal from "../../UI/Modal"
import { addItemHandler } from "../../../actions"
import { removeItemHandler } from "../../../actions"

const ListItem = ({ data  }) => {
    // const [counter, setCounter] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const item = useSelector(state => state.items.find(item => item.id === data.id))
    const dispatch = useDispatch()

    const increaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(addItemHandler(data))
    }

    const decreaseCounterByOne = event => {
        event.stopPropagation()
        dispatch(removeItemHandler(data.id))
    }

    const handleModal = () => {
        setShowModal(previousState => !previousState)
    }

    return (
        <Fragment>
            <div onClick={handleModal} className={"item-card"}>
                <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>
                {
                    !item || item?.quantity < 1 ?
                    <button className={"cart-add"} onClick={increaseCounterByOne}>
                        <span>Add to Cart</span>
                        <img src={AddToCartIcon} alt="Cart Icon"/>
                    </button>
                    :
                    <div className="cart-addon">
                        <button onClick={decreaseCounterByOne}><span>-</span></button>
                        <span>{item.quantity}</span>
                        <button onClick={increaseCounterByOne}><span>+</span></button>
                    </div>
                }
            </div>
            { showModal && 
                <Modal onClose={handleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`/assets/${data.thumbnail}`} alt={data.title}/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.discountedPrice}</span>
                                <small>
                                    <strike>₹{data.price}</strike>
                                </small>
                            </div>
                            <p>{data.description}</p>
                            {
                                !item||item?.quantity < 1 ?
                                <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                                    <span>Add to Cart</span>
                                    <img src={AddToCartIcon} alt="Cart Icon"/>
                                </button>
                                :
                                <div className="cart-addon card-addon__modal">
                                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={increaseCounterByOne}><span>+</span></button>
                                </div>
                            }
                        </div>
                    </div>
                </Modal> 
            }
        </Fragment>
    )
}

export default ListItem