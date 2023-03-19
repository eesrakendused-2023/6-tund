class Entry{
    constructor(title, description, date){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class Todo{
    constructor(){
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        document.querySelector('#addButton').addEventListener('click', () => {this.addEntry();});

        this.render();
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        console.log(this.entries);

        this.save();

        this.render();
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }

        const ul = document.createElement('ul');
        ul.className = "todo-list";

        this.entries.forEach((entryValue, entryIndex) => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const removeBtn = document.createElement('div');
            removeBtn.className = 'delete-button';
            const removeIcon = document.createTextNode('X');

            div.innerHTML = `<div>${entryIndex + 1}. ${entryValue.title}</div><div> ${entryValue.description}</div><div> ${entryValue.date}</div>`;

            if(entryValue.done == true){
                li.classList.add('task-done');
            }

            li.addEventListener('click', ()=>{
                if(!entryValue.done){
                    li.classList.add('task-done');
                    this.entries[entryIndex].done = true;
                } else{
                    li.classList.remove('task-done');
                    this.entries[entryIndex].done = false;
                }

                this.save();
            });

            removeBtn.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.save();
                this.render();
            });

            removeBtn.appendChild(removeIcon);
            li.appendChild(div);
            li.appendChild(removeBtn);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    save(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }

}

const todo = new Todo();

