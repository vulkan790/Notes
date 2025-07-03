const App = {
    data() {
        return {
            title: 'Notes',
            input : {
                value: '',
                placeholder: 'Type your note'
            },
            notes: [],
            editingIndex: null,
            editInput: '',
        }
    },
    mounted() {
        this.getNotes();
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem('notes', JSON.stringify(updatedList));
            },
            deep: true,
        }
    },
    methods: {
        getNotes() {
            const localNotes = localStorage.getItem('notes');
            if (localNotes)
                this.notes = JSON.parse(localNotes);
        },
        onSubmit() {
            if (this.editingIndex !== null) {
                this.notes[this.editingIndex] = this.editInput;
                this.cancelEditing();
            }
            else {
                this.notes.push(this.input.value);
                this.input.value = ''; 
            }
        },
        remove(index) {
            this.notes.splice(index, 1);
            if (this.editingIndex === index)
                this.cancelEditing();
        },
        startEdit(index) {
            this.editingIndex = index;
            this.editInput = this.notes[index];
        },
        cancelEditing() {
            this.editingIndex = null;
            this.editInput = '';
        },
    },
}

const app = Vue.createApp(App)
app.mount("#app")