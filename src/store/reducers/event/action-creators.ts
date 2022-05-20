import {IUser} from "../../../models/IUser";
import {EventActionEnum, ISetEventsAction, ISetGuestsAction} from "./types";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setGuests: (guests: IUser[]): ISetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
    setEvents: (events: IEvent[]): ISetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const {data} = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(data))
        } catch (err) {
            console.error(err);
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || `[]`;
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem(`events`, JSON.stringify(json));
        } catch (err) {
            console.error(err);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem(`events`) || `[]`;
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(currentUserEvent => (
                currentUserEvent.author === username || currentUserEvent.guest === username
            ));
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (err) {
            console.error(err);
        }
    }
}