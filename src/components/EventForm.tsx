import React, { FC, useState } from "react";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface IEventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<IEventFormProps> = ({ guests, submit }) => {
    const { Option } = Select;
    const [event, setEvent] = useState<IEvent>({
        author: "",
        date: "",
        description: "",
        guest: "",
    } as IEvent);

    const { user } = useTypedSelector((state) => state.auth);

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) });
        }
    };
    const submitEvent = () => {
        if (user) {
            submit({ ...event, author: user.username });
        }
    };

    return (
        <Form onFinish={submitEvent}>
            <Form.Item
                label="Description of event"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={(e) =>
                        setEvent({ ...event, description: e.target.value })
                    }
                />
            </Form.Item>
            <Form.Item
                label="Date of event"
                name="eventDate"
                rules={[
                    rules.required(),
                    rules.isDateAfter(
                        "Creating event for the past date is not possible"
                    ),
                ]}
            >
                <DatePicker onChange={(date) => selectDate(date)} />
            </Form.Item>
            <Form.Item
                label="Add guests"
                name="addGuests"
                rules={[rules.required()]}
            >
                <Select
                    onChange={(guest: string) => setEvent({ ...event, guest })}
                >
                    {guests.map((guest) => (
                        <Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify={"end"}>
                <Button type={"primary"} htmlType={"submit"}>
                    Create event
                </Button>
            </Row>
        </Form>
    );
};

export default EventForm;
