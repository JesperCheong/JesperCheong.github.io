Vue.component("todo-item", {
    props: ["todo"], //targeting variable todo
    template: "<li>{{ todo.text }}</li>"
});

let app7 = new Vue({
    el: "#app7",
    data: {
        groceryList: [
            {
                id: 0,
                text: "Vegetables"
            },
            {
                id: 1,
                text: "Cheese"
            },
            {
                id: 2,
                text: "Drinks"
            },
            {
                id: 3,
                text: "Proteins"
            }
        ]
    }

});