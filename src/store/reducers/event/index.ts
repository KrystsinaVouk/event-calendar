import { EventAction, EventActionEnum, IEventState } from "./types";

const initialState: IEventState = {
    guests: [],
    events: [],
};

export default function authReducer(
    state = initialState,
    action: EventAction
): IEventState {
    switch (action.type) {
        case EventActionEnum.SET_EVENTS:
            return { ...state, events: action.payload };
        case EventActionEnum.SET_GUESTS:
            return { ...state, guests: action.payload };
        default:
            return state;
    }
}
