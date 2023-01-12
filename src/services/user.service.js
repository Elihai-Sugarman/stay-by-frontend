import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update
}

function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) saveLocalUser(user)
    return user
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    const result = await httpService.post('auth/logout')
    localStorage.removeItem(STORAGE_KEY)
    return result
}

function saveLocalUser(user) {
    utilService.saveToStorage(STORAGE_KEY, user)
    return user
}

function getLoggedinUser() {
    return utilService.loadFromStorage(STORAGE_KEY)
}
