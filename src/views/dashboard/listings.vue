<template>
  <section class="dashboard-listings">
    <div class="listing-title">
      <div>{{ tableData.length }} listing<span v-if="(tableData.length>1)">s</span></div>
      <router-link to="/dashboard/stay/edit">
        <el-button plain><icon-cmp icon-type="plus" /> Create listing</el-button>
      </router-link>
    </div>

    <el-table class="add-padding" :data="tableData">

      <el-table-column label="LISTING" min-width="250" fixed>
        <template #default="scope">
          <router-link :to="('/stay/' + scope.row._id)">
            <div class="listing-preview">
              <img :src="scope.row.imgUrls[0]" alt="listing preview">
              <h3 class="listing-name">{{ scope.row.name }}</h3>
            </div>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column label="TODO" min-width="100" align="center">
        <template #default="scope">
          <router-link :to="('/dashboard/stay/edit/' + scope.row._id)">
            <el-button plain>Update</el-button>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="capacity" label="CAPACITY" min-width="120" align="center" sortable />

      <el-table-column prop="bathrooms" label="ROOMS" align="center" sortable min-width="100" />
      
      <el-table-column prop="bedrooms" label="BEDROOMS" min-width="140" align="center" sortable />

      <el-table-column prop="price" :formatter="formatCurrency" label="PRICE" sortable min-width="120" />

      <el-table-column :formatter="formatLocation" label="LOCATION" align="left" min-width="150" />      

      <el-table-column prop="createdAt" min-width="150" label="DATE ADDED" :formatter="formattedDate" align="right"/>
    </el-table>
  </section>
</template>

<script>
import moment from 'moment'
import { stayService } from '../../services/stay.service'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadListingsData()
  },
  methods: {
    async loadListingsData() {
      const data = await stayService.getListings()
      this.tableData = data
    },
    formatLocation({ address }) {
      return [address.city, address.country].filter(_ => _).join(', ')
    },
    formatCurrency({ price }) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    },
    formattedDate({ createdAt }) {
      return moment(createdAt).format('MM/DD/YYYY')
    },
  }
}
</script>