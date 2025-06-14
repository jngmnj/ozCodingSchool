### 렉시컬 스코프 (Lexical Scope)

자바스크립트에서 **렉시컬 스코프**는 **변수의 유효 범위(scope)**가 **코드가 작성된 위치에 의해 결정**되는 특성을 말한다. 이는 실행 단계에서 **함수가 실행될 때 참조할 수 있는 변수의 범위**가 **함수 정의 시점**에 결정된다는 의미다.

자바스크립트는 **컴파일 단계**와 **실행 단계**를 순차적으로 거친다. 컴파일 단계에서는 **토크나이징**(문법 분석), **파싱**(구문 분석), 그리고 **코드 생성** 등의 작업을 통해 렉시컬 스코프가 만들어진다. 이 과정에서 **변수와 함수**의 스코프가 결정된다. **렉시컬 스코프**의 가장 큰 특징은 **예측 가능성**이다. 즉, **변수의 범위가 코드의 위치에 의해 명확히 결정되므로** 코드 흐름을 예측하기 쉽다.

렉시컬 스코프는 **자바스크립트의 최적화**(예: JIT 컴파일, 인라인 캐싱, 죽은 코드 제거 등)를 지원하는 데 중요한 역할을 하며, **변경되지 않기 때문에 안정적이고 효율적**이다. 그러나 with, eval, new Function 같은 구문은 **렉시컬 스코프를 변경**할 수 있기 때문에 **사용을 지양**해야 한다.

#### **with 구문**

-   with 구문은 **특정 객체**를 지정하고, 해당 객체의 속성을 **객체.속성** 대신 **변수처럼** 사용할 수 있게 해준다.
-   예를 들어, with(obj) 구문을 사용하면 객체의 프로퍼티를 **변수처럼 접근**할 수 있다.
-   **문제점**: with를 사용하면 **속성이 없는 변수에 접근할 때 렉시컬 스코프**를 따라 **외부 변수를 참조**하지만, 속성이 있다고 착각하고 호출하게 되면 **암묵적인 변수 선언**이 일어나 **스코프를 변경**하게 된다.
-   **최적화 방해**: with는 자바스크립트 엔진의 **최적화**를 방해할 수 있다. 예를 들어, **인라인 캐싱**이나 **JIT** 컴파일에서 성능 저하를 초래할 수 있으므로, 가능한 한 사용을 피하는 것이 좋다.

#### **eval**

-   eval 함수는 **문자열을 실행**하는 자바스크립트 구문이다.
-   eval을 사용할 때 **eval 내에서 실행되는 코드**는 **현재 스코프**에 영향을 미친다. 즉, 새로운 변수를 생성하거나 기존 변수를 수정할 수 있다.
-   eval도 **렉시컬 스코프**를 **변경할 수** 있기 때문에, 최적화가 어려워지고 코드의 예측 가능성이 낮아진다. 따라서 **eval의 사용은 피해야 한다.**

### 클로저 (Closure)

클로저는 **함수**가 **자신이 선언된 환경**(렉시컬 환경)을 기억하고 **외부 변수에 접근할 수 있는 특성**이다. 자바스크립트에서 함수는 **1급 객체**이므로, **함수**는 **변수에 할당**될 수 있고, **인자로 전달**되거나 **반환 값**으로 사용될 수 있다. 이로 인해 **함수가 외부 변수에 접근**하는 방식은 클로저를 통해 구현된다.

#### **클로저의 동작 원리**

```
function outer() {
    let ov = "outer!";
    function inner() {
        let iv = "inner!";
        console.log(ov); // outer!
        console.log(iv); // inner!
    }
    return inner;
}

const newFn = outer();
newFn(); // inner 함수 호출
```

-   **outer 함수** 내에서 **inner 함수**를 정의하고, 이를 반환한다.
-   **inner 함수**는 **outer 함수**의 변수 ov에 접근할 수 있다. 즉, **inner 함수는 outer 함수의 스코프를 기억**하고 있기 때문에 ov에 접근할 수 있는 **클로저**가 형성된다.
-   클로저는 **렉시컬 환경을 기억**하는 특성으로, outer 함수가 끝난 후에도 **inner 함수**는 ov와 iv를 계속 참조할 수 있다.

#### **클로저의 주요 특성**

1.  **변수의 생명 주기 유지**: 일반적으로 함수 내에서 선언된 변수는 함수 실행이 끝나면 사라지지만, **클로저를 사용하면** 함수가 종료된 후에도 **그 변수들이 계속 유지**된다.
2.  **렉시컬 환경**: 클로저는 **함수가 선언될 때의 환경을 기억**한다. 이 환경에는 함수가 선언된 위치의 외부 변수들에 대한 **참조**가 포함된다.
3.  **메모리 관리 문제**: 클로저를 사용할 때 **메모리 누수**가 발생할 수 있다. 클로저가 **오래된 상태**를 계속 참조하기 때문에 필요 없는 변수들이 메모리에 남을 수 있다. (이 문제는 간단하게 해결가능하다. 필요성이 사라진 시점에 참조 카운트 0으로 만들면 된다. 즉, 식별자에 참조형이 아닌 기본형 데이터-보통 null or undefined-를 할당하면 된다. - 코어 자바스크립트)

#### **고차 함수 (Higher-Order Function)**

-   고차 함수는 **다른 함수를 인자로 받거나, 함수를 반환하는 함수**이다. 자바스크립트에서 함수는 1급 객체이므로, 이를 자유롭게 다룰 수 있다.
-   여기서 **`makeAdder`**는 **고차 함수**이다. `x`를 인자로 받아 `y`와 더하는 함수(내부 함수)를 반환한다.

  ```javascript
  function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }

  const add5 = makeAdder(5);
  console.log(add5(3)); // 8
  ```

### **1급 객체 (First-Class Object)**

**1급 객체**란 **변수에 할당**하거나, **함수의 인자로 전달**하거나, **반환 값으로 사용**될 수 있는 객체를 말한다. 자바스크립트에서는 **함수**가 1급 객체이다.

#### **1급 객체의 특성**

1.  **변수에 할당 가능**: 함수를 변수에 할당할 수 있다.
2.  **인자로 전달 가능**: 함수를 다른 함수의 인자로 전달할 수 있다.
3.  **반환값으로 사용 가능**: 함수를 다른 함수에서 반환할 수 있다.
4.  **런타임에 생성 가능**: 실행 중에 동적으로 함수를 생성할 수 있다.
5.  **익명 함수 가능**: 이름 없는 함수를 사용할 수 있다.

### **결론**

-   **렉시컬 스코프**는 변수의 유효 범위가 코드 작성 시점에 결정되며, **예측 가능하고 최적화**가 용이한 특징이 있다. 하지만 with, eval, new Function 등의 구문은 이를 변경할 수 있어 사용을 지양해야 한다.
-   **클로저**는 함수가 **자신이 선언된 환경**을 기억하여 외부 변수에 접근하는 특성을 가집니다. 이로 인해 **변수 생명 주기**가 함수 종료 후에도 유지되며, 메모리 관리 문제를 유발할 수 있다.
-   **고차 함수**는 함수를 인자로 전달하거나 반환하는 함수로, 자바스크립트에서 중요한 개념이다.