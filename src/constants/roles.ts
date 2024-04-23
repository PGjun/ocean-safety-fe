// 권한에 따른 숫자 매핑
export const roles: { [key: string]: string } = {
  관리자: 'A',
  그룹관리자: 'B',
  선박관리자: 'C',
  승선원: 'D',
}

export const ROLES = {
  ADMIN: 'A',
  GROUP: 'B',
  SHIP: 'C',
  CREW: 'D',
}
