import {
	CHAT_GET_CONTACTS,
	CHAT_GET_CONTACTS_SUCCESS,
	CHAT_GET_CONTACTS_ERROR,
	CHAT_GET_CONVERSATIONS,
	CHAT_GET_CONVERSATIONS_SUCCESS,
	CHAT_GET_CONVERSATIONS_ERROR,
	CHAT_ADD_MESSAGE_TO_CONVERSATION,
	CHAT_CHANGE_CONVERSATION,
	CHAT_ADD_MESSAGE_SUCCESS
} from '../actions';

const INIT_STATE = {
	contacts: null,
	conversations: null,
	error: '',
	loadingContacts: false,
	loadingConversations: false,
	currentUser: null,
	selectedUser: null
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case CHAT_GET_CONTACTS:
			return { ...state, loadingContacts: true };

		case CHAT_GET_CONTACTS_SUCCESS:
			return { ...state, loadingContacts: false, contacts: action.payload.contacts, currentUser: action.payload.currentUser };

		case CHAT_GET_CONTACTS_ERROR:
			return { ...state, loadingContacts: false, error: action.payload };


		case CHAT_GET_CONVERSATIONS:
			return { ...state, loadingConversations: true };

		case CHAT_GET_CONVERSATIONS_SUCCESS:
			return {
				...state,
				loadingConversations: false,
				conversations: action.payload
			};

		case CHAT_GET_CONVERSATIONS_ERROR:
			return { ...state, loadingConversations: false, error: action.payload };

		case CHAT_CHANGE_CONVERSATION:
			return { ...state, selectedUser: state.contacts.find(x => x.id === action.payload) };


		case CHAT_ADD_MESSAGE_TO_CONVERSATION:
			return { ...state };

		case CHAT_ADD_MESSAGE_SUCCESS:
			return {
				...state,
			}

		default: return { ...state };
	}
}
