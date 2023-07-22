import React from 'react';
import { styled } from 'styled-components';
import SadIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const ErrorWrapper = styled.div``
const ErrorText = styled.h1`
    color: #cccccc
`

function ErrorMsg({ text, ...rest }) {
    return (
        <ErrorWrapper {...rest} className='d-flex align-items-center justify-content-center'>
            <ErrorText className='mb-0'>
                <SadIcon style={{ fontSize: '45px', verticalAlign: 'sub' }} />{text}
            </ErrorText>
        </ErrorWrapper>
    );
}

export default ErrorMsg;