### It is an extended version of a Prefix Notation(Polish notation)
### 这是一个前缀表达式(波兰表达式)的扩展

## Syntax 语法
> No float support temporarily 暂时不支持浮点数
- Default is Multiplication 默认是乘法
  ```
  1 2 = 1 * 2
  ```
- Can multiple values 可以一次计算多个值
  ```
  +1 2 3 4 5 = 1 + 2 + 3 + 4 + 5
  ```
- `,` The Closure 闭合符  
  ```
  /-2 1,3 = (2 - 1) / 3
  ```
- `;` The Back 返回符  
    Back to two consecutive operators  
    返回到两个连续的操作符处
  ```
  /-2+5 1;3 = (2 - (5 + 1)) / 3
  ↑      ↓
  ←-←-←-←-
  ```
```
**/3+1*9 0;8,2 = ((3 / (1 + (9 * 0))) * 8) * 2
↑↑        ↓ ↓
↑ ↖←-←-←-↙ ↓
↖-←-←-←-←-←↙
```
[Try Online](http://static.abits.io/l-exp/)  
**lexp** ( exp_str : `string` ) => com_res : `number`  
Example:
```javascript
lexp('**/3+1*9 0;8,2')
```
<br><br><br><br><br><br>
I bet someone already thought of this.  
我感觉肯定早就有人想出这个了
