<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ tableData.length }} Trip<span v-if="(tableData.length > 1)">s</span></div>
    </div>
    <el-table :data="tableData" align="center">

      <el-table-column fixed label="Host" min-width="150" align="center">
        <template #default="scope">
          <h3 class="renter-fullname handle-overflow">{{ scope.row.host.fullname }}</h3>
        </template>
      </el-table-column>
      
      <el-table-column prop="startDate" min-width="100" :formatter="getFormattedStartDate"  label="Check-in" align="center" sortable/>

      <el-table-column prop="endDate" min-width="100" :formatter="getFormattedEndDate"  label="Checkout" align="center" sortable/>
      
      <el-table-column prop="createdAt" min-width="100" :formatter="getFormattedBookedDate"  label="Booked" align="center" sortable/>
      
      <el-table-column prop="stay.name" min-width="250" label="Listing" align="center">
        <template #default="scope">
          <span class="handle-overflow">{{ scope.row.stay.name }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="totalPrice" min-width="110" :formatter="formatCurrency" label="Total Payout" align="center" sortable />
      
      <el-table-column label="Status" align="center" min-width="100" sortable>
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
import * as moment from 'moment'
import { capitalize } from 'lodash'
import { utilService } from '../services/util.service'
import { orderService } from '../services/order.service'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadOrdersData()
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
      }
      return {
        [statusClass]: true
      }
    },
    capitalize(value) {
      return capitalize(value)
    },
    async loadOrdersData() {
      const data = await orderService.getRenterOrders()
      this.tableData = data
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
    handleOrder(order, command){
      // if (order.status !== 'pending') return
      order.status = command === 'approve' ? 'approved' : 'rejected'
      this.colorClass = order.status === 'approved' ? 'color-green' : 'color-red'
      const newOrder = utilService.deepCopy(order)
      this.$store.dispatch({type: 'updateOrder', order: newOrder})
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