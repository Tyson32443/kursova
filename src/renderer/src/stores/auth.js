import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => {
    return { user: null, fail: false, users: null }
  },
  actions: {
    async login(data) {
      const res = await axios.get(
        `http://localhost:3000/users?login=${data.login}&password=${data.password}`
      )
      if (res.data.length) {
        this.fail = false
        this.user = res.data
      } else {
        this.fail = true
      }
    },
    async addUser(data) {
      await axios.post('http://localhost:3000/users', data)
      await this.getUsers()
    },

    async deleteUser(id) {
      await axios.delete(`http://localhost:3000/users/${id}`)
      await this.getUsers()
    },

    async getUsers() {
      const { data } = await axios.get('http://localhost:3000/users')
      this.users = data
    },
    async answerQuestion(id, answer) {
      console.log(this.user)
      let data = {
        id,
        answer
      }
      await axios.patch(`http://localhost:3000/users/${this.user[0].id}`, {
        questions: [...this.user[0].questions, data]
      })
      this.user[0].questions = [...this.user[0].questions, data]
    },
    logout() {
      this.user = null
    }
  },
  persist: true
})
