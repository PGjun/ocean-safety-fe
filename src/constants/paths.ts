import { getQueryString } from '@/utils/getQueryString'

export const PATHS = {
  CREW_INFO: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/crewinfo?${query}`
  },
  CREW_ADD: '/crewinfo/crewadd',
  GROUP_INFO: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/groupinfo?${query}`
  },
  GROUP_ADD: '/groupinfo/groupadd',
  MONITORING: '/monitoring',
  SOS: (params = { page_num: '1' }) => {
    const query = getQueryString(params)
    return `/sos?${query}`
  },
  SOS_DETAIL: (params = { sos_id: '1' }) => {
    const query = getQueryString(params)
    return `/sos/detail?${query}`
  },
  FALL_DETECTION: '/falldetection',
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
