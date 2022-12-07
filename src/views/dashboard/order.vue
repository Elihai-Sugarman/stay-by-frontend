<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ orders.length }} Reservation<span v-if="(orders.length>1)">s</span></div>
    </div>
    <el-table :data="tableData" align="center">

      <el-table-column fixed label="Guest" min-width="100" prop="renter.fullname" align="center">
        <template #default="scope">
          <h3 class="renter-fullname">{{ scope.row.renter.fullname }}</h3>
        </template>
      </el-table-column>
      
      <el-table-column prop="startDate" min-width="100" label="Check-in" align="center" sortable/>

      <el-table-column prop="endDate" min-width="100" label="Checkout" align="center" sortable/>
      
      <el-table-column prop="createdAt" min-width="100" label="Booked" align="center" sortable/>
      
      <el-table-column prop="stay.name" min-width="250" label="Listing" align="center"/>
      
      <el-table-column prop="totalPrice" min-width="100" :formatter="formatCurrency" label="Toal Payout" align="center" sortable />
      
      <el-table-column label="Status" align="center" min-width="100" sortable>
        <template #default="scope">
          <span class="order-status" :class="getStatusClass(scope.row)">
            {{ capitalize(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="To do" min-width="200" align="center">
        <template #default="scope">
          <div class="status-btns">
            <el-button class="approve-btn status-btn" @click="handleOrder(scope.row, 'approve')" v-if="scope.row.status!=='approved'">Approve</el-button>
            <el-button class="reject-btn status-btn" @click="handleOrder(scope.row, 'reject')" v-if="scope.row.status!=='rejected'">Reject</el-button>
            <!-- <span v-else></span> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { capitalize } from 'lodash'
import { utilService } from '../../services/util.service'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.$store.dispatch({ type: 'loadOrders' })
    .then(() => this.loadOrdersData())
    
  },
  computed: {
    orders(){
      const filteredOreders = this.$store.getters.orders
      return filteredOreders
    },
    user() {
      return this.$store.getters.loggedinUser
    },
    orders() {
      return this.$store.getters.orders
    }
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
    loadOrdersData() {
      const data = this.orders
      this.tableData = utilService.deepCopy(data)
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
    }
  }
}
</script>