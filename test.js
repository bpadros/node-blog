const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser:true});

BlogPost.create({
    title: 'The Mythbuster Guide to Saving money on Energy Bills',
    body: 'If you have been here a long time , you might remember when i went on Itv Tonight yo dispense a masterclass in saving money on energy billsEnergy-saving is one of my favourites money topics,because once you get past the boring bullet-point lists, a whole new world of thirty nerdery opens up.You know those bullet-point lists.You start spotting them everything at this time of year.They go like this:'
},(error,blogspot)=>{
    console.log(error,blogpost)
})

BlogPost.find({
    // title : /The/ find all documents with 'the'
    title: 'The Mythbuster Guide to Saving money on Energy Bills',
},(error,blogspot)=>{
    console.log(error,blogpost)
})

let id = '043jnffrb222'

BlogPost.findByIdAndUpdate(id,{
    title:'Updated title'
},(error,blogspot)=>{
    console.log(error,blogpost)
})

BlogPost.findByIdAndDelete(id,(error,blogspot)=>{
    console.log(error,blogpost)
})