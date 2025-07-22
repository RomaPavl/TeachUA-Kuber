import {Checkbox, DatePicker, Form, Input, InputNumber, Select, Upload} from "antd";
import React from "react";
import './css/EditableColumn.css';
import {UPLOAD_IMAGE_URL} from "../../service/config/ApiConfig";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import {tokenToHeader} from "../../service/UploadService";
import moment from "moment";

const { TextArea } = Input;
function getValueByPath(obj, path) {
    if (!path || typeof path !== 'string') return undefined;

    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

const EditableColumn = ({editing, dataIndex, title, inputType, selectData, uploadFolder, record, index, children,
                            updateRecord, ...restProps}) => {
    let inputNode;
    switch (inputType) {
        case 'upload':
            inputNode = <Upload
                name="image"
                action={UPLOAD_IMAGE_URL}
                maxCount={1}
                accept="image/*"
                data={{folder: uploadFolder}}
                headers={{contentType: 'multipart/form-data', Authorization: tokenToHeader()}}
            >
                <span className="upload"><UploadOutlined className="icon"/>Завантажити</span>
            </Upload>;
            break;
        case 'textarea':
            inputNode = <TextArea rows={4}
                                  placeholder="Текст"/>;
            break;
        case 'number':
            inputNode = <InputNumber/>;
            break;
        case 'select': {
            inputNode = (
                <Select style={{minWidth: `80px`, width: `fit-content`, textAlign: `left`}}>
                    {selectData.map(option => (
                        <Select.Option key={option.value} value={option.value}>
                            {option.label}
                        </Select.Option>
                    ))}
                </Select>
            );
            break;
        }
        case 'color': {
            inputNode = <Input type="color" />
            break;
        }
        case 'checkbox':
            inputNode = (
                <Checkbox className="checkbox-record"/>
            );
            break;
        case 'text':
            inputNode = <Input/>;
            break;
        case 'date':
            inputNode = <DatePicker format="DD.MM.YYYY" />;
            break;
        default: {
            inputNode = <Input/>;
            break;
        }
    }

    return (
        <td {...restProps}>
            {editing ? (
                inputType === 'checkbox' ? (
                    <Form.Item
                        name={dataIndex}
                        initialValue={record[dataIndex]}
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: `Заповніть поле ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : inputType === 'select' ? (
                    <Form.Item
                        name={dataIndex}
                        value={record[dataIndex]}
                        rules={[
                            {
                                required: true,
                                message: `Заповніть поле ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) :    inputType === 'date' ? (
                    <Form.Item
                        name={dataIndex}
                        rules={[
                            {
                                required: true,
                                message: `Заповніть поле ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    <Form.Item
                        name={dataIndex}
                        initialValue={getValueByPath(record, dataIndex)}
                        rules={[
                            {
                                required: true,
                                message: `Заповніть поле ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                )
            ) : (
                children
            )}
        </td>
    );
};

export default EditableColumn;