import React, {useState} from "react";
import {Button, Tooltip} from "antd";
import SignUpForChallenge from "./register/SignUpForChallenge";
import {getRole} from "../../service/StorageService";
import PropTypes from "prop-types";
import "./css/ChallengeSignUp.css"
const ChallengeSignUp = ({challenge}) => {
    const [signUpForChallengeVisible, setSignUpForChallengeVisible] = useState(false);
    const role = getRole();
    return (
        <div className="full-width button-box">
            <Tooltip
                title={role !== 'ROLE_USER' ? "Ця функціональність доступна тільки користувачу" : ""}
                color={role !== 'ROLE_USER' ? "#FFA940" : ""}
            >
                <Button
                    className="flooded-button apply-button"
                    onClick={() => {
                        if (role === 'ROLE_USER') {
                            setSignUpForChallengeVisible(true);
                        }
                    }}
                    disabled={role !== 'ROLE_USER'}
                >
                    Записатись на челендж
                </Button>

                <SignUpForChallenge isShowing={signUpForChallengeVisible}
                                    setShowing={setSignUpForChallengeVisible}
                                    challenge={challenge}
                />
            </Tooltip>
        </div>
    )
}
ChallengeSignUp.propTypes = {
    challenge: PropTypes.object.isRequired
};
export default ChallengeSignUp;