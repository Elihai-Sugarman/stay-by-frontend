import { ElMessage } from 'element-plus'
import { store } from '../store/store'

export function requireAuth(from, to) {
  const isAuthenticated = store.getters.loggedinUser
  if (!isAuthenticated) {
    ElMessage.error('Login is required!')
    return { name: 'login' }
  }

  return true
}