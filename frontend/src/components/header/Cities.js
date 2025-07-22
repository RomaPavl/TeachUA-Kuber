import React from "react";
import {Dropdown, Menu} from "antd";
import EnvironmentFilled from "@ant-design/icons/lib/icons/EnvironmentFilled";
import {mapSearchParameters, searchParameters} from "../../context/SearchContext";
import CaretDownFilled from "@ant-design/icons/lib/icons/CaretDownFilled";
import {getAllCities} from "../../service/CityService";
import {getClubsByParameters} from "../../service/ClubService";
import {withRouter} from "react-router-dom";
import './css/authMenu.css';

class Cities extends React.Component {
    state = {
        cities: []
    };

    getData = () => {
        getAllCities().then(response => this.setState({cities: response}));
    };

    componentDidMount() {
        this.getData();
    }

    onCityChange = (value) => {
        if (!searchParameters.isAdvancedSearch) {
            searchParameters.cityName = value.key === "online" ? "Без локації" : value.key;
            mapSearchParameters.cityName = value.key;
            searchParameters.isOnline = value.key === "online" && true;
            getClubsByParameters(searchParameters).then(response => this.props.setClubs(response));

            if(this.props.location.pathname !== "/clubs") {
                this.props.history.push("/clubs");
            }
        }
    };

    render() {
        const cityList = (
            <Menu onClick={this.onCityChange}>
                {this.state.cities.map(city => (<Menu.Item key={city.name}>{city.name}</Menu.Item>))}
                <Menu.Item key="online">Без локації</Menu.Item>
            </Menu>
        );

        if (!searchParameters.isAdvancedSearch) {
            return (
                <Dropdown
                    overlay={cityList}
                    className="city"
                    placement="bottom"
                    arrow
                    trigger="click"
                >
                    <div>
                        <EnvironmentFilled className="icon" /> {searchParameters.cityName}
                        <CaretDownFilled />
                    </div>
                </Dropdown>
            );
        }

        return null;
    }
}

export default withRouter(Cities);

