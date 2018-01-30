/* @flow */
/**
 * 远程服务调用模块
 * @version 1.0
 * @author HanL
 */
import axios from 'axios'
import ServiceError from './ServiceError'
import { getStore, types } from './store/index'
// import type { SetariaStore } from './store'

const REQUEST_TYPE: Object = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  OPTIONS: 'options',
  PATCH: 'patch'
}

function getHttpStatusMessage (status: number, error: AxiosError): ServiceError {
  let ret = new ServiceError('MAM001E', error)
  if (status !== null && status !== undefined) {
    let id: ?string = null
    switch (status) {
      case 404:
        id = '404'
        break
      default:
        id = '001'
    }
    ret = new ServiceError(`MAM${id}E`, error)
  }
  return ret
}

function execute (type: HttpMethod, url: string, data: any, config: AxiosConfig = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    let p: ?Promise<any> = null
    const axiosConfig: AxiosConfig = config
    if (type === REQUEST_TYPE.GET || type === REQUEST_TYPE.DELETE ||
      type === REQUEST_TYPE.OPTIONS) {
      axiosConfig.params = data
      p = axios[type](url, axiosConfig)
    } else {
      p = axios[type](url, data, axiosConfig)
    }
    const storeInstance = getStore()
    if (config.loading !== false && storeInstance !== null && storeInstance !== undefined) {
      storeInstance.commit(types.ADD_LOADING_COUNT)
    }
    p.then((res: AxiosResponse) => {
      if (config.loading !== false && storeInstance !== null && storeInstance !== undefined) {
        storeInstance.commit(types.SUB_LOADING_COUNT)
      }
      resolve(res)
    }).catch((error: AxiosError) => {
      if (config.loading !== false && storeInstance !== null && storeInstance !== undefined) {
        storeInstance.commit(types.SUB_LOADING_COUNT)
      }
      let rejectError: ServiceError = new ServiceError('MAM001E', error)
      if (error.response !== null && error.response !== undefined &&
        typeof error.response.status === 'number') {
        rejectError = getHttpStatusMessage(error.response.status, error)
      }
      if (error.message.indexOf('timeout of') === 0) {
        const timeout: ?string | ?number = error.config.timeout
        if (timeout === undefined || timeout === null) {
          rejectError = new ServiceError('MAM007E', error)
        } else {
          rejectError = new ServiceError('MAM003E', error, [timeout])
        }
      }
      reject(rejectError)
    })
  })
}

function executeAll (promiseArr: Array<Promise<any>>): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.all(promiseArr)
      .then((res) => {
        resolve(res)
      })
  })
}

export default class Http {
  static get (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.GET, url, data, config)
  }

  static post (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.POST, url, data, config)
  }

  static put (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.PUT, url, data, config)
  }

  static delete (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.DELETE, url, data, config)
  }

  static options (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.OPTIONS, url, data, config)
  }

  static patch (url: string, data: any, config: AxiosConfig): Promise<any> {
    return execute(REQUEST_TYPE.PATCH, url, data, config)
  }

  static all (promiseArr: Array<Promise<any>>): Promise<any> {
    return executeAll(promiseArr)
  }

  static spread (callback: Function): void {
    return axios.spread(callback)
  }
}
