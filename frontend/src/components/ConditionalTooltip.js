import {Tooltip} from "antd";

const ConditionalTooltip = ({ condition, title, children, color = "#FFA940" }) => {
    if (condition) {
        return (
            <Tooltip title={title} color={color}>
                {children}
            </Tooltip>
        );
    } else {
        return children;
    }
};

export default ConditionalTooltip;