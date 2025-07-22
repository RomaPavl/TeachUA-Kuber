import AllClubRegistration from "../club/AllClubRegistration";
import UnapprovedClubRegistration from "../club/UnapprovedClubRegistration";
import {List, Spin} from "antd";
import {useCancelClubRegistration} from "../hooks/club/useCancelClubRegistration"
import {useApproveClubRegistration} from "../hooks/club/useApproveClubRegistration";
import {useCancelChallengeRegistration} from "../hooks/challenge/useCancelChallengeRegistration";
import {useApproveChallengeRegistration} from "../hooks/challenge/useApproveChallengeRegistration";
import AllChallengeRegistration from "../challenge/AllChallengeRegistration";
import UnapprovedChallengeRegistration from "../challenge/UnapprovedChallengeRegistration";

const RegistrationsList = ({
                               loading,
                               clubRegistrations,
                               setClubRegistrations,
                               updateClubRegistrations,
                               challengeRegistrations,
                               setChallengeRegistrations,
                               updateChallengeRegistrations,
                               displayedRegistrations,
                               isAll
                           }) => {
    const cancelClubRegistration = useCancelClubRegistration(clubRegistrations, setClubRegistrations);
    const cancelChallengeRegistration = useCancelChallengeRegistration(challengeRegistrations, setChallengeRegistrations);
    const approveClubRegistration = useApproveClubRegistration(clubRegistrations, setClubRegistrations)
    const approveChallengeRegistration = useApproveChallengeRegistration(challengeRegistrations, setChallengeRegistrations)
    return (
        <div className="registrations">
            {loading ? (
                <Spin size="large"/>
            ) : (
                <List
                    className="registrations"
                    itemLayout="horizontal"
                    split={false}
                    locale={{
                        emptyText: clubRegistrations.length === 0
                            ? <div className="noRegistrations">Всі заявки підтверджено</div>
                            : <div className="noRegistrations">Нічого не знайдено</div>
                    }}
                    dataSource={displayedRegistrations}
                    pagination={{hideOnSinglePage: true, defaultPageSize: 6, className: "user-content-pagination"}}
                    renderItem={(registration) => (
                        isAll
                            ? (registration.challenge ?
                                    <AllChallengeRegistration
                                        registration={registration}
                                        key={registration.id}
                                        approveRegistration={approveChallengeRegistration}
                                        cancelRegistration={cancelChallengeRegistration}
                                    /> :
                                    <AllClubRegistration
                                        registration={registration}
                                        key={registration.id}
                                        approveRegistration={approveClubRegistration}
                                        cancelRegistration={cancelClubRegistration}
                                    />
                            )
                            : (registration.challenge ?
                                    <UnapprovedChallengeRegistration
                                        registration={registration}
                                        key={registration.id}
                                        updateRegistrations={updateChallengeRegistrations}
                                    /> :
                                    <UnapprovedClubRegistration
                                        registration={registration}
                                        key={registration.id}
                                        updateRegistrations={updateClubRegistrations}
                                    />
                            )
                    )}
                />
            )}
        </div>
    );
};

export default RegistrationsList;