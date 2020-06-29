const LABEL_MAX_LENGTH = 20

const label = {
  name: 'label',
  rule: ['required', `maxLength:${LABEL_MAX_LENGTH}`],
  msg: ['名称不能为空', `名称字符少于${LABEL_MAX_LENGTH}个`]
}

export default {
  label
}