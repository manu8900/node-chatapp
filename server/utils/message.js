//creating a custo utiity//
var generatemessage = (from,text)=>{
    return{
        from,
        text,
        createdAt:new Date().getTime()
    }
};
module.exports={generatemessage};