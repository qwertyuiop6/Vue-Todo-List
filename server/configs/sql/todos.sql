/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : PostgreSQL
 Source Server Version : 130000
 Source Host           : localhost:5432
 Source Catalog        : todos
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130000
 File Encoding         : 65001

 Date: 23/10/2020 23:13:58
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
SELECT setval('"public"."todo_list_id_seq"', 170, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"public"."user_id_seq"', 1035, true);

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
