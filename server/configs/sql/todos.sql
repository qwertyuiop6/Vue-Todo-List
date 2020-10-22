/*
 Navicat Premium Data Transfer

 Source Server         : ALI-PG
 Source Server Type    : PostgreSQL
 Source Server Version : 90523
 Source Host           : zx-cave.wtfk.world:5432
 Source Catalog        : study
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 90523
 File Encoding         : 65001

 Date: 23/10/2020 02:27:31
*/


-- ----------------------------
-- Sequence structure for todo_list_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."todo_list_id_seq";
CREATE SEQUENCE "public"."todo_list_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 99999
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq" 
INCREMENT 1
MINVALUE  1000
MAXVALUE 999999
START 1001
CACHE 1;

-- ----------------------------
-- Table structure for todo_list
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo_list";
CREATE TABLE "public"."todo_list" (
  "status" int2 NOT NULL,
  "uid" int4 NOT NULL,
  "id" int4 NOT NULL DEFAULT nextval('todo_list_id_seq'::regclass),
  "content" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "start_date" varchar COLLATE "pg_catalog"."default",
  "end_date" varchar COLLATE "pg_catalog"."default",
  "last_update" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of todo_list
-- ----------------------------
INSERT INTO "public"."todo_list" VALUES (0, 1001, 48, 'Express文件分享站', '2020/8/19 19:16', '天荒地老', '2020-09-19 19:16:00');
INSERT INTO "public"."todo_list" VALUES (1, 1001, 25, 'ytb技术视频搬运', '2020/5/8 5:52', '', '2020-09-25 11:41:00');
INSERT INTO "public"."todo_list" VALUES (0, 1028, 128, '他吞吞吐吐啊实打实的ssssssssssssssssssssssssssss', '2020/10/14 22:25', '海枯石烂', '2020-10-16 05:52:00');
INSERT INTO "public"."todo_list" VALUES (0, 1014, 51, 'GHS', '2020/8/19 20:47', '2020-09-30', '2020-09-20 02:24:00');
INSERT INTO "public"."todo_list" VALUES (0, 1028, 129, '鬼鬼鬼鬼鬼鬼鬼鬼鬼', '2020/10/14 22:25', '天荒地老', '2020-10-16 05:52:00');
INSERT INTO "public"."todo_list" VALUES (0, 1027, 61, 'shell里使用EOF可以添加多行内容到文件', '2020/8/25 11:17', '海枯石烂', '2020-09-25 14:43:00');
INSERT INTO "public"."todo_list" VALUES (0, 1014, 40, 'GHS', '2020/8/19 17:30', '海枯石烂', '2020-09-20 02:24:00');
INSERT INTO "public"."todo_list" VALUES (0, 1004, 16, '65567', '2019/11/26 13:37', '2019-12-04', NULL);
INSERT INTO "public"."todo_list" VALUES (0, 1031, 97, 'ssssssssssssssa', '2020/9/27 11:27', '2020-09-24', '2020-10-16 06:11:00');
INSERT INTO "public"."todo_list" VALUES (0, 1033, 132, 'Fauna   fnAD4PbKFiACB-uDX8O1IesZl_wlLnkGlUNVj1ZA', '2020/10/16 7:48', '海枯石烂', '2020-10-16 07:51:00');
INSERT INTO "public"."todo_list" VALUES (0, 1013, 133, 'ssssssssssss', '2020/10/20 22:54', '海枯石烂', '2020-10-20 22:54:00');
INSERT INTO "public"."todo_list" VALUES (0, 1028, 134, 'asdasd', '2020/10/21 0:29', '海枯石烂', '2020-10-21 00:32:00');
INSERT INTO "public"."todo_list" VALUES (1, 1025, 53, 'sss', '2020/8/22 4:39', '天荒地老', '2020-09-22 05:53:00');
INSERT INTO "public"."todo_list" VALUES (1, 1001, 15, 'prototype extend', '2019/11/26 9:17', '', NULL);
INSERT INTO "public"."todo_list" VALUES (0, 1029, 72, 'bc1qr669kkqxffpp2kafm7he0ryceg2a3c7gn9zdqyxwdnj0x3kq8nhsxx3rq6', '2020/8/26 2:30', '海枯石烂', '2020-10-23 01:46:00');
INSERT INTO "public"."todo_list" VALUES (0, 1027, 62, 'VIM 退出可以使用:x或直接ZZ', '2020/8/25 11:18', '海枯石烂', '2020-10-15 02:29:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 46, 'React+React-Hooks 全家桶', '2020/8/19 19:3', '天荒地老', '2020-10-15 12:56:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 24, 'chrome history历史功能插件', '2020/5/8 5:50', '', '2020-10-15 12:57:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 21, 'todolist小程序?', '2019/11/28 20:30', '', '2020-10-15 12:57:00');
INSERT INTO "public"."todo_list" VALUES (0, 1029, 135, 'ssssssssssssss', '2020/10/23 1:46', '天荒地老', '2020-10-22 17:46:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 2, 'study', '2020-09-19 17:02:00', '海枯石烂', '2020-09-19 17:29:00');
INSERT INTO "public"."todo_list" VALUES (0, 1014, 38, '吃喝玩乐', '2020/8/19 17:29', '海枯石烂', '2020-09-19 17:29:00');
INSERT INTO "public"."todo_list" VALUES (0, 1032, 130, '哇哇哇哇哇哇哇哇哇哇哇哇', '2020/10/15 17:8', '天荒地老', '2020-10-15 21:37:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 14, '发布npm package', '2019/11/26 9:17', '', NULL);
INSERT INTO "public"."todo_list" VALUES (0, 1001, 20, 'koa+vue 博客重写', '2019/11/28 20:29', '', NULL);
INSERT INTO "public"."todo_list" VALUES (0, 1031, 131, '啊实打实', '2020/10/13 9:30', '2020-10-22', '2020-10-16 02:26:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 49, 'NEXT-dst-web搭建', '2020/8/19 19:17', '海枯石烂', '2020-09-20 20:50:00');
INSERT INTO "public"."todo_list" VALUES (0, 1030, 73, 'sssssss', '2020/9/27 5:53', '海枯石烂', '2020-09-27 06:39:00');
INSERT INTO "public"."todo_list" VALUES (0, 1030, 76, 'sadasdasd', '2020/9/27 6:39', '海枯石烂', '2020-09-27 06:39:00');
INSERT INTO "public"."todo_list" VALUES (0, 1025, 98, 'sssssssssasdasdasd', '2020/9/27 11:55', '天荒地老', '2020-09-27 11:55:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 50, 'Socket.io在线IM应用', '2020/8/19 19:18', '天荒地老', '2020-09-21 04:30:00');
INSERT INTO "public"."todo_list" VALUES (0, 1001, 1, 'code', '2020-09-19 17:00:00', '天荒地老', '2020-09-24 06:22:00');
INSERT INTO "public"."todo_list" VALUES (0, 1026, 57, '豆腐乳', '2020/8/24 7:25', '海枯石烂', '2020-09-24 07:25:00');
INSERT INTO "public"."todo_list" VALUES (0, 1026, 58, '老干妈', '2020/8/24 7:25', '海枯石烂', '2020-09-24 07:25:00');
INSERT INTO "public"."todo_list" VALUES (0, 1027, 63, 'ssh可以在客户端和服务器分别配置心跳包防止断连', '2020/8/25 11:20', '天荒地老', '2020-09-27 12:54:00');
INSERT INTO "public"."todo_list" VALUES (0, 1026, 59, '行不行', '2020/8/24 7:26', '天荒地老', '2020-09-27 12:55:00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "name" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "passwd" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  "create_date" varchar COLLATE "pg_catalog"."default",
  "last_update" varchar COLLATE "pg_catalog"."default",
  "salt" varchar COLLATE "pg_catalog"."default",
  "status" varchar COLLATE "pg_catalog"."default",
  "avatar" varchar COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."user"."name" IS '用户名称(唯一)';
COMMENT ON COLUMN "public"."user"."passwd" IS '哈希加密(sha256)的密码';
COMMENT ON COLUMN "public"."user"."id" IS '用户唯一ID';
COMMENT ON COLUMN "public"."user"."create_date" IS '用户注册日期';
COMMENT ON COLUMN "public"."user"."last_update" IS '最后更新时间';
COMMENT ON COLUMN "public"."user"."salt" IS '盐';
COMMENT ON COLUMN "public"."user"."status" IS '个人状态,签名';
COMMENT ON COLUMN "public"."user"."avatar" IS '个人头像链接';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES ('xiaohao', '15a7bd9bb59033e0db5d673a887239a811f183dd981b0aa7ec37f437ede85cbc', 1011, '2020-09-19 16:04:51', '2020-10-15 13:07:00', '0f6ee97dfd', NULL, NULL);
INSERT INTO "public"."user" VALUES ('qwerty', '59dcd96a81c8862e5ce9cab152befaa1af434966aa8834424d2d852d46ce6509', 1031, '2020-09-27 10:51:53', '2020-10-16 05:45:00', '921d50a7db', NULL, 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/8ef6ac365d5ddb18a9a153c1b34e289567161dba.jpg');
INSERT INTO "public"."user" VALUES ('test', '627f7a53c74c1b7f0ce926cd2c781899aa166c80845cad624e9a502af5a40d75', 1028, '2020-09-25 14:44:06', '2020-10-16 05:56:00', '70e67d65d7', '', 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/8ef6ac365d5ddb18a9a153c1b34e289567161dba.jpg');
INSERT INTO "public"."user" VALUES ('每天一个小技巧', '11ee18c5ce031c66faaeb63851f9a5135f02f6555973235bb91074437e646331', 1027, '2020-09-25 11:16:09', '2020-10-16 07:22:00', '798246c548', '每天一个小技巧!!!!', 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/8387fb2e13d857eb6fc89f7698c9cb55907a4fc3.jpeg');
INSERT INTO "public"."user" VALUES ('云顶老八', '715aa60bc3f87d80294c512d8697ef38b0d3ef19cd2e660d1ae60c962c78ffda', 1032, '2020-10-15 15:58:46', '2020-10-15 21:37:00', '016b0a043f', '88888888888888', 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/f253dbfb0fd5217943162346b5f48ccde162aae8.jpg');
INSERT INTO "public"."user" VALUES ('miyao', '51e2f5449a02d666d58b45a0e5a70daefc9b4767c2d062c20c531c0058f022c1', 1033, '2020-10-16 07:47:42', '2020-10-18 12:16:00', 'b9dcba82b5', '', 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/8ef6ac365d5ddb18a9a153c1b34e289567161dba.jpg');
INSERT INTO "public"."user" VALUES ('qeq', '15a7bd9bb59033e0db5d673a887239a811f183dd981b0aa7ec37f437ede85cbc', 1013, '2020-09-19 16:04:51', '2020-10-20 22:58:00', '0f6ee97dfd', NULL, 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/56d2ffdec1fc62ee8c792882604379e0562b54f1.jpg');
INSERT INTO "public"."user" VALUES ('wxs', '15a7bd9bb59033e0db5d673a887239a811f183dd981b0aa7ec37f437ede85cbc', 1001, '2020-09-19 16:04:51', '2020-10-23 01:37:00', '0f6ee97dfd', 'Just For Fun!', 'https://todo-1252371119.cos.ap-shanghai.myqcloud.com/avatar/8ef6ac365d5ddb18a9a153c1b34e289567161dba.jpg');
INSERT INTO "public"."user" VALUES ('quq', '15a7bd9bb59033e0db5d673a887239a811f183dd981b0aa7ec37f437ede85cbc', 1014, '2020-09-19 16:04:51', '2020-10-15 15:56:00', '0f6ee97dfd', '啊实打实的sssssss', NULL);
INSERT INTO "public"."user" VALUES ('admin', '1413cf7a3c8a50ad64f3b6e5f9ac6c3ed16d5b8a35e1f493c790a4116f49f948', 1029, '2020-09-26 02:30:19', '2020-10-15 13:04:00', '197017fe6f', '', NULL);
INSERT INTO "public"."user" VALUES ('gouwazi', '666666', 1004, '2020-09-19 16:04:51', '2020-09-19 16:04:00', NULL, NULL, NULL);
INSERT INTO "public"."user" VALUES ('奥里给', '15a7bd9bb59033e0db5d673a887239a811f183dd981b0aa7ec37f437ede85cbc', 1025, '2020-09-20 03:35:22', '2020-09-23 19:29:00', '0f6ee97dfd', NULL, NULL);
INSERT INTO "public"."user" VALUES ('老八!', '1d464255bf316292babf1e3e6977ff374f612ef35d3cb33ea0a31cea48d9f53c', 1026, '2020-09-20 03:35:22', '2020-09-23 19:29:00', '181e5b14a1', NULL, NULL);
INSERT INTO "public"."user" VALUES ('wxs1', '9a897972c52adbf90f7e2bd557bce4feafb0a8374334d8d1292fc78d54b91a51', 1030, '2020-09-27 05:51:54', '2020-09-27 05:51:00', 'fa2c676f7c', NULL, NULL);

-- ----------------------------
-- Function structure for init_todo
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."init_todo"();
CREATE OR REPLACE FUNCTION "public"."init_todo"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
declare
	random_date varchar;
	random_number numeric(1);
begin
	random_number=random();
	if new.end_date is null or char_length(new.end_date)=0 then
		if random_number>0.5 then
			new.end_date='海枯石烂';
		else 
			new.end_date='天荒地老';
		end if;
	end if;
	return new;
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for update_date
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."update_date"();
CREATE OR REPLACE FUNCTION "public"."update_date"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
BEGIN
          NEW.last_update := date_trunc('minute', localtimestamp);
        RETURN NEW;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for user_control
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."user_control"();
CREATE OR REPLACE FUNCTION "public"."user_control"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
--CREATE FUNCTION init_date() RETURNS TRIGGER AS $user$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
			RAISE EXCEPTION '禁止删除用户';
		END IF;
		
		IF NEW.create_date IS NULL THEN
            NEW.create_date := date_trunc('second', localtimestamp);
        END IF;
		
        RETURN NEW;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."todo_list_id_seq"', 136, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_id_seq"', 1034, true);

-- ----------------------------
-- Triggers structure for table todo_list
-- ----------------------------
CREATE TRIGGER "create_todo" BEFORE INSERT ON "public"."todo_list"
FOR EACH ROW
EXECUTE PROCEDURE "public"."init_todo"();
CREATE TRIGGER "update_content_date" BEFORE INSERT OR UPDATE ON "public"."todo_list"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_date"();

-- ----------------------------
-- Primary Key structure for table todo_list
-- ----------------------------
ALTER TABLE "public"."todo_list" ADD CONSTRAINT "todo_list_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Triggers structure for table user
-- ----------------------------
CREATE TRIGGER "init_or_delete" BEFORE INSERT OR DELETE ON "public"."user"
FOR EACH ROW
EXECUTE PROCEDURE "public"."user_control"();
CREATE TRIGGER "update_info" BEFORE INSERT OR UPDATE ON "public"."user"
FOR EACH ROW
EXECUTE PROCEDURE "public"."update_date"();

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table todo_list
-- ----------------------------
ALTER TABLE "public"."todo_list" ADD CONSTRAINT "todo用户id" FOREIGN KEY ("uid") REFERENCES "public"."user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
