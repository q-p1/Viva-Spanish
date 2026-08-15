(function(root){
  const V = root.VIVA;
  V.content = {
    phrases: [
      ["Hola","Hello","OH-lah","Greet","Greetings"],["Gracias","Thank you","GRAH-syahs","Politeness","Greetings"],["Por favor","Please","por fah-VOR","Politeness","Greetings"],["Sí","Yes","see","Basics","Basics"],["No","No","noh","Basics","Basics"],["Adiós","Goodbye","ah-DYOS","Greet","Greetings"],["Mucho gusto","Nice to meet you","MOO-choh GOOS-toh","Meet People","Introductions"],["Buenos días","Good morning","BWEH-nohs DEE-ahs","Greet","Greetings"],["Buenas tardes","Good afternoon","BWEH-nahs TAR-dehs","Greet","Greetings"],["Buenas noches","Good evening / night","BWEH-nahs NO-chehs","Greet","Greetings"],
      ["Me llamo","My name is","meh YAH-moh","Meet People","Introductions"],["¿Cómo te llamas?","What is your name?","KOH-moh teh YAH-mahs","Meet People","Introductions"],["Soy de","I am from","soy deh","Meet People","Introductions"],["¿De dónde eres?","Where are you from?","deh DON-deh EH-rehs","Meet People","Introductions"],["Encantado","Nice to meet you","en-kahn-TAH-doh","Meet People","Introductions"],["Estoy aprendiendo","I'm learning","ehs-TOY ah-prehn-DYEN-doh","Meet People","Useful"],
      ["Quiero","I want","KYEH-roh","Ask","Needs"],["Necesito","I need","neh-seh-SEE-toh","Ask","Needs"],["Agua","Water","AH-gwah","Order","Needs"],["Café","Coffee","kah-FEH","Order","Food"],["Comida","Food","koh-MEE-dah","Order","Food"],["La cuenta, por favor","The bill, please","lah KWEHN-tah","Order","Food"],["Quiero un café","I want a coffee","KYEH-roh oon kah-FEH","Order","Food"],["Quiero agua, por favor","I want water, please","KYEH-roh AH-gwah","Order","Food"],["Sin azúcar","Without sugar","seen ah-SOO-kar","Order","Food"],["Con leche","With milk","kohn LEH-cheh","Order","Food"],
      ["Ayuda","Help","ah-YOO-dah","Survive","Useful"],["Necesito ayuda","I need help","neh-seh-SEE-toh ah-YOO-dah","Survive","Useful"],["Perdón","Excuse me / Sorry","pehr-DON","Politeness","Useful"],["Lo siento","I'm sorry","loh SYEN-toh","Politeness","Useful"],["No entiendo","I don't understand","noh en-TYEN-doh","Survive","Useful"],["Más despacio, por favor","More slowly, please","mahs dehs-PAH-syoh","Survive","Useful"],["¿Puedes repetir?","Can you repeat?","PWEH-dehs reh-peh-TEER","Survive","Useful"],["¿Hablas inglés?","Do you speak English?","AH-blahs een-GLEHS","Survive","Useful"],["Está bien","It's okay / fine","ehs-TAH byen","Basics","Useful"],["No pasa nada","No worries","noh PAH-sah NAH-dah","Basics","Useful"],
      ["¿Dónde está...?","Where is...?","DON-deh ehs-TAH","Directions","Useful"],["¿Dónde está el baño?","Where is the bathroom?","DON-deh ehs-TAH el BAH-nyoh","Directions","Useful"],["¿Cómo llego a...?","How do I get to...?","KOH-moh YEH-goh ah","Directions","Useful"],["A la derecha","To the right","ah lah deh-REH-chah","Directions","Directions"],["A la izquierda","To the left","ah lah ees-KYEHR-dah","Directions","Directions"],["Todo recto","Straight ahead","TOH-doh REHK-toh","Directions","Directions"],["Cerca","Near","SEHR-kah","Directions","Directions"],["Lejos","Far","LEH-hohs","Directions","Directions"],
      ["¿Cuánto cuesta?","How much does it cost?","KWAN-toh KWEHS-tah","Shopping","Shopping"],["Es muy caro","It's very expensive","ehs mooy KAH-roh","Shopping","Shopping"],["¿Tienes otro?","Do you have another one?","TYEH-nehs OH-troh","Shopping","Shopping"],["Solo esto","Only this","SOH-loh EHS-toh","Shopping","Shopping"],["Tarjeta","Card","tar-HEH-tah","Shopping","Shopping"],["Efectivo","Cash","eh-fehk-TEE-boh","Shopping","Shopping"],
      ["Nos vemos","See you","nohs BEH-mohs","Greet","Natural"],["Hasta luego","See you later","AHS-tah LWEH-goh","Greet","Natural"],["Claro","Of course / Sure","KLAH-roh","Basics","Natural"],["Vale","Okay","BAH-leh","Basics","Natural"],["Perfecto","Perfect","pehr-FEHK-toh","Basics","Natural"],["Poco a poco","Little by little","POH-koh ah POH-koh","Basics","Natural"],["Qué bien","That's great","keh BYEN","Basics","Natural"],["Igualmente","Likewise","ee-gwal-MEN-teh","Meet People","Natural"],["¿Qué tal?","How's it going?","keh TAHL","Meet People","Natural"],["Bien, gracias","Good, thanks","byen GRAH-syahs","Meet People","Natural"]
    ].map(([es,en,pron,skill,cat]) => ({es,en,pron,skill,cat})),
    lessons: [
      ["first","First Words","Start from absolute zero.",["Hola","Gracias","Por favor","Sí","No","Adiós"]],
      ["greetings","Greetings That Feel Real","Morning, afternoon, evening.",["Mucho gusto","Buenos días","Buenas tardes","Buenas noches","Encantado"]],
      ["identity","Meet Someone","Name, origin, and tiny small talk.",["Me llamo","¿Cómo te llamas?","Soy de","¿De dónde eres?","Estoy aprendiendo","¿Qué tal?","Bien, gracias"]],
      ["needs","Simple Needs","Ask for useful things.",["Quiero","Necesito","Agua","Café","Comida","Por favor"]],
      ["cafe","Café Survival","Order without pointing at the menu like a confused tourist.",["Quiero un café","Quiero agua, por favor","Sin azúcar","Con leche","La cuenta, por favor","Tarjeta"]],
      ["rescue","Rescue Spanish","What to say when the conversation outruns you.",["Ayuda","Necesito ayuda","Perdón","No entiendo","Más despacio, por favor","¿Puedes repetir?","¿Hablas inglés?"]],
      ["directions","Getting Around","Ask and understand the basics.",["¿Dónde está...?","¿Dónde está el baño?","¿Cómo llego a...?","A la derecha","A la izquierda","Todo recto","Cerca","Lejos"]],
      ["shopping","Buying Things","Prices, payment, and simple choices.",["¿Cuánto cuesta?","Es muy caro","¿Tienes otro?","Solo esto","Tarjeta","Efectivo"]],
      ["natural","Sound Less Robotic","Small phrases that make speech flow.",["Está bien","No pasa nada","Nos vemos","Hasta luego","Claro","Vale","Perfecto","Poco a poco","Qué bien","Igualmente"]]
    ].map(([id,title,desc,words]) => ({id,title,desc,words})),
    builds: [
      {en:"Hello, nice to meet you.", answer:"Hola, mucho gusto", tokens:["Hola",",","mucho","gusto"]},
      {en:"My name is Dawi.", answer:"Me llamo Dawi", tokens:["Me","llamo","Dawi"]},
      {en:"I am from Saudi Arabia.", answer:"Soy de Arabia Saudita", tokens:["Soy","de","Arabia","Saudita"]},
      {en:"I want water, please.", answer:"Quiero agua, por favor", tokens:["Quiero","agua",",","por","favor"]},
      {en:"I don't understand. More slowly, please.", answer:"No entiendo. Más despacio, por favor", tokens:["No","entiendo",".","Más","despacio",",","por","favor"]},
      {en:"Where is the bathroom?", answer:"¿Dónde está el baño?", tokens:["¿Dónde","está","el","baño","?"]},
      {en:"The bill, please.", answer:"La cuenta, por favor", tokens:["La","cuenta",",","por","favor"]},
      {en:"See you later.", answer:"Hasta luego", tokens:["Hasta","luego"]}
    ],
    missions: [
      ["meet","Meet a stranger","🤝",20,"Meet People","Greet, introduce yourself, and close naturally."],
      ["cafe","Order at a café","☕",32,"Order","Order a drink, modify it, and ask for the bill."],
      ["lost","You are lost","🧭",40,"Directions","Ask for a place and understand a basic direction."],
      ["fast","They speak too fast","🗣️",45,"Survive","Recover without panicking or switching languages immediately."],
      ["shop","Buy something","🛍️",52,"Shopping","Ask the price and choose payment."],
      ["friend","Make a friend","🎧",58,"Meet People","Handle a short social exchange."],
      ["restaurant","Dinner mission","🍽️",62,"Order","Order, clarify, and ask for the bill."],
      ["city","City challenge","🌆",70,"Mixed","Chain multiple real-world tasks with little English."],
      ["nocaption","No-caption hour","🔥",78,"Mixed","A sequence of Spanish-only micro-scenes."],
      ["survival","Madrid survival test","🏁",86,"Mixed","Final beginner survival gauntlet."]
    ].map(([id,title,icon,need,skill,desc]) => ({id,title,icon,need,skill,desc})),
    stories: [
      {id:"airport",title:"The Missing Bag",icon:"🧳",need:35,scenes:[
        {npc:"Airport staff",line:"Hola. ¿En qué puedo ayudarte?",goal:"Say excuse me and that you need help.",answer:"Perdón, necesito ayuda"},
        {npc:"Airport staff",line:"¿Cómo te llamas?",goal:"Tell them your name.",answer:"Me llamo Dawi"},
        {npc:"Airport staff",line:"Vale. Más despacio, ¿sí?",goal:"Say okay and thank you.",answer:"Vale, gracias"}
      ]},
      {id:"cafe-story",title:"The Regular",icon:"☕",need:50,scenes:[
        {npc:"Barista",line:"Buenos días. ¿Qué quieres?",goal:"Order a coffee politely.",answer:"Quiero un café, por favor"},
        {npc:"Barista",line:"¿Con leche?",goal:"Say with milk.",answer:"Con leche"},
        {npc:"Barista",line:"¿Algo más?",goal:"Ask for the bill.",answer:"La cuenta, por favor"}
      ]},
      {id:"metro",title:"Wrong Line",icon:"🚇",need:60,scenes:[
        {npc:"Local",line:"¿Sí?",goal:"Ask where the station is.",answer:"¿Dónde está la estación?"},
        {npc:"Local",line:"Todo recto y a la izquierda.",goal:"Say okay and thank you.",answer:"Vale, gracias"},
        {npc:"Local",line:"Está cerca.",goal:"Respond naturally.",answer:"Perfecto"}
      ]},
      {id:"evening",title:"One Evening in Madrid",icon:"🌙",need:72,scenes:[
        {npc:"New friend",line:"Hola, ¿qué tal?",goal:"Say you're good and thank them.",answer:"Bien, gracias"},
        {npc:"New friend",line:"¿De dónde eres?",goal:"Say you are from Saudi Arabia.",answer:"Soy de Arabia Saudita"},
        {npc:"New friend",line:"Nos vemos mañana.",goal:"Say see you later.",answer:"Hasta luego"}
      ]}
    ]
  };
})(typeof globalThis !== "undefined" ? globalThis : window);