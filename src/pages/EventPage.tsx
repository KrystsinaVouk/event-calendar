import React, { FC, useEffect, useState } from "react";
import { Button, Layout, Modal, Row } from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

const EventPage: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { fetchGuests, fetchEvents, createEvent } = useActions();
    const { guests, events } = useTypedSelector((state) => state.event);
    const { user } = useTypedSelector((state) => state.auth);

    useEffect(() => {
        fetchGuests();
        if (user) fetchEvents(user.username);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addNewEvent = (event: IEvent) => {
        createEvent(event);
        setModalVisible(false);
    };

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify={"center"}>
                <Button onClick={() => setModalVisible(true)}>Add Event</Button>
            </Row>
            <Modal
                style={{ top: 20 }}
                title={"Add event"}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm submit={addNewEvent} guests={guests} />
            </Modal>
        </Layout>
    );
};

export default EventPage;
