import React, {useEffect, useState} from 'react';
import Layout from "antd/lib/layout/layout";
import "./css/VersionComponent.css";
import {getVersion} from "../../service/VersionService";
import { FRONTEND_COMMIT_NUMBER, FRONTEND_COMMIT_DATE } from "../../service/config/ApiConfig";


const VersionComponent = () => {

    const [version, setVersion] = useState([]);

    const getData = () => {
        getVersion().then(response => setVersion(response));
    };

    useEffect(() => {
        getData();
    }, [])

     return (
        <Layout className="serviceInUkr global-padding">
            <div className="lower-header-box about-header">
                <div className="city-name-box">
                    <h2 className="city-name">Ініціатива “Навчай українською”</h2>
                </div>
            </div>

            <div className="content">
                <div className="content-title">
                    Версія програми
                </div>
                <div className="content-text">
                    <table>
                        <tr>
                            <td align ="right"><b>Номер комміту бекенду:</b></td>
                            <td align ="left"><span className="tab">{version.backendCommitNumber}</span></td>
                        </tr>
                        <tr>
                            <td align ="right"><b>Дата комміту бекенду:</b></td>
                            <td align ="left"><span className="tab">{version.backendCommitDate}</span></td>
                        </tr>
                        <tr>
                            <td align ="right"><b>Номер комміту фронтенду:</b></td>
                            <td align ="left"><span className="tab">{FRONTEND_COMMIT_NUMBER}</span></td>
                        </tr>
                        <tr>
                            <td align ="right"><b>Дата комміту фронтенду:</b></td>
                            <td align ="left"><span className="tab">{FRONTEND_COMMIT_DATE}</span></td>
                        </tr>
                        <tr>
                            <td align ="right"><b>Дата складання:</b></td>
                            <td align ="left"><span className="tab">{version.buildDate}</span></td>
                        </tr>
                    </table>
                </div>
            </div>
           
        </Layout>
    )
}

export default VersionComponent;
