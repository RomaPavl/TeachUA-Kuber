import React from "react";
import './css/PageSider.css';
import PropTypes from 'prop-types';
import Sider from "antd/es/layout/Sider";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {getSimilarClubsByCategoryName} from "../../../service/ClubService";
import ContactsInfoUtil from "../../../util/ContactsInfoUtil";
import SimilarClubs from "./SimilarClubs";
import ClubLocation from "./ClubLocaton";
import {ConfigProvider} from "antd";
import dayjs from "dayjs";

class PageSider extends React.Component {
    state = {
        similarClubs: []
    };

    getData = () => {
        const categoriesName = Array.from(this.props.club.categories, category => category.name);

        getSimilarClubsByCategoryName(this.props.club.id, categoriesName, this.props.cityName).then(response => {
            this.setState({similarClubs: response});
        });

    };


    transformDay = (day) => {
        switch (day) {
            case "MONDAY":
               return "Понеділок";
            case "TUESDAY":
                return "Вівторок";
            case "WEDNESDAY":
                return "Середа";
            case "THURSDAY":
               return "Четвер";
            case "FRIDAY":
               return "П'ятниця";
            case "SATURDAY":
               return "Субота";
            case "SUNDAY":
               return "Неділя";
        }
    }


    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }

    componentDidUpdate(preProps) {
        if (preProps.club.id !== this.props.club.id) {
            this.getData();
        }
    }

    checkLocation = (locations) => {
        for (var i = 0; i < locations.length; ++i) {
            if (locations[i].latitude == null || locations[i].longitude == null) {
                return false;
            }
        }

        if (locations.length === 0) {
            return false;
        }

        return true;
    }

    render() {
        return (
                <Sider className="page-sider" width={364}>
                    {this.props.club.locations.length === 0 ?
                        <div className="address">
                            <EnvironmentFilled
                                className="address-icon"/>
                            <span className="text">Онлайн</span>
                        </div>
                        :
                        this.props.club.locations.map(location =>
                            <div className="address">
                                <EnvironmentFilled className="address-icon"/>
                                <span className="text"> {location.address}</span>
                                <br></br>
                            </div>
                        )
                    }
                    {this.checkLocation(this.props.club.locations) &&
                        <div className="map">
                            <ClubLocation locations={this.props.club.locations}/>
                        </div>
                    }
                    <div className="age">
                        <span className="sider-label">Вік аудиторії: </span>
                        <span className="years">від {this.props.club.ageFrom} до {this.props.club.ageTo} років</span>
                    </div>
                    <div className="work-time">
                    {this.props.club.workTimes.length!==0 ? <div>
                        <br/>
                        <span className="sider-label">Графік роботи: </span>
                        <br/>
                        { this.props.club.workTimes.map(dayTime =>

                            <div className="day-time">
                                <span className="text"> {this.transformDay(dayTime.day)} : { dayjs(dayTime.startTime).format('HH:mm')} - {  dayjs(dayTime.endTime).format('HH:mm')}</span>

                            </div>)
                        }
                        <br/></div>: ""}
                    </div>
                    {this.props.club.center &&
                        <div className="center">
                            <span className="sider-label">Центр розвитку: </span>
                            <span className="name">{this.props.club.center.name}</span>
                        </div>}
                    <ContactsInfoUtil label="Зв’яжіться з гуртком" contacts={this.props.club.contacts}/>
                    <SimilarClubs cityName={this.props.cityName} similarClubs={this.state.similarClubs}/>
                </Sider>
        )
    }
}

PageSider.propTypes = {
    club: PropTypes.object.isRequired
};

export default PageSider;