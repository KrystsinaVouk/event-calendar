import React, {FC} from 'react';
import {IEvent} from "../models/IEvent";
import {Calendar} from "antd";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    function dateCellRender(value: Moment) {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter((curDayEvent: IEvent) => (
            curDayEvent.date === formattedDate
        ))
        return (
            <div>
                {currentDayEvents.map((curDayEvent, index) => (
                    <div key={index}>{curDayEvent.description}</div>
                ))}
            </div>
        )
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;