import React from 'react';
import { Radio } from 'antd';

const Title = ({ isAll, setIsAll }) => (
    <div className="contentTitle">
        <div className="titleText">
            {isAll ? "Заявки на реєстрацію" : "Заявки на розгляді"}
        </div>
        <Radio.Group className="radioGroup" onChange={e => setIsAll(e.target.value)} value={isAll}>
            <Radio className="radioItem" value={true}>Всі</Radio>
            <Radio className="radioItem" value={false}>Не підтверджені</Radio>
        </Radio.Group>
    </div>
);

export default Title;