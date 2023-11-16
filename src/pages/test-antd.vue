<template>
  <a-table
    ref="tableRef"
    :columns="columns"
    :data-source="data"
    :pagination="{ pageSize: 10 }"
    :scroll="{ y: 240 }"
  />
</template>

<script lang="ts" setup>
defineOptions({ name: 'TestAntd' })

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data = [...Array(12)].map((_, i) => ({
  key: i,
  name: `Edward King ${i}`,
  age: 32,
  address: `London, Park Lane no. ${i}`,
}))

const tableRef = ref<any>(null)

onMounted(() => {
  const container = unrefElement(tableRef).querySelector(
    '.ant-table-container'
  ) as HTMLElement
  const header = container.querySelector('.ant-table-header') as HTMLElement
  const body = container.querySelector('.ant-table-body') as HTMLElement
  useScrollbar(body, { offsetTop: header })
})
</script>
