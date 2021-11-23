#RUN npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
#下载项目文件的node_modules
FROM node:11 as build

# 切换为阿里源
RUN npm config set registry http://47.113.105.208:8088/

WORKDIR /webapp

COPY package.json ./

COPY package-lock.json ./

RUN npm install


#获取生产文件
FROM node:11 as builddist
ARG env

WORKDIR /web

COPY --from=build /webapp/node_modules  ./node_modules

COPY . .

RUN npm run build:${env}

# RUN dir


#下载生产的node_modules
FROM node:11 as distnodemodules

# 切换为阿里源
RUN npm config set registry http://47.113.105.208:8088/

WORKDIR /webapp

COPY package.json ./

COPY package-lock.json ./

RUN npm install tslib  && npm install --production


FROM node:16 as wwwrootbuild

# 切换为阿里源
RUN npm config set registry http://47.113.105.208:8088/

# 为node-sass设置源
RUN npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

WORKDIR /webapp

COPY src/wwwroot/package.json ./

COPY src/wwwroot/package-lock.json ./

RUN npm install


#获取生产文件
FROM node:16 as wwwrootbuilddist
ARG env
WORKDIR /web

COPY --from=wwwrootbuild /webapp/node_modules  ./node_modules

COPY src/wwwroot .

RUN npm run build:${env}



#产出生产镜像
FROM node:11-alpine

#设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

WORKDIR /web

COPY --from=distnodemodules /webapp/node_modules ./node_modules
# COPY --from=builddist /webapp/node_modules ./node_modules

COPY --from=builddist /web/dist ./


RUN  rm -rf ./wwwroot/*

COPY --from=wwwrootbuilddist /web/dist ./wwwroot


# 暴露端口映射
# EXPOSE 2000
ENTRYPOINT command npm run docker


