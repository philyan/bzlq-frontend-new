<template>
  <el-row class="pagination-box" v-show="totalItems">
    <el-col :span="22">
      <el-pagination
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, prev, next, jumper"
        :total="totalItems">
      </el-pagination>
     </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'PaginationMobile',
    props:{
      totalItems:{
        requried:true,
        type:Number
      },
      currentPage:{
        requried:true,
        type:Number
      },
      pageSizes:{
        type:Array,
        default:()=>[5,10,20,30,100]
      },
      pageSize:{
        default:5,
        type:Number
      }
    },
    data () {
      return {}
    },
    methods:{
      pageChange(curPage){
        this.$emit('update:currentPage',curPage)
        this.$emit('pageChange',curPage)
      },
      sizeChange(pageSize){
        this.$emit('update:pageSize',pageSize)
        if(Math.ceil(this.totalItems/pageSize) >= this.currentPage){
          this.$emit('sizeChange',pageSize)
        }
      }
    },
    computed:{
      pageCount(){
        return Math.ceil(this.totalItems/this.pageSize)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pagination-box{
    margin-top:10px;
    margin-bottom:5px;
    text-align: right;
  }
  .pagination-box .pagination-box-text{
    font-size: 13px;
    /*line-height: 32px;*/
  }
</style>

