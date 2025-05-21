# 3\. SQL기초문법

## SQL이란?
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdTAWo8%2FbtsN22bEl1m%2FfGMKqtv6IQWz4gFf8AHonk%2Fimg.png)

### **SQL이란 ?**
Structured Query Language(구조화된 질의 언어)의 약자로, 관계형 데이터베이스(RDBMS)에서 데이터를 정의, 조회, 조작, 제어하기 위해 사용된다. Oracle, MySQL, PostgreSQL, SQLite, SQL Server 등 다양한 DBMS에서 사용된다.

### **SQL 구문의 특징**
- **대소문자를 구분하지 않음** (관례적으로는 대문자 사용)
- **세미콜론(;)으로 구문을 종료**
  - 한 SQL 문장의 끝을 명확히 구분하기 위해 ;를 사용
- **문장 순서가 중요함**
  - 예: SELECT 다음에 FROM, 그 다음에 WHERE이 와야 합니다. 순서를 바꾸오류 발생
- **영어 문법과 유사한 구조**
  - SELECT name FROM users WHERE age > 20; 처럼 읽기 쉬운 구조를 가짐
- **명확하고 선언적인 언어**
  - **무엇을** 할지를 선언하며, **어떻게** 수행할지는 DBMS가 처리

## SQL 종류

| **분류** | 풀네임 | 설명 | 주요 명령어 |
| --- | --- | --- | --- |
| **DDL** | Data Definition Language 데이터 정의어 | 데이터 구조를 정의하기 위한 언어 | CREATE, DROP, ALTER, ... |
| **DML** | Data Manipulation Language 데이터 조작어 | 데이터를 조회하고 조작하기 위한 언어 | SELECT, INSERT, UPDATE, DELETE, ... |
| **DCL** | Data Control Language 데이터 제어어 | 데이터베이스 접근 권한 및 회수를 위한 언어 | GRANT, REVOKE, ... |
| **TCL** | Transaction Control Language 트랜잭션 제어어 | 트랜잭션 단위로 작업을 제어하기 위한 언어 | COMMIT, ROLLBACK, END, ... |

## SQL 기본문법
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fyjsmi%2FbtsN37QOkfn%2FF806tDbGUH7Q9x1R9WuceK%2Fimg.png)

- 쿼리문을 다 작성하고 나서 세미콜론(;)을 꼭 작성
- 대소문자를 구별하지는 않지만. 키워드는 대문자, 식별자는 소문자, snake\_case로 작성하는것이 관례
- 데이터베이스 생성 및 삭제

### 데이터베이스 생성/삭제
```sql
CREATE DATABASE my_database;
DROP DATABASE my_database;
```

### 테이블생성

```sql
CREATE TABLE accommodation (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  rating DECIMAL(3, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 테이블삭제

```sql
DROP TABLE accommodation
DROP TABLE IF EXISTS accommodation
```

## 데이터타입

### 문자열 타입
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdhD3Ee%2FbtsN18RaOdv%2FPq8gtm9ICf5NyTIyoslwd0%2Fimg.png)

postgreSQL 16버전 공식문서에 따르면 문자열 3가지 타입간 성능차이는 없음

### Boolean 타입
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCascY%2FbtsN4CvLWqU%2FL5LUJvgCGksKtMeX0jwg2k%2Fimg.png)

```sql
CREATE TABLE users (
...
cookie_agreement BOOLEAN DEFAULT FALSE
);

UPDATE users
SET cookie_agreement = TRUE, updated_at = CURRENT_TIMESTAMP
WHERE user_id = 1;
```

### Enum 타입
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbFpetA%2FbtsN4PIA5le%2FjvzcsoipYZ09lpj3QIhI4K%2Fimg.png)

### 숫자타입
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F5Nd9y%2FbtsN32vdfLq%2FWWdD3k1f01CYXTuZ3qKKy0%2Fimg.png)

serial은 autoincrement 할수있어 Id값으로 많이 쓰임

### DateTime
![Image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJ7kiR%2FbtsN4pcjOqb%2Fkmtk39hkUFNgd0q7FqV8Hk%2Fimg.png)
timestamp(3)이 널리 쓰임

## SQL 기초문법

### SELECT INTO

```sql
INSERT INTO accommodation (
  name, address, city, country, phone_number, email, website, price_per_night, rating, description, total_visit, monthly_visit, created_at, updated_at
) VALUES 
('Sunrise Hotel', '123 Sunny St', 'Sunville', 'Sunnyland', '123-456-7890', 'contact@sunrisehotel.com', 'www.sunrisehotel.com', 120.00, 4.5, 'A beautiful hotel with a sunny disposition.', 500, 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
```

### SELECT

```sql
-- 평점 4. 5점 이상
SELECT * FROM accommodation WHERE rating >= 4.5;

-- 평점 4.5점 이상 4.6 이하
SELECT * FROM accommodation WHERE rating BETWEEN 4.5 AND 4.6;

-- ID가 1, 3
SELECT * FROM accommodation WHERE id IN (1, 3);

-- ID가 1, 3이 아님
SELECT * FROM accommodation WHERE id NOT IN (1, 3);

-- 중복되지 않는 고유한 City 값을 선택
SELECT DISTINCT city FROM accommodation;

-- 전체 평점 평균
SELECT AVG(rating) as avg_rating FROM accommodation;

-- 내림차순(큰것부터)
SELECT * FROM accommodation ORDER BY rating DESC; 

-- 평점 상위 2개
SELECT * FRMO accommodation ORDER BY rating DESC LIMIT 2;
```

### UPDATE

```sql
-- WHERE 조건에 해당하는 여러 로우의 값을 변경
-- 기존의 rating 값을 활용할 수 있음
UPDATE accommodation
SET rating= rating + 0.1, description ='서비스 개선'
WHERE city = 'Medellin' AND rating < 5.0;
```

데이터수정은 주의가 필요하다.

```sql
SELECT *
FROM accommodation
WHERE city = 'Chiang Mai';
```

데이터 수정 전, 어떤로우가 영향을 미칠지 먼저 파악한다.

```sql
UPDATE accommodation
SET rating = rating + 0.1
WHERE city = 'Chiang Mai'
RETURNING *;
```

`RETURNING *` 구문으로 영향받는 로우를 바로 조회해 본다.
`RETURNING *` : **실제로 데이터를 업데이트한 후**, **영향받은 행들을 반환한다.**

- 미리 백업작업을 하거나
- 덤프를 따놓거나 DB를 제공하는 클라우드의 기능을 활용한다.
```sql
-- UPDATE문 
UPDATE 테이블명 
SET [컬럼명 = 변경값, ···] 
WHERE 조건
```
### 정리
#### 변경 가능 범위
- 하나의 로우
- 하나의 값 하나의 로우
- 여러개의 값 여러개의 로우
- 여러개의 값

#### WHERE 주의점
- WHERE를 빼먹는 경우 
- WHERE 조건이 잘못된 경우

#### UPDATE 할 때 꼭 지키기
- SELECT로 먼저 영향받는 로우 확인
- RETURNING으로 실제 영향받은 로우 확인
- 중요한 DB의 경우 백업을 미리 진행
- 애매하면 무조건 시니어, 선임과 상의하기

### DELETE

```sql
-- id가 1인 로우 삭제
DELETE FROM accommodation
WHERE id = 1;

-- 평점이 4. 8보다 낮은 로우 삭제
DELETE FROM accommodation
WHERE rating < 4.8;
```

