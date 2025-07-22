import {Button, Card, ConfigProvider, Popover, Rate} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {React, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Tags from "../Tags";
import ClubLogo from "../clubPage/header/ClubLogo";
import "./css/ClubListRectangleItem.css"
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import ClubItemMap from "./ClubItemMap";


const ClubListRectangleItem = ({club, onClubClick}) => {
    const [visible, setVisible] = useState(false);

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
            <Card className="card list-rectangle-item" key={club.name}>
                <div className="item-rectangle-row">
                    <div className="title" onClick={() => onClubClick(club)}>
                        <ClubLogo logo={club.urlLogo} category={club.categories[0]}/>
                        <div className="name">{club.name}</div>
                    </div>
                    {club.center !== null &&
                    <div className="with-center">
                        <div className="center">
                            <img className="center-logo" src={club.center.urlLogo} alt="Center logo"/>
                            <div className="center-description">
                                <span className="center-label">Центр розвитку</span>
                                <span className="center-name">{club.center.name}</span>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="club-tags-box">
                    <Tags categories={club.categories.filter((_, idx) => idx < 3)}/>
                    <span>{club.categories.length > 3 && `і ще ${club.categories.length - 3}...`}</span>
                </div>
                <div className="item-rectangle-row">
                    <div className="item-rating-address">
                        <Rate className="rating" disabled value={club.rating}/>
                        {
                            club.locations.length > 0 &&
                            <div className="address" onClick={() => {
                                setVisible(true)
                            }}>
                                <EnvironmentFilled
                                    className="address-icon" />
                                {
                                    club.locations.length === 1 ? <span className="oneAddress"> {club.locations[0].address}</span>
                                        :
                                        <Popover
                                            className="popover"
                                            title="Локації"
                                            placement="topRight"
                                            content={club.locations.map(location =>
                                                <div>
                                                    <EnvironmentFilled className="address-small-icon" />
                                                    <span className="text"> {location.address}</span>
                                                </div>
                                            )}>
                                            <span className="text"><span className="oneAddress"
                                            >{club.locations[0].address}</span>, і ще {club.locations.length - 1}</span>
                                            <EyeOutlined className="expand-icon" />
                                        </Popover>
                                }
                            </div>
                        }
                    </div>
                    <Button className="outlined-button details-button" href={`/club/${club.id}`}>
                        <Link to={`/club/${club.id}`}>Детальніше</Link>
                    </Button>
                </div>
            </Card>
            <ClubItemMap club={club} visible={visible} setVisible={setVisible}/>
        </div>
        </ConfigProvider>
    )
};
ClubListRectangleItem.propTypes = {
    club: PropTypes.object.isRequired
};


export default ClubListRectangleItem;