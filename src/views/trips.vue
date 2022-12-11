<template>
  <section class="dashboard-listings">
    <div class="page-title">
      <h1>Trips</h1>
    </div>
    <div class="listing-title">
      <div>{{ tableData.length }} trip<span v-if="(tableData.length > 1)">s</span></div>
    </div>
    <el-table :data="tableData" align="left">

      <el-table-column label="Destination" min-width="250" align="left">
        <template #default="scope">
          <router-link :to="('/stay/' + scope.row.stay._id)">
            <div class="listing-preview">
              <img :src="scope.row.stay.imgUrl" alt="listing preview">
              <h3 class="listing-name">{{ scope.row.stay.name }}</h3>
            </div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="Host" min-width="100" align="left">
        <template #default="scope">
          <h3 class="renter-fullname handle-overflow">{{ scope.row.host.fullname }}</h3>
        </template>
      </el-table-column>
      
      <el-table-column prop="startDate" min-width="100" :formatter="getFormattedStartDate"  label="Check-in" align="left" sortable/>

      <el-table-column prop="endDate" min-width="100" :formatter="getFormattedEndDate"  label="Checkout" align="left" sortable/>
      
      <el-table-column prop="createdAt" min-width="100" :formatter="getFormattedBookedDate"  label="Booked" align="left" sortable/>
      
      <el-table-column prop="totalPrice" min-width="100" :formatter="formatCurrency" label="Total Price" align="left" sortable />
      
      <el-table-column label="Status" align="right" min-width="100">
        <template #default="scope">
          <span class="order-status" :class="getStatusClass(scope.row)">
            {{ capitalize(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      
    </el-table>
  </section>
</template>

<script>
import moment from 'moment'
import { capitalize } from 'lodash'
import { utilService } from '../services/util.service'
import { orderService } from '../services/order.service'
import { socketService, SOCKET_EVENT_ORDER_STATUS } from '../services/socket.service'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadOrdersData()
    socketService.on(SOCKET_EVENT_ORDER_STATUS, this.changeTripStatus)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ORDER_STATUS)
  },
  methods: {
    getStatusClass({ status }) {
      let statusClass = 'pending'
      switch (status) {
        case 'approved':
          statusClass = 'approved'
          break;
        case 'rejected':
          statusClass = 'rejected'
          break;
        case 'completed':
          statusClass = 'completed'
          break;
      }
      return {
        [statusClass]: true
      }
    },
    capitalize(value) {
      return capitalize(value)
    },
    async loadOrdersData() {
      const data = (await orderService.getRenterOrders())
      this.tableData = data.reverse()
    },
    formatLocation({ address }) {
      return `${address.city}, ${address.country}`
    },
    formatCurrency({ totalPrice }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalPrice)
    },
    handleOrder(order, command) {
      // if (order.status !== 'pending') return
      order.status = command === 'approve' ? 'approved' : 'rejected'
      this.colorClass = order.status === 'approved' ? 'color-green' : 'color-red'
      const newOrder = utilService.deepCopy(order)
      this.$store.dispatch({type: 'updateOrder', order: newOrder})
    },
    changeTripStatus(order) {
      const orderToChange = this.tableData.find(({ _id }) => _id === order._id)
      if (orderToChange) orderToChange.status = order.status
    },
    getFormattedStartDate({ startDate }) {
      return moment(startDate).format('MM/DD/YYYY')
    },
    getFormattedEndDate({ endDate }) {
      return moment(endDate).format('MM/DD/YYYY')
    },
    getFormattedBookedDate({ createdAt }) {
      return moment(createdAt).format('MM/DD/YYYY')
    },
  }
}
</script>