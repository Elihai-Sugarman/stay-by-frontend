import { userService } from '../services/user.service'
import { socketService, SOCKET_EMIT_USER_UPDATE } from '../services/socket.service'

export const userStore = {
    state: {
        loggedinUser: null
    },
    getters: {
        loggedinUser({ loggedinUser }) {
            return loggedinUser
        }
    },
    mutations: {
        setLoggedinUser(state, { user }) {
            state.loggedinUser = user ? { ...user } : null
        }
    },
    actions: {
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                socketService.login(user._id)
                console.log('User socket signed!')
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                socketService.login(user._id)
                console.log('User socket signed!')
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                socketService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({ type: 'setLoggedinUser', user })
                socketService.emit(SOCKET_EMIT_USER_UPDATE, user)
                userService.saveLocalUser(user)
            } catch (err) {
                console.log('userStore: Error in updateUser', err)
                throw err
            }
        }
    }
}
