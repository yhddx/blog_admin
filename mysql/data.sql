show databases;
create database blog;

use blog;
show tables;

create table article (
    id int unsigned not null auto_increment comment '文章id',
    title varchar(512) not null comment '文章标题',
    content longtext comment '文章内容',
    author varchar(128) not null comment '作者',
    create_time datetime not null,
    modify_time datetime not null,
    PRIMARY key(id)
) engine=innodb comment='文章表';

create table userinfo (
    id int unsigned not null auto_increment comment '用户id',
    username varchar(128) not null comment '用户名',
    password varchar(128) not null comment '密码',
    create_time datetime not null,
    modify_time datetime not null,
    PRIMARY key(id),
    unique key username(username)
) engine=innodb comment='用户表';

create table imagefile (
    id int unsigned not null auto_increment comment '图片id',
    path varchar(128) not null comment '路径',
    userid int unsigned not null comment '用户id',
    create_time datetime not null,
    modify_time datetime not null,
    PRIMARY key(id),
    key userid(userid)
) engine=innodb comment='上传图片表';

insert into article set title='标题1', content='内容1', author='wangdengduo', create_time=now(), modify_time=now();

insert into article set title='标题2', content='内容2', author='yhddx', create_time=now(), modify_time=now();

启用mysql
mysql -h 127.0.0.1 -P 3306 -uroot -p123456