//1. Crea una consulta en la que aparezcan los capítulos de la temporada 1.
db.samples_friends.find({season: 1}) 

//2. Crea una consulta en la que aparezcan todos los capítulos con una hora de emisión( airtime ) igual a 20:00.
db.samples_friends.find({airtime: "20:00"})

//3. Crea una consulta en la que aparezcan todos los capítulos que tengan en el nombre una “w”
db.samples_friends.find({name: /w/i})

//4. Crea una consulta en la que aparezca el primer capítulo de la temporada 2.
db.samples_friends.find({$and:[{season: 2},{number: 1}]})

//5. Crea una consulta en la que aparezcan los primeros 5 capítulos.
db.samples_friends.find({$and:[{number: {$gte: 1}},{number: {$lte: 5}}]})

//6. Crea una consulta en la que aparezcan todos los capítulos que empiecen por “The One”.
db.samples_friends.find({name: /^The One/})

//7. Crea una consulta en la que aparezcan los capítulos que protagoniza Chandler (buscar en el name ).
db.samples_friends.find({name: /Chandler/})

//8. Crea una consulta en la que aparezcan todos los capítulos de la tercera temporada en los que sale Ross.
db.samples_friends.find({$and:[{season: 3},{name: /Ross/}]})
