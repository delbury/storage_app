const furnitureAllButtons = [
  {
    label: '添加家具',
    iconClass: 'icon-add-select',
    key: 'add'
  },
  {
    label: '编辑',
    iconClass: 'icon-category',
    key: 'edit'
  },
  {
    label: '移动',
    iconClass: 'icon-copy',
    key: 'move'
  },
  {
    label: '删除',
    iconClass: 'icon-ashbin',
    key: 'delete'
  },
  {
    label: '置顶',
    iconClass: 'icon-zhiding',
    key: 'top'
  },
]

export const furnitureEditButtons = {
  noSeleted: [furnitureAllButtons[0]],
  singleSeleted: furnitureAllButtons.filter((item, index) => index !== 0),
  multipleSeleted: furnitureAllButtons.filter((item, index) => index !== 0 && index !== 1)
}

const spaceAllButtons = [
  {
    label: '添加',
    iconClass: 'icon-add-select',
    key: 'add'
  },
  {
    label: '编辑',
    iconClass: 'icon-editor',
    key: 'edit'
  },
  {
    label: '移动',
    iconClass: 'icon-copy',
    key: 'move-mode'
  },
  {
    label: '移动',
    iconClass: 'icon-copy',
    key: 'move-confirm'
  },
  {
    label: '取消',
    iconClass: 'icon-close',
    key: 'cancel'
  },
]

export const spaceEditButtons = {
  normal: spaceAllButtons.filter((item, index) => index < 3),
  move: spaceAllButtons.filter((item, index) => index > 2),
}
