
let plusbutton = document.getElementById('plusbutton')
let form = document.getElementById('form')
let clearbutton = document.getElementById('clearButton')
form.onsubmit = (event) =>
{
    event.preventDefault()
    let inputfield = document.getElementById('userinput')
    inputfield.value = ''
}

let todos = []
let current = -1

plusbutton.onclick = () => {
    if (validateInput() == false)
        return
    let form = document.getElementById('form')
    form.classList.remove('invalidbox')
    addtodo()   
}
clearbutton.onclick = () => {
    clearCompleted()
}
function addtodo()
{
    //getting text from field
    let txt = document.getElementById('userinput').value
    todos.push(txt)
    current++
    let t = document.getElementById('todos')
    if (current == 0)
        t.className = 'nobackground'
    let li = document.createElement('li')
    let div = document.createElement('div')
    div.className = 'outerdiv'
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    let img = new Image()
    img.src = './images/icon-cross.svg'
    img.className = 'crossimage'
    img.id = current.toString()
    img.onclick = () =>{
        let id = img.id
        //swapElements(todos, id, todos.length - 1)
        /*if (id >= todos.length)
            todos.pop()
        else
            todos.splice(id, 1)*/
        todos[id] = null
        updateTodos()
    }
    let ul = document.getElementById('todolist')
    if (current == 0)
    {
        ul.innerHTML = ''
        ul.className = ''
    }
    span1.className = 'circle'
    span2.className = 'todotext'
    span2.innerHTML = todos[current]
    div.append(span1)
    div.append(span2)
    div.append(img)
    li.append(div)
    ul.append(li)
}
function updateTodos()
{
    let ul = document.getElementById('todolist')
    const li = ul.getElementsByTagName('li')
    for (let i = 0; i < li.length; i++)
    {
        let div = li[i].getElementsByClassName('outerdiv')[0]
        let span = div.getElementsByClassName('todotext')[0]
        let imgspan = div.getElementsByClassName('circle')[0]
        if (span.classList.contains('linetext'))    //if already class exists
            continue;
        //console.log(span.innerHTML.toString())
        if (!(todos.includes(span.innerHTML.toString())))
        {
            span.classList.add('linetext')
            let img = new Image()
            img.src = './images/icon-check.svg'
            imgspan.classList.add('circlewithtick')
            imgspan.append(img)
            break;
        }
    }
}
async function clearCompleted()
{
    let ul = document.getElementById('todolist')
    const li = ul.getElementsByTagName('li')
    let i = 0
    while (i < li.length)
    {
        let div = li[i].getElementsByClassName('outerdiv')[0]
        let span = div.getElementsByClassName('todotext')[0]
        if (!(todos.includes(span.innerHTML.toString())))
        {
            li[i].classList.add('moveright')
            await removeElement(li[i])
            continue
        }
        i++
    }
    todos = todos.filter((e) => {
        return e != null;
      })
    if (todos.length == 0)
      location.reload()
}
async function removeElement(li)
{
    return new Promise((resolve) => {
        setTimeout(() => {
            li.remove()
            resolve('success')
        }, 500)
    })
}
function validateInput()
{
    let txt = document.getElementById('userinput').value
    if (txt.length == 0 || todos.includes(txt))
    {
        let form = document.getElementById('form')
        form.classList.add('invalidbox')
        return false
    }
    return true
}