import React from 'react';
import {Button} from "antd";

const FooterDonate = () => {

    return (
        <div className="footer-donate">
            <div className="article">
                Як допомогти проєкту?
            </div>
            <div className="desc" >
                      <span>Ініціатива потребує постійної фінансової підтримки,
                      аби покривати щоденні витрати на роботу.</span>
                </div>
            <a target="blank"
               href="https://secure.wayforpay.com/payment/s0f2891d77061">
                <Button className="flooded-button donate-button">
                    Допомогти проєкту
                </Button>
            </a>
        </div>
    );
};

export default FooterDonate