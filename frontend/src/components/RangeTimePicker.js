import React, {useEffect, useState} from "react";
import {TimePicker} from "antd";



const RangeTimePicker = ({visible,onOk,initialValue}) => {
    const [start, setStart] = useState(initialValue ? initialValue[0] :"");
    const [end, setEnd] = useState(initialValue ? initialValue[1] :"");
    const [showResult,setShowResult]=React.useState(false)

    const { RangePicker } = TimePicker;

    useEffect(()=>{
        setShowResult(visible)
    })

    const handleRange = (timeRangeUTC, timeRangeLocal) => {

        if(timeRangeUTC) {

            setStart(timeRangeUTC[0]);
            setEnd(timeRangeUTC[1]);
        }
        if(timeRangeUTC==null) {
            setStart(null);
            setEnd(null);
            onOk();
        }
    };
    return (showResult ? <RangePicker style={{width: "13em", margin:"0 1rem"}}

        showTime={{ format: "HH:mm" }}
        format="HH:mm"
        value={[start, end]!=="" ? [start, end]:initialValue}
        onChange={handleRange}
        placeholder={["HH:mm", "HH:mm"]}
        onOk={onOk}/> : null
    )
};

export default RangeTimePicker;