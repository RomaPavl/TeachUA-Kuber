import React, {useState} from 'react';
import {Button, ConfigProvider, Layout, Modal, Popover} from 'antd';
import "../clubList/css/ClubInfo.css"
import {Link} from "react-router-dom";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import ContactsInfoUtil from '../../util/ContactsInfoUtil';
import ImageCarousel from '../ImageCarousel';
import CenterLogo from "./CenterLogo";
import "./css/CenterInfo.css"
import PageRatingCenter from "../centerPage/content/PageRatingCenter";
import {getCenterReport} from "../../service/CenterService";
import {FilePdfOutlined} from "@ant-design/icons";
import ClubsOfCenter from '../centerPage/clubsOfCenter/ClubsOfCenter';

const CenterListItemInfo = ({visible, setVisible, center}) => {
    const images = [
        process.env.PUBLIC_URL + "/static/images/clubs_carousel_tmp/kids_jump.png",
        process.env.PUBLIC_URL + "/static/images/clubs_carousel_tmp/balls.jpg",
        process.env.PUBLIC_URL + "/static/images/clubs_carousel_tmp/exercise.jpg",
        process.env.PUBLIC_URL + "/static/images/clubs_carousel_tmp/pencils.jpg",
    ];
    const [club, setClickedClub] = useState(false);
    const [clubInfoVisible, setClubInfoVisible] = useState(false);
    const centerId = center.id;
    const clubsPerPage = 2; // size of pagination

    return (
        <Modal
            centered
            open={visible}
            onCancel={() => {
                setVisible(false);
            }
            }
            width={900}
            footer={null}
            className='centerInfo'
        >
            <div className="container">
                <div className="title">
                    <CenterLogo urlLogo={center.urlLogo}/>
                    <div className="center-name">{center.name}</div>
                </div>
                <div className="rating">
                    {/* <span className="feedback">{3} відгуків</span> */}
                    <PageRatingCenter rating={center.rating} count={center.feedbackCount}/>
                </div>
                {center.locations[0] ?
                    <div className="address">
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
                                    content={center.locations.map(location =>
                                        <div>
                                            <EnvironmentFilled className="address-small-icon"/>
                                            <span className="text"> {location.address}</span>
                                        </div>
                                    )}>
                                    <span className="text" style={{display: "flex", alignItems: "center"}}>
                                        <span className="oneAddress">
                                            {(center.locations[0]) ? center.locations[0].address : ""}
                                        </span>
                                        , і ще {center.locations.length - 1}
                                    </span>
                                </Popover>
                        }
                    </div> : <div></div>
                }
                <ContactsInfoUtil className="socialMedia" label="Контакти центру" contacts={center.contacts}/>
                <Button className="flooded-button more-button">
                    <Link to={`/center/${center.id}`}>Більше про центр</Link>
                </Button>
                <div className="about-club">
                    <span className="title">Про центр</span>
                    <ImageCarousel className="carousel" urls={images}/>
                    <div className="description">{center.description}</div>
                </div>
                <div style={{paddingTop: 20}}>
                    <Layout>
                        <ClubsOfCenter clubs={center.clubs}
                                       setClickedClub={setClickedClub}
                                       setClubInfoVisible={setClubInfoVisible}
                                       centerId={centerId}
                                       clubsPerPage={clubsPerPage}
                                       key={centerId}/>
                    </Layout>
                </div>
                <div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimaryHover: '#FFA940',
                                }
                            }
                        }}>
                        <Button onClick={() => getCenterReport(center.id, center.name)}
                                className="outlined-button details-button download-button">
                            Завантажити
                            <FilePdfOutlined/>
                        </Button>
                    </ConfigProvider>
                </div>
            </div>
        </Modal>
    )
};

export default CenterListItemInfo;