<template>
    <div class="app-container">
        <!-- 条件表单 -->
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="queryCondition.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="等级">
                <el-select v-model="queryCondition.level" clearable placeholder="讲师头衔">
                    <el-option label="高级讲师" :value=1></el-option>
                    <el-option label="首席讲师" :value=2></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="添加时间">
                <el-date-picker v-model="queryCondition.timeRange" type="daterange" align="right" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTeacherList">查询</el-button>
            </el-form-item>

        </el-form>

        <!-- 教师列表 -->
        <el-table :data="resList" element-loading-text="数据加载中" border fit highlight-current-row>
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="80" />
            <el-table-column label="头衔" width="80">
                <template slot-scope="scope">
                    {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
                </template>
            </el-table-column>
            <el-table-column prop="intro" label="资历" />
            <el-table-column prop="gmtCreate" label="添加时间" width="160" />
            <el-table-column prop="sort" label="排序" width="60" />
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!-- <router-link :to="'/edu/teacher/edit/' + scope.row"> -->
                    <router-link :to="{name:'修改讲师',params:{info:scope.row}}">
                        <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            style="padding: 30px 0; text-align: center;" :page-sizes="pageSizes" :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

    </div>
</template>

<script>
import teacher from '@/api/teacher/teacher'

export default {
    data() {   // 定义变量和初始值
        return {
            page: 1,
            limit: 10,
            total: 0,
            pageSizes: [10, 20, 50, 100, 200],
            // ! {}和 null的区别
            conditions: {},
            resList: null,
            queryCondition: {
                name: '',
                level: null,
                timeRange: [],     
            },
        }
    },

    created() {
        this.getTeacherList()
    },

    methods: {
        getTeacherList() {
            this.conditions.name = this.queryCondition.name
            this.conditions.level = this.queryCondition.level
            this.conditions.begin = this.queryCondition.timeRange[0]
            this.conditions.end = this.queryCondition.timeRange[1]
            teacher.getTeacherList(this.page, this.limit, this.conditions)
                .then(response => {
                    this.total = response.data.total
                    this.resList = response.data.rows
                })
                .catch(error => {
                    console.log(error)
                })
        },

        handleSizeChange(val) {
            this.limit = val
            this.getTeacherList()
        },
        handleCurrentChange(val) {
            this.page = val
            this.getTeacherList()
        },
        removeDataById(id) {
            console.log(id)
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                teacher.deleteTeacher(id)
                    .then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getTeacherList()
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },


    },
}

</script>

<style>
</style>