import {Button, Card, ConfigProvider, Popover, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import React, {useState} from "react";
import CenterLogo from "./CenterLogo";
import "./css/CenterListRectangleItem.css";
import ClubItemMap from "../clubList/ClubItemMap";


const CenterListRectangleItem = ({center, onCenterClick}) => {
    const [visible, setVisible] = useState(false);

    const getRating = () => {
        let rating = 0;
        let ratedClubs = 0;
        center.clubs.forEach(club => {
            if (parseInt(club.rating)) {
                rating += parseInt(club.rating);
                ratedClubs++;
            }
        });
        return ratedClubs === 0 ? 0 : rating / ratedClubs;
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimaryHover: '#002766',
                },
                components: {
                    Button: {
                        colorPrimaryHover: '#002766',
                    }
                }
            }}>
            <div>
                <Card className="card center-list-rectangle-item"
                      key={center.name}>
                    <div className="item-rectangle-row">
                        <div className="center-title" onClick={() => onCenterClick(center)}>
                            <CenterLogo urlLogo={center.urlLogo}/>
                            <div className="center-name">{center.name}</div>
                        </div>
                    </div>

                    <div className="item-rectangle-row">
                        <div className="item-rating-address">
                            <Rate className="rating" disabled value={getRating()}/>
                            {
                                center.locations.length > 0 &&
                                <div className="center-address" onClick={() => {
                                    setVisible(true)
                                }}>
                                    <EnvironmentFilled
                                        className="address-icon"/>
                                    {
                                        center.locations.length === 1 ?
                                            <span className="oneAddress"> {center.locations[0].address}</span>
                                            :
                                            <Popover
                                                className="popover"
                                                title="Локації"
                                                placement="topRight"
                                                content={
                                                    center.locations.map(location =>
                                                        <div>
                                                            <EnvironmentFilled className="address-small-icon"/>
                                                            <span className="text"> {location.address}</span>
                                                        </div>
                                                    )
                                                }
                                            >
                                            <span className="text" style={{display: "flex", alignItems: "center"}}>
                                                <span className="oneAddress">
                                                    {center.locations[0].address}
                                                </span>
                                                , і ще {center.locations.length - 1}
                                            </span>
                                            </Popover>
                                    }
                                </div>
                            }
                        </div>
                        <Button className="outlined-button details-button" href={`/center/${center.id}`}>
                            <Link to={`/center/${center.id}`}>Детальніше</Link>
                        </Button>
                    </div>
                </Card>
                <ClubItemMap club={center} visible={visible} setVisible={setVisible}/>
            </div>
        </ConfigProvider>
    )
};
CenterListRectangleItem.propTypes = {
    center: PropTypes.object.isRequired
};

export default CenterListRectangleItem;