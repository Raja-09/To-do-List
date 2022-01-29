let arrofobj = [
    {
        todo: "first task",
        check: false
    },
    {
        todo: "second task",
        check: false
    },
    {
        todo: "third task",
        check: true
    }
]
let  obj = {};
obj.todo = "something important" ;
obj.check = false;
arrofobj.push(obj);
let index = arrofobj.findIndex((e)=> e.todo == "third task");
console.log(index);
console.log(arrofobj);

