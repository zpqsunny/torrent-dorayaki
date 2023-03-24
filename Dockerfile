FROM nginx:stable
LABEL auther=zpq
WORKDIR /data
COPY ${PWD}/dist /data
COPY ${PWD}/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
