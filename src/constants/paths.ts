import { getQueryString } from '@/utils/getQueryString'

export const PATHS = {
  SIGNIN: '/signin',
  CREW_INFO: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/crewinfo?${query}`
  },
  CREW_ADD: '/crewinfo/crewadd',
  CREW_EDIT: (params: { user_id: number }) => {
    const query = getQueryString(params)
    return `/crewinfo/crewedit?${query}`
  },
  GROUP_INFO: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/groupinfo?${query}`
  },
  GROUP_ADD: '/groupinfo/groupadd',
  MONITORING: (
    params: { [key: string]: string } = { s_page_num: '1', h_page_num: '1' },
  ) => {
    const query = getQueryString(params)
    return `/monitoring?${query}`
  },
  SOS: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/sos?${query}`
  },
  FALL: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/fall?${query}`
  },
  SOS_DETAIL: (params = { sos_id: '1' }) => {
    const query = getQueryString(params)
    return `/sos/detail?${query}`
  },
  FALL_DETAIL: (params = { sos_id: '1' }) => {
    const query = getQueryString(params)
    return `/fall/detail?${query}`
  },
  HEALTH_INFO: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/healthinfo?${query}`
  },
  SOS_SETTINGS: '/healthinfo/sos-settings',
  NOTICE: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/notice?${query}`
  },
  NOTICE_DETAIL: (params = { notice_id: '1' }) => {
    const query = getQueryString(params)
    return `/notice/detail?${query}`
  },
  NOTICE_ADD: `/notice/add`,
}
