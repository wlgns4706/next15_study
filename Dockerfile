FROM node:20.15.1-alpine as base
FROM base AS deps
# alpine 자체가 경량화를 위해 최소한의 라이브러리를 가지고 있다 보니, process.dlopen 을 수행하기 위해서는 libc6-compat 라이브러리를 추가적으로 설치해야 한다고 한다.
RUN apk add --no-cache libc6-compat

WORKDIR /app

#  Dependancy install을 위해 package.json, package-lock.json, yarn.lock 복사 
COPY package*.json yarn.lock ./

#새로운 lock 파일 수정 또는 생성 방지
#재현 가능한 빌드를 보장하여, 개발 환경과 프로덕션 환경 간의 불일치 문제를 방지합니다.
RUN yarn --frozen-lockfile

COPY . .

CMD yarn dev


######
# # 작업 디렉토리 설ㅓㅇ
# WORKDIR /app

# #  Dependancy install을 위해 package.json, package-lock.json, yarn.lock 복사 
# COPY package*.json yarn.lock ./

# #새로운 lock 파일 수정 또는 생성 방지
# RUN yarn --frozen-lockfile 



# # 2단계 
# FROM base AS builder 

# WORKDIR /app

# #node_modules 등의 dependancy를 복사
# COPY --from=deps /app/node_modules ./node_modules

# # 모든 소스 파일을 복사
# COPY . .

# # Next.js 애플리케이션을 빌드
# RUN yarn build

# #3단계

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production

# # container 환경에 시스템 사용자를 추가함
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # .next 디렉터리를 만들고 사용자 권한을 설정
# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# # 빌드 결과물 중 public 폴더를 복사
# # builder된 곳에서 만들어진 public을 해당 runner 이미지에 추가해주기 위함
# COPY --from=builder /app/public ./public
# # standalone 결과물에는 public 폴더와 static 폴더 내용은 포함되지 않으므로, 따로 복사
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # nextjs 사용자로 실행하도록 설정
# USER nextjs

# # 컨테이너의 수신 대기 포트를 3000으로 설정
# EXPOSE 3000

# # 포트 환경 변수 설정
# ENV PORT 3000

# # 로컬호스트 환경에서, node로 애플리케이션 실행
# CMD HOSTNAME="0.0.0.0" node server.js