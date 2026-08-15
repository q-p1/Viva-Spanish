(function(root){
  const V=root.VIVA;
  V.world={
    accents:{
      spain:{name:'Spain',flag:'🇪🇸',lang:'es-ES',note:'Castilian Spanish focus.'},
      mexico:{name:'Mexico',flag:'🇲🇽',lang:'es-MX',note:'Mexican Spanish focus.'},
      argentina:{name:'Argentina',flag:'🇦🇷',lang:'es-AR',note:'Rioplatense flavor.'},
      colombia:{name:'Colombia',flag:'🇨🇴',lang:'es-CO',note:'Colombian Spanish focus.'}
    },
    locations:[
      ['airport','Adolfo Suárez Airport','✈️',22,'Survive','elena','Your first problem arrives before your luggage does.'],
      ['apartment','Your apartment','🏠',26,'Basics','lucia','Messages, neighbors, deliveries, and tiny daily talk.'],
      ['cafe','Malasaña café','☕',32,'Order','mateo','Order, modify, pay, and become a regular.'],
      ['metro','Madrid Metro','🚇',40,'Directions','lucia','Directions under noise and time pressure.'],
      ['market','Neighborhood market','🍊',46,'Shopping','carmen','Prices, quantities, choices, and small talk.'],
      ['football','Five-a-side pitch','⚽',52,'Meet People','dani','Fast social Spanish with football context.'],
      ['restaurant','Late dinner','🍽️',58,'Order','mateo','Longer requests, clarification, and natural politeness.'],
      ['school','Language exchange','🎒',62,'Meet People','lucia','Longer conversations and grammar discovery.'],
      ['hotel','Hotel lobby','🏨',66,'Survive','elena','Reservations, problems, and requests.'],
      ['hospital','Clinic','🏥',72,'Survive','elena','Careful communication and asking for help.'],
      ['bernabeu','Bernabéu district','🏟️',76,'Meet People','dani','Football talk, directions, crowds, and opinions.'],
      ['night','Madrid at night','🌙',82,'Mixed','lucia','No-caption chains and spontaneous events.']
    ].map(([id,name,icon,need,skill,npc,desc])=>({id,name,icon,need,skill,npc,desc})),
    npcs:{
      elena:{name:'Elena',avatar:'👩🏻‍💼',role:'Problem solver',style:'clear',facts:['works around travel and service situations']},
      mateo:{name:'Mateo',avatar:'🧑🏻‍🍳',role:'Barista',style:'casual',facts:['remembers your usual order']},
      lucia:{name:'Lucía',avatar:'👩🏻‍🎓',role:'Friend',style:'social',facts:['likes language exchange and city life']},
      dani:{name:'Dani',avatar:'🧑🏻',role:'Football friend',style:'fast',facts:['likes football and jokes']},
      carmen:{name:'Carmen',avatar:'👵🏻',role:'Market seller',style:'warm',facts:['uses short natural phrases']}
    },
    events:[
      {id:'wrong-order',icon:'🥛',min:34,title:'Your order is wrong',prompt:'You asked for coffee, but something is missing.',goal:'Politely clarify what you wanted.',answer:'Perdón, quiero un café con leche'},
      {id:'missed-stop',icon:'🚇',min:42,title:'You missed your stop',prompt:'You are going the wrong direction.',goal:'Ask how to get to the center.',answer:'¿Cómo llego al centro?'},
      {id:'fast-speaker',icon:'🗣️',min:38,title:'Too fast',prompt:'The other person is speaking too quickly.',goal:'Use your rescue Spanish.',answer:'Más despacio, por favor'},
      {id:'price-surprise',icon:'💶',min:48,title:'That price seems high',prompt:'You want to ask the price again.',goal:'Ask how much it costs.',answer:'¿Cuánto cuesta?'},
      {id:'direction-help',icon:'🧭',min:55,title:'A tourist asks you',prompt:'Someone asks where the metro is.',goal:'Give a simple direction.',answer:'Todo recto'},
      {id:'new-friend',icon:'🤝',min:50,title:'Someone joins the table',prompt:'Introduce yourself naturally.',goal:'Greet and say your name.',answer:'Hola, me llamo Dawi'}
    ],
    grammar:[
      {id:'want',title:'Quiero / quieres',examples:['Quiero agua.','¿Quieres café?'],question:'What changed when the subject changed from “I” to “you”?',answer:'quiero → quieres',hint:'Look at the ending.'},
      {id:'location',title:'Soy / estoy',examples:['Soy de Arabia Saudita.','Estoy en Madrid.'],question:'Which one talks about origin, and which one talks about current location?',answer:'soy = origin, estoy = current state/location',hint:'Identity versus state/location.'},
      {id:'negation',title:'No + verb',examples:['Entiendo.','No entiendo.'],question:'How did the sentence become negative?',answer:'put no before the verb',hint:'The tiny word goes first.'},
      {id:'questions',title:'Question frames',examples:['¿Dónde está el baño?','¿Cómo te llamas?'],question:'What visual clue marks a Spanish question?',answer:'opening and closing question marks',hint:'Look at both ends.'}
    ],
    detective:[
      {id:'bag',title:'The Lost Backpack',icon:'🎒',clues:[
        {text:'Lucía says: “La mochila estaba en el café.”',meaning:'The backpack was at the café.'},
        {text:'Mateo says: “Dani salió con una mochila.”',meaning:'Dani left with a backpack.'},
        {text:'Dani says: “La dejé en el metro.”',meaning:'I left it on the metro.'}
      ],question:'Where should you look next?',choices:['The airport','The metro','The market'],answer:'The metro'},
      {id:'ticket',title:'The Missing Ticket',icon:'🎫',clues:[
        {text:'Elena: “No está en la mesa.”',meaning:'It is not on the table.'},
        {text:'Lucía: “Mira en tu chaqueta.”',meaning:'Look in your jacket.'}
      ],question:'What should you check?',choices:['Your jacket','The café','A taxi'],answer:'Your jacket'}
    ],
    campaign:[
      ['arrival','Arrival Day','✈️',20,'You land in Madrid and solve your first problem.'],
      ['first-night','First Night','🏠',28,'Apartment, neighbor, delivery, and basic survival.'],
      ['regular','Become a Regular','☕',36,'A café starts remembering you.'],
      ['wrong-line','Wrong Line','🚇',44,'Navigate the metro and recover from mistakes.'],
      ['market-day','Market Day','🍊',50,'Prices, quantities, and natural exchanges.'],
      ['football','Five-a-side','⚽',56,'Fast social Spanish around football.'],
      ['new-friends','New Friends','🎧',62,'Longer conversations with less English.'],
      ['problem-day','Everything Goes Wrong','🧯',68,'Dynamic problems force rescue Spanish.'],
      ['city-night','Madrid at Night','🌙',74,'A chain of social and travel scenes.'],
      ['detective','The Lost Backpack','🕵️',78,'Read and question your way through a mystery.'],
      ['boss','The Long Dinner','🍽️',82,'A full boss conversation with no answer captions.'],
      ['survival','One Day, No English','🏁',88,'Airport → Metro → Café → Friends → Problem.']
    ].map(([id,title,icon,need,desc])=>({id,title,icon,need,desc}))
  };
})(typeof globalThis!=='undefined'?globalThis:window);
