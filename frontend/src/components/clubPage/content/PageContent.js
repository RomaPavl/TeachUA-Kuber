import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContent.css';
import {Button, ConfigProvider} from "antd";
import ImageCarousel from "../../ImageCarousel";
import PageRating from "./PageRating";
import {getShortContent} from "../../editor/EditorConverter";
import {BASE_URL} from "../../../service/config/ApiConfig";
import {getClubReport} from "../../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import SignUpForClub from "../register/SignUpForClub";
import { getRole } from "../../../service/StorageService"
import ConditionalTooltip from "../../ConditionalTooltip";

const PageContent = ({club}) => {
    const images = club.urlGallery.map(image => BASE_URL + image.url);
    const [signUpForClubVisible, setSignUpForClubVisible] = useState(false);
    const role = getRole();

    return (
        <Content className="page-content">
            <PageRating rating={club.rating || 0} count={club.feedbackCount || 0}/>
            {images.length > 0 &&
                <ImageCarousel className="carousel" urls={images}/>
            }
            {!club.description ?
                <div className="content">У цього гуртка опису немає...</div>
                :
                <div className="content">
                    {getShortContent(club.description)}
                </div>
            }

            <div className="full-width button-box">
                <ConditionalTooltip
                    condition={role !== 'ROLE_USER'}
                    title={"Ця функціональність доступна тільки користувачу"}
                >
                    <Button
                        className="flooded-button apply-button"
                        onClick={() => {
                            if (role === 'ROLE_USER') {
                                setSignUpForClubVisible(true);
                            }
                        }}
                        disabled={role !== 'ROLE_USER'}
                    >
                        Записатись на гурток
                    </Button>

                <SignUpForClub isShowing={signUpForClubVisible}
                               setShowing={setSignUpForClubVisible}
                               club={club}
                />
            </ConditionalTooltip>
            </div>

            <div className="full-width button-box">
                <ConfigProvider
                    theme={{
                        components:{
                            Button:{
                                colorPrimaryHover: '#FFA940',
                            }
                        }
                    }}>
                <Button onClick={() => getClubReport(club.id, club.name)} className="outlined-button details-button">
                    Завантажити
                    <FilePdfOutlined/>
                </Button>
                </ConfigProvider>
            </div>
        </Content>
    )
};

PageContent.propTypes = {
    club: PropTypes.object.isRequired
};


export default PageContent;