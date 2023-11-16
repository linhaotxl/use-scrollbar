import Mock from 'mockjs'

import type { MockMethod } from 'vite-plugin-mock'

function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(`${Math.random() * minNum + 1}`, 10)
      break
    case 2:
      return parseInt(`${Math.random() * (maxNum - minNum + 1) + minNum}`, 10)
      break
    default:
      return 0
  }
}

const Random = Mock.Random

const genUser = (i: number): any => ({
  id: Random.id(),
  address: Random.province(),
  region: Random.region(),
  province: Random.province(),
  city: Random.city(),
  zip: Random.zip(),
  title: Random.title(),
  url: Random.url(),
  email: Random.email(),
  name: Random.name(),
  createTime: Random.date(),
  desc: Random.csentence(),
  status: randomNum(1, 3),
  children: i === 2 ? [genUser(0)] : undefined,
})

const userList = Array.from({ length: 4 }).map((_, i) => genUser(i))

const mock: MockMethod[] = [
  {
    url: '/api/user/list',
    method: 'get',
    response(opt) {
      const { pageSize, pageNumber, name, province } = opt.query

      const resolvedProvinces: string[] = province?.split(',') ?? []

      const newDataList = userList.filter(user => {
        if (name) {
          if (!(name === user.name)) {
            return false
          }
        }

        if (province) {
          if (!resolvedProvinces.includes(user.province)) {
            return false
          }
        }

        return true
      })

      return {
        code: 200,
        data: {
          pageNumber,
          pageSize,
          rows: newDataList.slice(
            (pageNumber - 1) * pageSize,
            pageNumber * pageSize
          ),
          total: newDataList.length,
        },
      }
    },
  },

  {
    url: '/api/user/delete',
    method: 'post',
    response(opt) {
      const { userId } = opt.body

      const deleteIndex = userList.findIndex(user => user.id === userId)

      if (deleteIndex !== -1) {
        userList.splice(deleteIndex, 1)
      }

      return {
        code: 200,
        data: deleteIndex !== -1,
      }
    },
  },

  {
    url: '/api/user/add',
    method: 'post',
    response(opt) {
      const data = { ...opt.body, id: Random.id() }

      userList.unshift(data as any)

      return {
        code: 200,
        data: true,
      }
    },
  },

  {
    url: '/api/user/update',
    method: 'post',
    response(opt) {
      const { userId, ...rest } = opt.body

      const updateIndex = userList.findIndex(user => user.id === userId)
      if (updateIndex !== -1) {
        userList.splice(updateIndex, 1, { id: userId, ...rest } as any)
      }

      return {
        code: 200,
        data: updateIndex !== -1,
      }
    },
  },
]

export default mock
