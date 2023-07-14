import React from 'react';
import {
    CardWrapper,
    DoctorImg,
    DoctorInfo,
    ImgBox,
    Media,
    DoctorName,
    SocialWapper,
    DoctorDesc,
    DoctorPosition
} from './DoctorCard.Style';

function DoctorCard({
    variant,
    cardType,
    socialMedia,
    path,
    imgPath,
    imgAlt,
    drDesc,
    drName,
    drPost }) {
    return (
        <CardWrapper variant={variant} as={cardType} to={path}>
            <ImgBox>
                <DoctorImg src={imgPath} alt={imgAlt} />
            </ImgBox>
            <DoctorInfo>
                <DoctorName>{drName}</DoctorName>
                <DoctorPosition>{drPost}</DoctorPosition>
                <DoctorDesc>{drDesc}</DoctorDesc>
                <SocialWapper>
                    {
                        Array.isArray(socialMedia) && socialMedia.length > 0 &&
                        socialMedia.map((media, ind) => {
                            return (
                                <Media key={'media' + ind}>{media}</Media>
                            )
                        })
                    }
                </SocialWapper>
            </DoctorInfo>
        </CardWrapper>
    );
}

export default DoctorCard;