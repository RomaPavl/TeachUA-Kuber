import {React, useState} from "react";
import PropTypes from 'prop-types';
import {Content} from "antd/es/layout/layout";
import './css/PageContentCenter.css';
import {Button, ConfigProvider} from "antd";
import {convertToHtml} from "../../editor/EditorConverter";
import {getClubReport} from "../../../service/ClubService";
import {FilePdfOutlined} from "@ant-design/icons";
import {getCenterReport, getAllCenterClubsByCenterId} from "../../../service/CenterService";
import PageRatingCenter from "./PageRatingCenter";

const CenterPageContent = ({center, loading}) => {

    return (
        <Content className="page-content">
            <PageRatingCenter rating={center.rating} count={center.feedbackCount}/>
            {!center ?
                <div className="content">У цього центру опису немає...</div>
                :
                loading ? <div className="empty-block"/> :
                    <div className="content">
                        {center.description}
                    </div>}
            <div className="full-width button-box">
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimaryHover: '#FFA940',
                            }
                        }
                    }}>
                    <Button onClick={() => getCenterReport(center.id, center.name)}
                            className="outlined-button details-button">
                        Завантажити
                        <FilePdfOutlined/>
                    </Button>
                </ConfigProvider>
            </div>
        </Content>

    )
};

CenterPageContent.propTypes = {
    //center: PropTypes.object.isRequired
};

export default CenterPageContent;
