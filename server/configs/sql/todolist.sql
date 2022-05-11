/*
 Navicat Premium Data Transfer

 Source Server         : TX-DST-PG
 Source Server Type    : PostgreSQL
 Source Server Version : 140001
 Source Host           : localhost:5432
 Source Catalog        : todolist
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140001
 File Encoding         : 65001

 Date: 10/05/2022 23:50:17
*/


-- ----------------------------
-- Sequence structure for Todo_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Todo_id_seq";
CREATE SEQUENCE "public"."Todo_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for User_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."User_id_seq";
CREATE SEQUENCE "public"."User_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Todo
-- ----------------------------
DROP TABLE IF EXISTS "public"."Todo";
CREATE TABLE "public"."Todo" (
  "id" int4 NOT NULL DEFAULT nextval('"Todo_id_seq"'::regclass),
  "uid" int4 NOT NULL,
  "content" text COLLATE "pg_catalog"."default" NOT NULL,
  "complete" bool NOT NULL DEFAULT false,
  "createAt" timestamptz(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "deadlineAt" date,
  "updateAt" timestamptz(0) NOT NULL
)
;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS "public"."User";
CREATE TABLE "public"."User" (
  "id" int4 NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "passwd" text COLLATE "pg_catalog"."default" NOT NULL,
  "salt" text COLLATE "pg_catalog"."default" NOT NULL,
  "createAt" timestamptz(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updateAt" timestamptz(0) NOT NULL,
  "status" text COLLATE "pg_catalog"."default",
  "avatar" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Function structure for actionControl
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."actionControl"();
CREATE OR REPLACE FUNCTION "public"."actionControl"()
  RETURNS "pg_catalog"."trigger" AS $BODY$
    BEGIN
        IF (TG_OP = 'DELETE') THEN
			RAISE EXCEPTION '禁止删除用户';
		END IF;
    END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Function structure for initTodo
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."initTodo"();
CREATE OR REPLACE FUNCTION "public"."initTodo"()
  RETURNS "pg_catalog"."trigger" AS $BODY$declare
	random_date varchar;
	random_number numeric(1);
begin
	random_number=random();
	if new.deadlineAt is null then
		if random_number>0.5 then
			new.deadlineAt='海枯石烂';
		else 
			new.deadlineAt='天荒地老';
		end if;
	end if;
	--return new;
end;$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Todo_id_seq"
OWNED BY "public"."Todo"."id";
SELECT setval('"public"."Todo_id_seq"', 42, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."User_id_seq"
OWNED BY "public"."User"."id";
SELECT setval('"public"."User_id_seq"', 6, true);

-- ----------------------------
-- Triggers structure for table Todo
-- ----------------------------
CREATE TRIGGER "createTodo" BEFORE INSERT ON "public"."Todo"
FOR EACH ROW
EXECUTE PROCEDURE "public"."initTodo"();
ALTER TABLE "public"."Todo" DISABLE TRIGGER "createTodo";

-- ----------------------------
-- Primary Key structure for table Todo
-- ----------------------------
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table User
-- ----------------------------
CREATE UNIQUE INDEX "User_name_key" ON "public"."User" USING btree (
  "name" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Triggers structure for table User
-- ----------------------------
CREATE TRIGGER "userControl" BEFORE DELETE ON "public"."User"
FOR EACH ROW
EXECUTE PROCEDURE "public"."actionControl"();

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE "public"."User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "public"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table Todo
-- ----------------------------
ALTER TABLE "public"."Todo" ADD CONSTRAINT "Todo_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
