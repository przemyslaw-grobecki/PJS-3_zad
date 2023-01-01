import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import axios from 'axios';
import React, {forwardRef, ReactElement, Ref, useState} from 'react';
import BasketItem from "../types/BasketItem";
import config from "../config.json";

type BasketProps = {
    basketItems: Array<BasketItem>,
    basketOpen: boolean,
    closeBasket: Function
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Basket: React.FC<BasketProps> = (props: BasketProps) => {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const onCloseHandler = () => {
        props.closeBasket();
    };

    const endOrderHandler = () => {
        setIsConfirmed(false);
        props.closeBasket();
    };

    const onConfirmHandler = async () => {
        let response = await axios.post(`${config.serverURL}/products/buy`, {
            basket: props.basketItems
        });
        setIsConfirmed(true);
    };

    return (
        <Dialog
            open={props.basketOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={onCloseHandler}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{isConfirmed ? "Thanks for buying in PrzemekShop" : "Are You sure, You want to confirm your order?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {isConfirmed ? "Your order is under service." : "By clicking confirm You will be redirected to your banking service to perform the payment. The list of items in basket:"}
                </DialogContentText>
                {props.basketItems.map((item, idx) => {
                    return (
                        <div>
                            <li key={idx}>
                                {item.name.toString()} in quantity of {item.quantity.toString()} for total
                                of {(Number(item.quantity) * Number(item.price))}$
                            </li>
                        </div>
                    )
                })}
            </DialogContent>
            <DialogActions>
                {isConfirmed ?
                    <Button onClick={endOrderHandler}>Ok</Button> :
                    <div>
                        <Button onClick={onCloseHandler}>Abort</Button>
                        <Button onClick={onConfirmHandler}>Confirm</Button>
                    </div>
                }
            </DialogActions>
        </Dialog>
    )
};

export default Basket;