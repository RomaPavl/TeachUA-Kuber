import React from 'react';
import {Layout} from "antd";
import ClubsOfCenterContent from "./ClubsOfCenterContent";
import "./css/ClubsItemStyles.css"


const ClubsOfCenter = ({clubs,setClickedClub, setClubInfoVisible, centerId, clubsPerPage}) =>{

    const onClubClick = (club) => {
        setClickedClub(club);
        setClubInfoVisible(true);
    };

    return (
        !clubs ?
            <div className="empty-list-of-clubs"/>  :

            <Layout className="club-list" >

                <span className="title" style={{fontSize:18}}>
                    Гуртки центру
                </span>
                <ClubsOfCenterContent centerId={centerId} clubsPerPage={clubsPerPage}/>

                {/* <div className="display-content"> // variant without pagination
                    {clubs.map( club => (
                            <ClubListItem club={club} onClubClick={onClubClick} key={club.id}/>
                    ))}
                </div> */}

            </Layout>

    );
}

export default ClubsOfCenter;