import {Form, Input, Select, Table} from "antd";
import React, {useEffect, useState} from "react";
import {getAllClubs} from "../../../../service/ClubService";
import ChangeOwnerFooter from "./ChangeOwnerFooter";
import './styles/ChangeOwnerTable.css'
import Title from "antd/es/typography/Title";
import {Option} from "antd/es/mentions";
import {getAllUsers} from "../../../../service/UserService";

const ChangeOwnerTable = () => {
    const [form] = Form.useForm();
    const [clubs, setClubs] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchedText, setSearchedText] = useState("");
    const [selectedOwnerId, setSelectedOwnerId] = useState(null);
    const [users, setUsers] = useState([]);

    const onChange = (value) => {
        setSelectedOwnerId(value);
    };

    const updateTable = () => {
        getAllClubs().then(response => setClubs(response));
    }

    const getUsers = () => {
        getAllUsers().then(response => setUsers(response));
    };

    const getData = () => {
        getAllClubs().then(response => {setClubs(response); console.log(response)});
    };

    useEffect(() => {
        getData();
        getUsers();
    }, []);

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    const search = (data) => {
        return data.filter( (club) =>
            String(club.id)
                .toLowerCase()
                .includes(searchedText.toLowerCase()) ||

            String(club.name)
                .toLowerCase()
                .includes(searchedText.toLowerCase()) ||

            String(club.user.lastName)
                .toLowerCase()
                .includes(searchedText.toLowerCase())
        );
    };

    const filterClubs = (data) => {
        return data.filter((club) => {
            const clubName = club.name.toLowerCase();
            const ownerId = club.user?.id;

            const nameMatch = clubName.includes(searchedText.toLowerCase());
            const ownerMatch = selectedOwnerId ? ownerId === selectedOwnerId : true;

            return nameMatch && ownerMatch;
        });
    };

    const searchResults = search(filterClubs(clubs));

    const getTableDataSource = () => {
        if (selectedOwnerId || searchedText !== '') {
            return searchResults;
        } else {
            return clubs;
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '10%',
            editable: false,
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            width: '40%',
            editable: false,
            defaultSortOrder: 'ascend',

        },
        {
            title: 'Власник',
            dataIndex: 'user',
            width: '20%',
            render: (user) => (
                <span>
                    {user && user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Без власника'}
                </span>
            ),
        },
        {
            title: 'Місто',
            dataIndex: 'locations',
            width: '20%',
            defaultSortOrder: 'ascend',
            render: (locations) => {
                const uniqueCityNamesSet = new Set(locations.map(location => location.cityName));
                const uniqueCityNamesArray = Array.from(uniqueCityNamesSet);
                return (
                    <>
                        {uniqueCityNamesArray.map(cityName => (
                            <span >
                                {cityName + ' '}
                            </span>
                        ))}
                    </>
                );
            },
        }
    ];

    return (
        <div className="push-down">
            <Title level={3}>Зміна власника гуртка</Title>
            <Select className="add-club-select" placeholder="Виберіть власника" allowClear onChange={onChange}>
                {users.map((user) => (
                    <Option value={user.id} key={user.id}>
                        {`${user.firstName} ${user.lastName}`}
                    </Option>
                ))}
            </Select>
            <Input.Search
                placeholder="Пошук по гуртках"
                onSearch={(value)=>{
                    setSearchedText(value);
                }}
                style={{
                    width: 500,
                    paddingLeft: 15,
                    paddingBottom: 15
                }}
            />
            {searchedText !== '' && searchResults.length === 0 ?
             <p className="no-results-message">За запитом "{searchedText}" завдань не знайдено.</p>
            : <>
                <Title level={4}>Оберіть гуртки</Title>
                <Table
                rowSelection={rowSelection}
                bordered
                className="city-table"
                columns={columns}
                dataSource={getTableDataSource()}
                form={form}
                rowKey={(record) => record.id}
                footer={() => (
                    <>
                    <Title level={4}>Оберіть нового власника</Title>
                    <ChangeOwnerFooter selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} updateTable={updateTable} />
                    </>
                )}
            /></>}
        </div>
    );
};

export default ChangeOwnerTable;