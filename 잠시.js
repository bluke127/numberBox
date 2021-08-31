var tabs=[{},{},{}]
// var i;
// var logIndex = function(event){
//     console.log(i)
// }
// for(i=0; i<tabs.length; i++){
//     tabs[i].onclick=logIndex;
// }

// tabs[0].onclick();
// tabs[1].onclick();
// tabs[2].onclick();
var z;
var logIndex=function(event){
    var logIndex0=function(){
        console.log(event)
    }
    return logIndex0
}
for(z=0; z<tabs.length; z++){
    tabs[z].onclick=logIndex(z);
}
tabs[0].onclick();
tabs[1].onclick();
console.log(tabs[0].onclick(),tabs[0].onclick)