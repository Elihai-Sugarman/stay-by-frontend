<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ orders.length }} Reservation<span v-if="(orders.length>1)">s</span></div>
    </div>
    <el-table :data="tableData" height="200">

      <el-table-column label="RESERVATION" width="250">
        <template #default="scope">
          <div class="listing-preview">
            <img :src="scope.row.imgUrls[0]" alt="listing preview">
            <h3>{{ scope.row.name }}</h3>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="TODO">
        <template #default>
          <el-button plain>Update</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="capacity" label="CAPACITY" width="120" align="center" sortable />

      <el-table-column prop="bathrooms" label="ROOMS" align="center" sortable />
      
      <el-table-column prop="bedrooms" label="BEDROOMS" width="140" align="center" sortable />

      <el-table-column prop="price" :formatter="formatCurrency" label="PRICE" sortable />

      <el-table-column :formatter="formatLocation" label="LOCATION" align="center" />      

      <el-table-column prop="createdAt" width="150" label="DATE ADDED" />
    </el-table>
  </section>
</template>

<script>
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
      console.log(filteredOreders)
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
    loadOrdersData() {
      const data = this.orders
      this.tableData = data
      console.log('tableData', this.tableData)
    },
    formatLocation({ address }) {
      return `${address.city}, ${address.country}`
    },
    formatCurrency({ price }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>