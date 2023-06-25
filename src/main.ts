import schema from './types/test.json';

import { Validator } from 'jsonschema'

const validator = new Validator()

validator.addSchema(schema, '/testId')

// 劫持返回数据校验，若有问题则进行上报
const validateResponseData = (data: any, type: string) => {
  const result = validator.validate(data, {
    $ref: `testId#/definitions/${type}`
  })

  console.log('result __________________________________________________', result)

  if (!result.valid) {
    // 校验失败 上报错误信息
    console.log(`data is ${data},
    errors: ${result.errors.map(item => item.toString())}
    `)
  }

  // 透传 data
  return data
}

const getUserInfo = (): Promise<Person.User> => {
  const mockUser = {
    name: 'zhangsan',
    address: 'ssss'
  }

  return Promise.resolve(mockUser).then(res => {
    return validateResponseData(res, 'Person.User')
  })
}

getUserInfo()
  .then(res => {
    // console.log('res', res)
  })