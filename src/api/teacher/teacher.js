import request from '@/utils/request'



export default {

  getTeacherList(page, limit, conditions) {
    return request({
      // url: '/eduservice/user/login', 
      url: `/eduservice/edu-teacher/${page}/${limit}`,
      method: 'post',
      // ! 将对象转为 json 传递给后端
      data: conditions
    })
  },

  deleteTeacher(id) {
    return request({
      url: `/eduservice/edu-teacher/${id}`,
      method: 'DELETE'
    })
  },

  addTeacher(teacherobj) {
    return request({
      url: '/eduservice/edu-teacher/addTeacher',
      method: 'post',
      data: teacherobj
    })
  },

  updateTeacher(teacherobj) {
    return request({
      url: '/eduservice/edu-teacher/update',
      method: 'put',
      data: teacherobj
    })
  }


}
