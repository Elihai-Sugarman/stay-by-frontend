<template>
  <section class="dashboard-listings">

    <div class="charts flex justify-between">
      <div class="info-container">
        <h3 class="info-title avg-payout">Revenue / month</h3>
        <div class="chart">
          <chart v-if="tableData.length" :data="avgPayoutByMonthData" chartType="bar" />
        </div>
      </div>
      <div class="info-container res-status">
        <h3 class="info-title">Reservations status</h3>
        <div class="chart">
          <div class="status-info">
            <span class="status-name">Pending</span>
            <span class="status-count pending">{{ getStatusCount('pending') }}</span>
          </div>
          <div class="status-info">
            <span class="status-name">Approved</span>
            <span class="status-count approved">{{ getStatusCount('approved') }}</span>
          </div>
          <div class="status-info">
            <span class="status-name">Rejected</span>
            <span class="status-count rejected">{{ getStatusCount('rejected') }}</span>
          </div>
        </div>
      </div>
      <div class="info-container res-listing">
        <h3 class="info-title">Reservations / listing</h3>
        <div class="chart">
          <chart v-if="tableData.length" :data="reservationsPerListingData" chartType="pie" />
        </div>
      </div>
    </div>

    <div class="listing-title">
      <div>{{ tableData.length }} reservation<span v-if="(tableData.length > 1)">s</span></div>
    </div>

    <el-table :data="tableData" align="center">

      <el-table-column fixed label="Guest" min-width="150" prop="renter.fullname" align="left">
        <template #default="scope">
          <div class="order-preview flex">
            <img :src="scope.row.renter.imgUrl"/>
            <h3 class="renter-fullname handle-overflow">{{ scope.row.renter.fullname }}</h3>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="startDate" min-width="110" :formatter="getFormattedStartDate"  label="Check-in" align="left" sortable/>

      <el-table-column prop="endDate" min-width="110" :formatter="getFormattedEndDate"  label="Checkout" align="left" sortable/>
      
      <el-table-column prop="createdAt" min-width="110" :formatter="getFormattedBookedDate"  label="Booked" align="left" sortable/>
      
      <el-table-column prop="stay.name" min-width="250" label="Listing" align="left">
        <template #default="scope">
          <span class="handle-overflow">{{ scope.row.stay.name }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="totalPrice" min-width="150" :formatter="formatCurrency" label="Total Payout" align="left" sortable />
      
      <el-table-column label="Status" align="left" min-width="100" sortable>
        <template #default="scope">
          <span class="order-status" :class="getStatusClass(scope.row)">
            {{ capitalize(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="To do" min-width="200" align="center">
        <template #default="scope">
          <div class="status-btns">
            <el-button
              type="success"
              plain
              class="approve-btn status-btn"
              @click="handleOrder(scope.row, 'approve')"
              :class="{'disabled-btn': scope.row.status=='approved'}">Approve</el-button>
            <el-button
              plain
              type="danger"
              class="reject-btn status-btn"
              @click="handleOrder(scope.row, 'reject')"
              :class="{'disabled-btn': scope.row.status=='rejected'}">Reject</el-button>
            <!-- <span v-else></span> -->
          </div>
        </template>
      </el-table-column>
    </el-table>

  </section>
</template>

<script>
import moment from 'moment'
import { capitalize } from 'lodash'
import { utilService } from '../../services/util.service'
import chart from '../../cmps/chart.vue'
import { orderService } from '../../services/order.service'
import { socketService, SOCKET_EVENT_ORDER_ADD, SOCKET_EMIT_ORDER_STATUS } from '../../services/socket.service'

export default {
  components: { chart },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadOrdersData()
    socketService.on(SOCKET_EVENT_ORDER_ADD, this.addOrder)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ORDER_ADD)
  },
  computed: {
    avgPayoutByMonthData() {
      return {
        labels: ['Sept', 'Oct', 'Nov', 'Dec', 'Jan'],
        datasets: [
          {
            data: [3000, 2000, 4560, 8918, 7542],
            backgroundColor: ['#6C26FC', '#1D28DE', '#2D83F5', '#1DB9DE', '#21FFD3'],
          },
        ],
      }
    },
    reservationsPerListingData() {
      const labels = ['Lemon Garden', 'Moshe\'s house', 'BOUTIQUE Rental', 'GuestReady']
      const staysMap = this.tableData.reduce((prev, { stay }) => {
        if (prev[stay.name]) prev[stay.name]++
        else prev[stay.name] = 1
        return prev
      }, {})

      const data = {
        labels,
        datasets: [
          {
            data: [
              staysMap['Lemon Garden'],
              staysMap['Moshe\'s house'],
              staysMap['BOUTIQUE Rental-THE ALMA Apt'],
              staysMap['GuestReady - Colorful Apt']
            ],
            backgroundColor: ['#6C26FC', '#1D28DE', '#2D83F5', '#1DB9DE'],
          },
        ]
      }
      console.log('data', data);
      return data
    },
    reservationStatusData() {

      const data = {
        labels: ['Aprroved', 'Pending', 'Rejected'],
        datasets: [
          {
            data: [10, 12, 15],
            backgroundColor: ['#008000', '#ffa500', '#ff0000'],
          },
        ]
      }
      console.log('data', data);
      return data
    },
  },
  methods: {
    getStatusCount(status) {
      return this.tableData.reduce((prev, order) => {
        if (order.status === status) prev++
        return prev
      }, 0)
    },
    addOrder(order) {
      this.tableData.unshift(order)
    },
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
      const data = await orderService.getHostOrders()
      this.tableData = data.reverse()
    },
    formatCurrency({ totalPrice }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(totalPrice)
    },
    async handleOrder(order, command){
      // if (order.status !== 'pending') return
      order.status = command === 'approve' ? 'approved' : 'rejected'
      this.colorClass = order.status === 'approved' ? 'color-green' : 'color-red'

      const newOrder = utilService.deepCopy(order)
      await this.$store.dispatch({ type: 'updateOrder', order: newOrder })
      socketService.emit(SOCKET_EMIT_ORDER_STATUS, newOrder)
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