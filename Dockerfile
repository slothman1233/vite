#RUN npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
#下载项目文件的node_modules
FROM node:16 as build

# 切换为阿里源
RUN npm config set registry https://registry.npmmirror.com/

WORKDIR /webapp

COPY package.json ./

COPY package-lock.json ./

RUN npm install


#获取生产文件
FROM node:16 as builddist
ARG env

WORKDIR /web

COPY --from=build /webapp/node_modules  ./node_modules

COPY . .

RUN npm run build:${env}

# RUN dir


#下载生产的node_modules
FROM node:16 as distnodemodules

# 切换为阿里源
RUN npm config set registry https://registry.npmmirror.com/

WORKDIR /webapp

COPY package.json ./

COPY package-lock.json ./

RUN  npm install --production


#产出生产镜像
FROM node:16-alpine
ARG env
ENV ev $env


#设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /web

COPY --from=distnodemodules /webapp/node_modules ./node_modules

COPY --from=builddist /web/dist ./dist

COPY --from=builddist /web/vitedist ./vitedist

COPY --from=builddist /web/package.json package.json

COPY --from=builddist /web/pm2.conf.json pm2.conf.json

# 暴露端口映射
ENTRYPOINT command npm run docker:${ev}


