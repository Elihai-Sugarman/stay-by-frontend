<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ orders.length }} Reservation<span v-if="(orders.length>1)">s</span></div>
    </div>
    <div class="dashboard-table">
    <el-table :data="tableData" height="250" style="width: 100%">

      <el-table-column fixed label="Guest" width="100" prop="buyer.fullname">
        <!-- <template #default="scope">
          {{ scope.row.buyer.fullname }}
        </template> -->
      </el-table-column>

      <!-- <el-table-column prop="status" label="Status" width="120" align="center"/> -->
      
      <el-table-column prop="startDate" label="Check-in" sortable/>

      <el-table-column prop="endDate" label="Checkout" sortable/>
      
      <el-table-column prop="createdAt" label="Booked" sortable/>
      
      <el-table-column prop="stay.name" label="Listing"/>
      
      <el-table-column prop="totalPrice" :formatter="formatCurrency" label="Toal Payout" sortable />
      
      <el-table-column label="Status" sortable>
        <template #default="scope">
          <span class="order-status" :class="getStatusClass(scope.row)">
            {{ capitalize(scope.row.status) }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column prop="status">
        <template #default="scope">
          <el-button class="approve-btn status-btn" @click="handleOrder(scope.row, 'approve')" v-if="scope.row.status==='pending'">Approve</el-button>
          <el-button class="reject-btn status-btn" @click="handleOrder(scope.row, 'reject')" v-if="scope.row.status==='pending'">Reject</el-button>
          <span v-else></span>
        </template>
      </el-table-column>
    </el-table>
    </div>
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
      if (order.status !== 'pending') return
      order.status = command === 'approve' ? 'approved' : 'rejected'
      this.colorClass = order.status === 'approved' ? 'color-green' : 'color-red'
      const newOrder = utilService.deepCopy(order)
      this.$store.dispatch({type: 'updateOrder', order: newOrder})
    }
  }
}
</script>