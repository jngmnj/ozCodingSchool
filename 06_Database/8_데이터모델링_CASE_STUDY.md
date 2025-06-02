# 데이터 모델링 CASE STUDY
추가 요구사항에 맞게 Pagila DB 확장

## 요구사항
- 고객들이 영화를 관람 후 후기를 남길 수 있다. (Comment)
- 영화에 Reaction을 할 수 있다. (Like, Heart, Smile, Angry …)
- 영화 후기에 다른 고객 Mention을 할 수 있다. (@cosanam)
- Mention 받은 고객은 Notification을 받을 수 있다.


## Comment 기능 데이터 모델링 DBML 코드
- 고객들이 영화를 관람 후 후기를 남길 수 있다. (Comment)
- 영화에 대한 글이 있어야 한다. (film_post)
- 글에는 후기(댓글)을 남길 수 있다.
- 영화에 댓글은 여러 개 있을 수 있다. (1:n)
- 즉, 고객은 댓글을 여러 개 남길 수 있다. (1:n)
```
// DBDiagram.io에서 아래 DBML 코드를 입력하고 실습해 보세요.
Table customer {
    customer_id int [pk, increment]
    store_id int
    first_name varchar(45)
    last_name varchar(45)
    email varchar(50)
    address_id int
    activebool bool
    create_date date
    last_update timestamp
    active int
}

Table film {
    film_id int [pk, increment]
    title varchar(255)
    description text
    release_year year
    language_id int
    rental_duration int
    rental_rate numeric(4,2)
    length int
    replacement_cost numeric(5,2)
    rating mpaa_rating
    last_update timestamp
    special_features text[]
    fulltext tsvector
}

Table film_post { 
  post_id int [pk, increment]
  film_id int c
  content text
  created_at datetime
  updated_at datetime
}

Table film_comment {
  comment_id int [pk, increment]
  // film_comment > customer = 1:n
  customer_id int [ref: > customer.customer_id]
  post_id int [ref: > film_post.post_id]
  content text
  created_at datetime
  updated_at datetime
}
```
```sql
CREATE TABLE film_post (
  post_id SERIAL PRIMARY KEY,
  film_id int,
  content text,
  created_at timestamp,
  updated_at timestamp
);

ALTER TABLE "film_post" ADD FOREIGN KEY ("film_id") REFERENCES "film" ("film_id");

CREATE TABLE film_comment (
  comment_id SERIAL PRIMARY KEY,
  post_id int,
  customer_id int,
  content text,
  created_at timestamp,
  updated_at timestamp
);

ALTER TABLE "film_comment" ADD FOREIGN KEY ("post_id") REFERENCES "film_post" ("post_id");
ALTER TABLE "film_comment" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
```

##  Reaction 기능 데이터 모델링 DBML 코드
- 영화 Post에 Reaction을 할 수 있다. (Like, Heart, Smile, Angry)
- 글에 Reaction을 여러 개 남길 수 있다. (1:n)
- 고객 1 -> 글 1 + 리액션 1
- 고객은 (여러 글에) 리액션을 여러 개 남길 수 있다. (1:n)

- n:n관계 → post_reaction 테이블이 생김
- reaction_type 테이블로 나눴을때(아래)는 리액션 종류가 많거나 변경될 가능성이 크다면 적합!  ⇒ 데이터확장성
엄밀한 정규화테이블이 된다.
- reaction_type을 컬럼에 그냥 바로 작성하는것(위)은 리액션 종류가 적고 단순할때 유리하고, 쿼리가 간단해짐
```dbml
Enum reaction_type {
  LIKE
  HEART
  SMILE
  ANGRY
}

Table post_reaction {
  reaction_id int [pk, increment]
  reaction_type reaction_type
  post_id int [ref: > film_post.post_id]
  customer_id int [ref: > customer.customer_id]
  created_at datetime

  // post_id, customer_id - 복합 유니크 제약조건
}
```

```sql
CREATE TYPE reaction_type AS ENUM (
  'LIKE',
  'HEART',
  'SMILE',
  'ANGRY'
);

CREATE TABLE post_reaction (
  reaction_id SERIAL PRIMARY KEY,
  reaction_type reaction_type,
  post_id int,
  customer_id int,
  created_at timestamp
);

ALTER TABLE "post_reaction" ADD FOREIGN KEY ("post_id") REFERENCES "film_post" ("post_id");
ALTER TABLE "post_reaction" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");
ALTER TABLE "post_reaction" ADD CONSTRAINT "unique_post_customer" UNIQUE ("post_id", "customer_id"); -- [1, 1] [1, 2], [1, 1] (X)
```
##  Mention 기능 데이터 모델링 DBML 코드
- 영화 후기에 다른 고객 Mention을 할 수 있다.
- 고객은 다른 고객을 Mention할 수 있다. (1:n)
- 하나의 댓글에 여러 Mention을 할 수 있다. (1:n)
```dbml
Table customer {
    customer_id int [pk, increment]
    store_id int
    first_name varchar(45)
    last_name varchar(45)
    email varchar(50)
    address_id int
    activebool bool
    create_date date
    last_update timestamp
    active int
}

Table film_comment {
  comment_id int [pk, increment]
  post_id int [ref: > film_post.post_id]
  customer_id int [ref: > customer.customer_id]
  content text
  created_at datetime
  updated_at datetime
}

Table mention {
  mention_id int [pk, increment]
  created_at datetime
  comment_id int [ref: > film_comment.comment_id]
  mentioned_customer_id int [ref: > customer.customer_id]
}
```
```sql
CREATE TABLE mention (
	mention_id SERIAL PRIMARY KEY,
	created_at TIMESTAMP,
	comment_id INT,
	mentioned_customer_id INT
);

ALTER TABLE "mention" ADD FOREIGN KEY ("comment_id") REFERENCES "film_comment" ("comment_id");
ALTER TABLE "mention" ADD FOREIGN KEY ("mentioned_customer_id") REFERENCES "customer" ("customer_id");
```

## Notification 기능
- Mention 받은 고객은 Notification을 받을 수 있다.
- Mention에 알림은 하나만 존재한다. (1:1)
- 고객은 여러 번 Notification을 받을 수 있다. (1:n)
```dbml
Table mention {
  mention_id int [pk, increment]
  created_at datetime
  comment_id int [ref: > film_comment.comment_id]
  mentioned_customer_id int [ref: > customer.customer_id]
}

Table notification {
  notification_id int [pk, increment]
  mentioner_id int [ref: > customer.customer_id]
  mention_id int [ref: - mention.mention_id]
  content text
  created_at datetime
  is_read boolean // default false
  read_at datetime
}
```
```sql
CREATE TABLE notification (
	notification_id SERIAL PRIMARY KEY,
	mentioner_id INT,
	mention_id INT UNIQUE,
	content TEXT,
	created_at TIMESTAMP,
	is_read BOOLEAN,
	read_at TIMESTAMP
);

ALTER TABLE "notification" ADD FOREIGN KEY ("mentioner_id") REFERENCES "customer" ("customer_id");
ALTER TABLE "notification" ADD FOREIGN KEY ("mention_id") REFERENCES "mention" ("mention_id");
```