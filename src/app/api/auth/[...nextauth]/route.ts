import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { postUserLogin } from '@/services/api/user'

// NextAuth 공통 설정
const nextAuthOptions = async () => ({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        if (!credentials) return null

        const loginResponse = await postUserLogin({
          id: credentials.username,
          password: credentials.password,
        })

        if (loginResponse && loginResponse.status === 200) {
          console.log('...로그인 성공')

          return {
            ...loginResponse.data,
            keepLogin: credentials.keepLogin === 'true', // 문자열로 전달될 가능성
          }
        } else {
          throw new Error('Invalid credentials')
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user
      }
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user
        //로그인 유지 버튼 활성화 | 비활성화
        token.maxAge = user.keepLogin ? 30 * 24 * 60 * 60 : 12 * 60 * 60 // 30일/12시간
      }
      return token
    },
    async redirect({ url, baseUrl }: any) {
      // 로그인 성공 후 리디렉션 처리
      if (url === process.env.NEXTAUTH_URL + '/api/auth/signin') {
        return baseUrl
      }
      return url
    },
  },
})

// GET 요청 처리
export const GET = async (req: any, res: any) => {
  const options: any = await nextAuthOptions()
  return await NextAuth(req, res, options)
}

// POST 요청 처리
export const POST = async (req: any, res: any) => {
  const options: any = await nextAuthOptions()
  return await NextAuth(req, res, options)
}
