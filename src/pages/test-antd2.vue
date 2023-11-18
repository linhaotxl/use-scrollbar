<template>
  <div ref="tableRef" style="color: #000000">
    <div class="ant-table-container">
      <div
        class="ant-table-header"
        style="
          overflow: hidden;
          height: 55px;
          border: 1px solid #ff0000;
          box-sizing: border-box;
        "
      >
        Header
      </div>

      <div
        class="ant-table-body"
        style="
          overflow-y: scroll;
          height: 240px;

          /* border: 1px solid; */

          /* box-sizing: border-box; */
        "
      >
        <div style="display: flex; flex-direction: column">
          <span v-for="item in 100" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'TestAntd' })

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
