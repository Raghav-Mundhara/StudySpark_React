import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Input, Textarea } from '@nextui-org/react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: auto;
    align-items: center;
    justify-content: center;
    background-color: black;
`;

const StyledInput = styled(Input)`
    margin-bottom: 10px;
    width: 300px; /* Adjust the value as needed */
`;

const StyledTextarea = styled(Textarea)`
    margin-bottom: 10px;
    width: 300px; /* Adjust the value as needed */
`;

const DeadlineContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* Adjust the value to add vertical spacing */
`;

const DeadlineLabel = styled.label`
    color: white;
    margin-right: 25px; /* Adjust the value to add horizontal spacing between label and date picker */
`;

function PostJob() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Container>
            <form>
                <StyledInput
                    isRequired
                    label="Job Title"
                    className="max-w-xs"
                />
                <StyledTextarea
                    isRequired
                    label="Description"
                    placeholder="Enter your description"
                    className="max-w-xs"
                />
                <StyledInput
                    isRequired
                    label="Skills Required"
                    className="max-w-xs"
                />
                <StyledInput
                    isRequired
                    label="Budget"
                    className="max-w-xs"
                    type="number"
                />
                <DeadlineContainer>
                    <DeadlineLabel>Deadline</DeadlineLabel>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        className="max-w-xs"
                        required
                    />
                </DeadlineContainer>
                
            </form>
        </Container>
    );
}

export default PostJob;
