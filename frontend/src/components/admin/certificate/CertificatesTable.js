import React, {useEffect, useState} from "react";

import {getSentCertificates, updateCertificateProfile} from "../../../service/CertificateService";
import {editCellValueForCertificates} from "../../../util/TableUtil";
import './css/CertificatesTable.css';
import {Form, message, Typography, Input} from "antd";
import EditableTable from "../../EditableTable";
import dayjs from 'dayjs';

const {Title} = Typography;

const CertificatesTable = () => {

    const [form] = Form.useForm();
    const [certificates, setCertificates] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    const keys = ["id","serialNumber","userName","sendToEmail"];

    const getData = () => {
        getSentCertificates().then(response => {
            setCertificates(response);
            console.log(response);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const actions = () => [
    ];

    const search = (data) => {
        return data.filter( (item) =>
            keys.some((key) => String(item[key]).toLowerCase().includes(searchedText.toLowerCase())) ||
            String(item.dates.date).includes(searchedText)
        );
    };

    const save = async (record) => {
        const values = form.getFieldsValue();
        const currentDates = record.dates || {};

        if (values['dates.date'] || values['dates.duration']) {
            if (values['dates.date']) {
                currentDates.date = values['dates.date'].format("DD.MM.YYYY");
            }
            if (values['dates.duration']) {
                currentDates.duration = values['dates.duration'];
            }

            values.dates = currentDates;

            const {'dates.date': _, 'dates.duration': __, ...rest} = values;
            form.setFieldsValue(rest);

            editCellValueForCertificates(rest, certificates, record.id)
                .then((editedData) => {
                    updateCertificateProfile(record.id, editedData.item)
                        .then(response => {
                            if (response.status) {
                                message.warning(response.message);
                                return;
                            }
                            getData();
                        });
                });
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            editable: false,
            render: (id) => id,
            // render: (text, record) => <Link to={'/admin/challenge/' + record.id}>{record.id}</Link>
        },
        {
            title: 'Учасник',
            dataIndex: 'userName',
            width: '18%',
            editable: true,
            render: (userName) => userName
        },
        {
            title: 'Електронна пошта',
            dataIndex: 'sendToEmail',
            width: '15%',
            editable: true,
            render: (sendToEmail) => sendToEmail
        },
        {
            title: 'Серійний номер',
            dataIndex: 'serialNumber',
            width: '10%',
            editable: false,
            render: (serialNumber) => serialNumber != null ? serialNumber : "-"
        },
        {
            title: 'Дата відправки',
            dataIndex: 'updateStatus',
            width: '9%',
            editable: false,
            render: (date) => date != null ? dayjs(date.toString()).format('DD.MM.YYYY') : "-"
        },
        {
            title: 'Дата видачі',
            dataIndex: 'dates.date',
            inputType: 'date',
            width: '9%',
            editable: true,
            render: (text, record) => record.dates.date
        },
        {
            title: 'Тривалість навчання',
            dataIndex: 'dates.duration',
            width: '18%',
            editable: true,
            render: (text, record) => record.dates.duration
        },
        {
            title: 'Статус видачі',
            dataIndex: 'sendStatus',
            inputType: 'select',
            selectData: [{ value: 'не видано', label: 'не видано' }],
            width: '8%',
            editable: true,
            render: (sendStatus) => sendStatus ? "видано" : sendStatus == null ? "не видано" : "помилка відправки",
            filters:[
                {text:'видано',value:'true'},
                {text:'не видано',value:'null'},
                {text:'помилка відправки',value:'false'},
            ],
            onFilter: (value, record) =>  {
                return String(record.sendStatus).includes(String(value));
            },
        }
    ];

    return (
        <div className="certificatesContent">
            <Input.Search
            placeholder="Пошук по сертифікатах"
            onSearch={(value)=>{
                setSearchedText(value);
            }}
            style={{
                width: 500,
            }}
            />
            <Title level={3}>Сертифікати</Title>
            <EditableTable bordered
                           columns={columns}
                           data={search(certificates)}
                           form={form}
                           onSave={save}
                           actions={actions}
            >
            </EditableTable>
        </div>
    )

}

export default CertificatesTable;
