const r_num = /\d/
const r_space = /\s/
const num = Symbol('Number')
const add = Symbol('Addition')
const sub = Symbol('Subtraction')
const mul = Symbol('Multiplication')
const div = Symbol('Division')
function lexp(str) {
    console.log(str)
    let exps = new Map(), first_exp = null, now_exp = null, par_exp = null
    for (let i = 0; i < str.length; i++){
        let s = str[i]
        if (r_num.test(s)) {
            console.log(`%cnum [${s}]`,'color:#fcfcfc;background:#4fc08d;border-radius:5px;padding:2px 5px;')
            if (now_exp == null) {
                if (par_exp == null) {
                    first_exp = par_exp = now_exp = Symbol('mul')
                    const c_exp = Symbol('num')
                    exps.set(now_exp, {
                        type: mul,
                        childs: [c_exp],
                        par: null
                    })
                    now_exp = c_exp
                    exps.set(now_exp, {
                        type: num,
                        strs: [s],
                        par: par_exp
                    })
                } else {
                    now_exp = Symbol('num')
                    const par = exps.get(par_exp)
                    par.childs.push(now_exp)
                    exps.set(now_exp, {
                        type: num,
                        strs: [s],
                        par: par_exp
                    })
                }
            } else {
                const exp = exps.get(now_exp)
                if (exp.type == num) {
                    exp.strs.push(s)
                }
            }
        } else if (r_space.test(s)) {
            console.log(`%cspa [${s}]`, 'color:#fcfcfc;background:#acacac;border-radius:5px;padding:2px 5px;')
            if (now_exp != null) {
                const exp = exps.get(now_exp)
                if (exp.type == num) {
                    now_exp = null
                    continue
                }
            }
        } else if (s == '+') {
            console.log(`%cadd [${s}]`, 'color:#fcfcfc;background:#4671d5;border-radius:5px;padding:2px 5px;')
            when_operator('add', add)
        } else if (s == '-') {
            console.log(`%csub [${s}]`, 'color:#fcfcfc;background:#03899c;border-radius:5px;padding:2px 5px;')
            when_operator('sub', sub)
        } else if (s == '*' || s == '×') {
            console.log(`%cmul [${s}]`, 'color:#fcfcfc;background:#454545;border-radius:5px;padding:2px 5px;')
            when_operator('mul', mul)
        } else if (s == '/' || s == '÷') {
            console.log(`%cdiv [${s}]`, 'color:#fcfcfc;background:#94256d;border-radius:5px;padding:2px 5px;')
            when_operator('div', div)
        } else if (s == ',') {
            console.log(`%cclo [${s}]`, `color:#fcfcfc;background:#787878;border-radius:5px;padding:2px 5px;`)
            const the_par_exp = exps.get(par_exp)
            par_exp = the_par_exp.par
            now_exp = null
        } else if (s == ';') {
            console.log(`%cbac [${s}]`, 'color:#fcfcfc;background:#787878;border-radius:5px;padding:2px 5px;')
            now_exp = null
            let the_par_exp = exps.get(par_exp)
            the_par_exp = exps.get(the_par_exp.par)
            while (the_par_exp != null) {
                par_exp = the_par_exp.par
                the_par_exp = exps.get(the_par_exp.par)
                if (the_par_exp.childs[0] != null) {
                    const the_pp_exp = exps.get(the_par_exp.childs[0])
                    if (the_pp_exp.type != num) {
                        break
                    }
                }
            }
        }
    }
    function when_operator(name,symbol) {
        if (now_exp == null) {
            if (par_exp == null) {
                first_exp = par_exp = Symbol(name)
                exps.set(par_exp, {
                    type: symbol,
                    childs: [],
                    par: null
                })
            } else {
                const the_par_exp = exps.get(par_exp), exp = Symbol(name)
                exps.set(exp, {
                    type: symbol,
                    childs: [],
                    par: par_exp
                })
                the_par_exp.childs.push(exp)
                par_exp = exp
            }
        } else {
            const the_par_exp = exps.get(par_exp)
            now_exp = null
            const exp = Symbol(name)
            exps.set(exp, {
                type: symbol,
                childs: [],
                par: par_exp
            })
            the_par_exp.childs.push(exp)
            par_exp = exp
        }
    }
    //AST ↑
    //debug ↓
    function showTree(exp_id) {
        const exp = exps.get(exp_id)
        switch (exp.type) {
            case mul:
                console.group(`%cmul`, 'color:#fcfcfc;background:#454545;border-radius:5px;padding:2px 5px;')
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        console.log(child.strs.join(''))
                    } else {
                        showTree(i)
                    }
                })
                console.groupEnd()
                break
            case add:
                console.group(`%cadd`, 'color:#fcfcfc;background:#4671d5;border-radius:5px;padding:2px 5px;')
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        console.log(child.strs.join(''))
                    } else {
                        showTree(i)
                    }
                })
                console.groupEnd()
                break
            case sub:
                console.group(`%csub`, 'color:#fcfcfc;background:#03899c;border-radius:5px;padding:2px 5px;')
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        console.log(child.strs.join(''))
                    } else {
                        showTree(i)
                    }
                })
                console.groupEnd()
                break
            case div:
                console.group(`%cdiv`, 'color:#fcfcfc;background:#94256d;border-radius:5px;padding:2px 5px;')
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        console.log(child.strs.join(''))
                    } else {
                        showTree(i)
                    }
                })
                console.groupEnd()
                break
        }
    }
    showTree(first_exp)
    function docom(exp_id) {
        const exp = exps.get(exp_id)
        let comout = NaN, first = true
        switch (exp.type) {
            case mul:
                comout = 1
                if (exp.childs.length <= 0) return NaN
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        comout *= +(child.strs.join('')) 
                    } else {
                        const ret = docom(i)
                        comout *= ret == NaN ? 1 : ret
                    }
                })
                break
            case add:
                comout = 0
                if (exp.childs.length <= 0) return NaN
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        comout += +(child.strs.join(''))
                    } else {
                        const ret = docom(i)
                        comout += ret == NaN ? 0 : ret
                    } 
                })
                break
            case sub:
                if (exp.childs.length <= 0) return NaN
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        const d = +(child.strs.join(''))
                        if (first) {
                            first = false
                            comout = d
                        } else {
                            comout -= d
                        }
                    } else {
                        if (first) {
                            first = false
                            comout = docom(i)
                        } else {
                            const ret = docom(i)
                            comout -= ret == NaN ? 0 : ret
                        }
                    }
                })
                break
            case div:
                if (exp.childs.length <= 0) return NaN
                exp.childs.forEach(i => {
                    const child = exps.get(i)
                    if (child.type == num) {
                        const d = +(child.strs.join(''))
                        if (first) {
                            first = false
                            comout = d
                        } else {
                            comout /= d == 0 ? 1 : d
                        }
                    } else {
                        if (first) {
                            first = false
                            comout = docom(i)
                        } else {
                            const ret = docom(i)
                            comout /= (ret == NaN || ret == 0) ? 1 : ret
                        }
                    }
                })
                break
        }
        return comout
    }
    const comres = docom(first_exp)
    console.log(`%cComOut: [ %c${comres}%c ]%c `,
        'color:#fcfcfc;background:#565656;border-top-left-radius:0.5em;border-bottom-left-radius:0.5em;padding:0.2em 0.5em;',
        'color:#fcfcfc;background:#4671d5;padding:0.2em 0.5em;margin-left:-0.5em;border-radius:0.5em;padding-left:0.6em;',
        `color:#fcfcfc;background:#565656;border-top-right-radius:0.5em;border-bottom-right-radius:0.5em;padding:0.2em 0.5em;
        margin-left:-0.5em;
        `,`background:#4671d5;padding:0.2em 0;border-top-right-radius:0.5em;border-bottom-right-radius:0.5em;margin-left:-2.1em;`
)
    return comres
}
