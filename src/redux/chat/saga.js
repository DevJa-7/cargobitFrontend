import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getCurrentTime } from "../../helpers/Utils";
import moment from 'moment'
import api from '../../services/api'
import {
  CHAT_GET_CONTACTS,
  CHAT_GET_CONVERSATIONS,
  CHAT_ADD_MESSAGE_TO_CONVERSATION,
  CHAT_CREATE_CONVERSATION
} from "../actions";

import {
  getContactsSuccess,
  getContactsError,
  addMessageSuccess
} from "./actions";

import contactsData from "../../data/chat.contacts.json";

import { database } from '../../helpers/Firebase'
const FIREBASE_REF_MESSAGES_LIMIT = 20

function* loadContacts() {
  try {
    const response = yield call(loadContactsAsync);
    const { contacts, currentUser } = response;
    console.log('contacts', contacts);
    yield put(getContactsSuccess(contacts, currentUser));
  } catch (error) {
    yield put(getContactsError(error));
  }
}


const loadContactsAsync = async () => {
  //const contacts = contactsData.data;
  return await new Promise((success, fail) => {
    api.getUsers((err, res) => {
      const contacts = res['rows'];
      const userdata = localStorage.currentUser?JSON.parse(localStorage.currentUser):null
      const currentUser = userdata['admin'];

      success({ contacts, currentUser })
    });
  })
    .then(response => response)
    .catch(error => error);
};

function* addMessageToConversation({ payload }) {
  try {
    const {
      currentUserId,
      selectedUserId,
      message,
    } = payload;

    yield call(
      addMessageToConversationAsync,
      currentUserId,
      selectedUserId,
      message,
    );
    yield put(addMessageSuccess());
  } catch (error) {
    console.log('----')
  }
}
const addMessageToConversationAsync = async (
  currentUserId,
  selectedUserId,
  message
) => {
  const time = getCurrentTime();
  const chatMessage = {
    sender: currentUserId,
    time,
    text: message
  }
  const channelName = currentUserId + '-' + selectedUserId;
  const FIREBASE_REF_MESSAGES = database.ref('message/' + channelName)

  const channelInfo = FIREBASE_REF_MESSAGES.child('channelInfo')
  channelInfo.once('value').then((res) => {
    let total = res.val() && res.val().total || 0
    channelInfo.child('total').set(total + 1)
    channelInfo.child('date').set(moment().format('MMM DD, hh:mm A'))
    channelInfo.child(currentUserId).set(total + 1)
    channelInfo.child('lastMessage').set(message)
  })

  return await new Promise((success, fail) => {
    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        fail(error.message)
      } else {
        success()
      }
    })
  })
    .then(response => response)
    .catch(error => error);
};


export function* watchGetContact() {
  yield takeEvery(CHAT_GET_CONTACTS, loadContacts);
}
// export function* watchGetConversation() {
//   yield takeEvery(CHAT_GET_CONVERSATIONS, loadConversations);
// }
export function* watchAddMessageToConversation() {
  yield takeEvery(CHAT_ADD_MESSAGE_TO_CONVERSATION, addMessageToConversation);
}


export default function* rootSaga() {
  yield all([
    fork(watchGetContact),
    // fork(watchGetConversation),
    fork(watchAddMessageToConversation)
  ]);
}
