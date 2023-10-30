function PageLoaded() {
    let $pencil = window.pencil;
    let $input = document.querySelector('.lists')
    let $ul = document.querySelector('.todos')
    // let $span = document.querySelector('.fa-trash-alt')
    let $filter = document.querySelector('.filter')
    let $clear = document.querySelector('.clear')
    let $tipBtn = document.querySelector('.tipBtn')
    let $overlay = document.querySelector('#overlay')
    let $closebtn = document.querySelector('.closebtn')


    loadTodos();
    deleteItem();
    importantItem()
    $input.addEventListener('keypress', function (key) {
        if (key.which != 13) {
            return
        }
        if (!/\w/.test(this.value)) {
            return
        }

        let li = document.createElement('li')
        let span = document.createElement('span')
        let icon = document.createElement('i')
        icon.setAttribute('class', 'fas fa-trash-alt')
        span.insertAdjacentElement('afterbegin', icon)
        li.textContent = this.value
        span.addEventListener('click', () => {
            span.parentElement.remove()
        })
        let span2 = document.createElement('span')
        let icon2 = document.createElement('i')
        icon2.setAttribute('class', 'fas fa-exclamation')
        span2.addEventListener('click', () => {
            span.parentElement.classList.toggle('important')
        })
        span2.insertAdjacentElement('beforeend', icon2)
        li.insertAdjacentElement('beforeend', span2)
        li.insertAdjacentElement('afterbegin', span)
        $ul.insertAdjacentElement('beforeend', li)
        this.value = ''
        save();

    })

    $clear.addEventListener('click', () => {
        localStorage.clear()
        $ul.innerHTML = ''
    })

    $ul.addEventListener('click', (e) => {
        if (e.target.tagName == 'LI') {
            e.target.classList.toggle('checked')
            save();
        }
        // //test
        // console.log(document.querySelectorAll('.todos li'))
        // document.querySelectorAll('.todos li').forEach((item) => {
        //     console.log("class ::",item.getAttribute('class'))
        // })
        // //
    })

    $tipBtn.addEventListener('click', () => {
        $overlay.style.height = '100vh'
    })

    $closebtn.addEventListener('click', () => {
        $overlay.style.height = '0'
    })

    $pencil.addEventListener('click', () => {
        $input.classList.toggle('display')
    })

    function loadTodos() {
        if (localStorage.getItem('todos')) {
            $ul.innerHTML = localStorage.getItem('todos')
        }
    }
    function deleteItem() {
        let $li = document.querySelectorAll('.todos li span:first-child')
        for (let i = 0; i < $li.length; i++) {
            $li[i].addEventListener('click', () => {
                $li[i].parentElement.remove()
                save();
            })
        }
    }

    function importantItem() {
        let $li = document.querySelectorAll('.todos li span:last-child')
        for (let i = 0; i < $li.length; i++) {
            $li[i].addEventListener('click', () => {
                $li[i].parentElement.classList.toggle('important')
                save()
            })
        }
    }

    function save() {
        localStorage.setItem('todos', $ul.innerHTML)
    }

    function getList() {
        let list = localStorage.getItem('todos').split('</li>')
        list = list.map((item) => item + '</li>')
        if (list[list.length - 1].indexOf('<li') == -1) {
            list.pop()
        }
        return list
    }

    $filter.addEventListener('click',function(){
        let nameBtn = ['All','Done','Active','Important']
        let index = nameBtn.indexOf(this.textContent)
        index++
        if(index === nameBtn.length) index = 0
        this.textContent = nameBtn[index]
        filterList()
    })

    function filterList() {

        switch ($filter.textContent) {
            case 'All': {
                $ul.innerHTML = localStorage.getItem('todos')
                break
            }
            case 'Done': {
                $ul.innerHTML = getList().filter((item)=>item.indexOf('checked')!= -1).join('')
                break
            }
            case 'Active':{
                $ul.innerHTML = getList().filter((item)=>item.indexOf('checked')== -1).join('')
                break
            }
            case 'Important':{
                $ul.innerHTML = getList().filter((item)=>item.indexOf('important')!= -1).join('')
                break
                // icon.setAttribute('class','fa-exclamation')
            }
        }

    }
}


window.addEventListener('DOMContentLoaded', PageLoaded)
