import io from 'socket.io-client'
import { userService } from './user.service'
import { utilService } from './util.service'

export const SOCKET_EVENT_ADD_MSG = 'chat-add-msg'
export const SOCKET_EMIT_SEND_MSG = 'chat-send-msg'

export const SOCKET_EMIT_ORDER_ADD = 'order-add'
export const SOCKET_EVENT_ORDER_ADD = 'order-added'

export const SOCKET_EMIT_ORDER_STATUS = 'order-status'
export const SOCKET_EVENT_ORDER_STATUS = 'order-status-changed'

export const SOCKET_EMIT_USER_UPDATE = 'user-update'
export const SOCKET_EVENT_USER_UPDATED = 'user-updated'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      data = utilService.deepCopy(data)
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    }
  }

  return socketService
}
