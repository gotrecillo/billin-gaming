const { PrismaClient } = require('@prisma/client');

const shittyQuestions = [
  'Si pudieras vivir en el universo de tu saga friki favorita, ¿cuál sería y por qué?',
  '¿Cuál es tu superhéroe o villano favorito y qué habilidad te gustaría robarle?',
  'Si tu vida laboral fuera una película friki, ¿cuál sería el título y quién sería el protagonista?',
  'Si fueras parte de una banda de héroes frikis, ¿cuál sería tu papel y cuál sería tu superpoder geek?',
  'Si pudieras tener una mascota de un universo de fantasía, ¿qué sería y cómo lo llamarías de manera ingeniosa?',
  'Si tuvieras que describir tu habilidad geek más inusual de manera ingeniosa, ¿cómo lo harías?',
  'Si fueras un personaje de ciencia ficción en una cita, ¿cuál sería tu línea de apertura ingeniosa?',
  'Si tuvieras que organizar un evento geek para impresionar a tus amigos, ¿qué sería y cómo lo llamarías de manera ingeniosa?',
  '¿Cuál sería tu reacción ingeniosa si te encontraras con tu personaje favorito de ficción en la vida real?',
  'Si tuvieras que cambiar el final de una saga friki de manera ingeniosa, ¿cómo sería el nuevo final?',
  "¿Cuál ha sido tu peor experiencia con la temida 'reunión que pudo haber sido un correo electrónico'?",
  'Si pudieras asignar un emoji a tu jefe, ¿cuál sería y por qué?',
  '¿Alguna vez has tenido un día en el trabajo que parecía una comedia de enredos? Cuéntanos.',
  'Si tu vida laboral fuera una película cómica, ¿cuál sería el título?',
  '¿Cuál es la anécdota más divertida que has tenido en una fiesta de la oficina?',
  'Si pudieras cambiar el nombre de tu lugar de trabajo por algo más divertido, ¿qué nombre elegirías?',
  '¿Has tenido alguna vez un malentendido cómico con un colega?',
  'Si pudieras asignar roles de sitcom a tus colegas, ¿quién sería el gracioso, el serio, el excéntrico, etc.?',
  '¿Cuál es la tradición más divertida en tu lugar de trabajo?',
  'Si pudieras convertir una tarea aburrida en un juego divertido, ¿cómo lo harías?',
  "¿Alguna vez has tenido que lidiar con un 'problema de la oficina' digno de una comedia?",
  'Si tu jefe fuera un personaje de comedia, ¿quién sería?',
  '¿Cuál sería el lema cómico de tu lugar de trabajo?',
  'Si pudieras organizar un evento cómico para fortalecer el espíritu de equipo, ¿qué actividad elegirías?',
  '¿Alguna vez has creado un apodo divertido para un compañero de trabajo?',
  'Si tu oficina fuera un escenario de comedia, ¿cuáles serían los elementos cómicos recurrentes?',
  '¿Cuál es la broma interna más graciosa que comparten en tu lugar de trabajo?',
  'Si pudieras intercambiar roles con un colega en una situación cómica, ¿quién sería?',
  '¿Qué personaje de comedia representa mejor a tu jefe?',
  'Si pudieras añadir un toque cómico a una política de la empresa, ¿cuál sería?',
  '¿Cuál es la anécdota más cómica que recuerdas de tu infancia en familia?',
  'Si pudieras organizar un concurso de talentos familiar, ¿quién sería el jurado y por qué?',
  '¿Alguna vez tu familia ha tenido un malentendido gracioso? Cuéntanos.',
  'Si pudieras asignar roles de personajes de una sitcom a tu familia, ¿quiénes serían?',
  '¿Cuál sería el título de la película basada en la vida de tu familia?',
  'Si pudieras convertir una tradición familiar en un juego de mesa, ¿cómo sería?',
  '¿Alguna vez has creado un apodo divertido para un miembro de tu familia?',
  'Si tu familia fuera un equipo de superhéroes, ¿quién sería el héroe más divertido?',
  '¿Cuál es el plato familiar más gracioso que hayan preparado para una ocasión especial?',
  'Si tu familia fuera una comedia, ¿cuál sería el chiste recurrente?',
  '¿Cuál sería el lema cómico de tu familia?',
  'Si pudieras asignar a cada miembro de tu familia un papel en una película cómica, ¿quién sería el gracioso, el torpe, el ingenioso, etc.?',
  '¿Cuál es el momento más divertido que has compartido con tu familia?',
  'Si pudieras intercambiar roles con un miembro de tu familia en un evento cómico, ¿quién sería?',
  '¿Alguna vez han tenido una fiesta temática familiar divertida? ¿Cuál fue?',
  'Si tu familia fuera un grupo musical cómico, ¿quién sería el cantante principal, el guitarrista, el baterista, etc.?',
  '¿Cuál es la broma interna más graciosa que comparten en tu familia?',
  'Si tu familia fuera un equipo de deportes cómico, ¿cuál sería el deporte y quién sería el jugador estrella?',
  '¿Qué personaje de dibujos animados representa mejor a cada miembro de tu familia?',
  'Si pudieras añadir un elemento cómico a una tradición familiar, ¿cuál sería?',
  '¿Cuál fue tu momento más vergonzoso en la escuela?',
  'Si pudieras retroceder en el tiempo y evitar una situación bochornosa, ¿cuál sería?',
  '¿Alguna vez te has caído en público? Cuéntanos la historia.',
  'Si pudieras cambiar la historia de una vez que te pusiste rojo como un tomate, ¿cuál sería?',
  '¿Alguna vez enviaste un mensaje a la persona equivocada y fue bochornoso?',
  '¿Has tenido un encuentro incómodo con alguien que te gusta? Cuéntanos.',
  'Si pudieras borrar de la memoria de todos una situación bochornosa, ¿cuál sería?',
  '¿Te acuerdas de alguna vez que dijiste algo sin darte cuenta y resultó ser embarazoso?',
  'Si tuvieras que describir tu momento más bochornoso con una palabra, ¿cuál sería?',
  '¿Alguna vez te quedaste atrapado/a en un lugar público de manera vergonzosa?',
  'Si pudieras cambiar una situación en la que dijiste algo inapropiado, ¿cuál sería?',
  '¿Has tenido alguna vez una cita que fue incómoda o bochornosa?',
  'Si pudieras disfrazar una de tus situaciones bochornosas como una broma, ¿cuál elegirías?',
  '¿Te acuerdas de alguna vez que te confundiste de persona y fue bochornoso?',
  '¿Has tenido alguna experiencia en la que olvidaste el nombre de alguien en un momento crucial?',
  'Si pudieras evitar que alguien más se entere de una situación bochornosa tuya, ¿quién sería?',
  '¿Alguna vez te pusiste nervioso/a y dijiste algo completamente fuera de lugar?',
  'Si pudieras cambiar la situación de un malentendido bochornoso, ¿cuál sería?',
  '¿Te has quedado atrapado/a en un lugar comprometido alguna vez?',
  'Si pudieras hacer que una situación bochornosa desaparezca de tu memoria, ¿cuál elegirías?',
  '¿Cuál fue tu momento más embarazoso en la escuela?',
  'Si pudieras retroceder en el tiempo y evitar una situación vergonzosa, ¿cuál sería?',
  '¿Alguna vez enviaste un mensaje a la persona equivocada y fue vergonzoso?',
  'Si pudieras borrar de la memoria de todos una situación vergonzosa, ¿cuál sería?',
  'Si tuvieras que describir tu momento más embarazoso con una palabra, ¿cuál sería?',
  '¿Has tenido alguna vez una cita que fue incómoda o vergonzosa?',
  'Si pudieras disfrazar una de tus situaciones vergonzosas como una broma, ¿cuál elegirías?',
  '¿Te acuerdas de alguna vez que te confundiste de persona y fue embarazoso?',
  'Si pudieras evitar que alguien más se entere de una situación vergonzosa tuya, ¿quién sería?',
  'Si pudieras cambiar la situación de un malentendido vergonzoso, ¿cuál sería?',
  'Si pudieras hacer que una situación vergonzosa desaparezca de tu memoria, ¿cuál elegirías?',
  'Si tuvieras que elegir entre tener una cena romántica o una noche apasionada, ¿cuál preferirías?',
  '¿Cuál es la fantasía más atrevida que nunca admitirías en público?',
  'Si pudieras tener un encuentro romántico con un personaje ficticio, ¿quién sería?',
  '¿Qué es lo más atrevido que has hecho en una cita?',
  '¿Qué canción te pone en el estado de ánimo adecuado para una noche romántica?',
  'Si pudieras tener una habilidad mágica para mejorar tu vida amorosa, ¿cuál sería?',
  '¿Cuál es la parte más sensual de tu cuerpo según tú?',
  'Si tu vida amorosa fuera una película clasificada, ¿cuál sería su clasificación?',
  '¿Qué palabra o frase sexy conoces en otro idioma?',
  '¿Aceptarías un desafío atrevido en el juego de la verdad o reto?',
  '¿Cuál es tu lugar favorito para tener un encuentro romántico?',
  '¿Qué es lo más atrevido que te gustaría probar en la intimidad?',
  'Si pudieras tener una conversación picante con una celebridad, ¿quién sería?',
  '¿Qué es lo más atrevido que has enviado por mensaje de texto?',
  'Si tuvieras que elegir entre una cena romántica y un masaje sensual, ¿cuál escogerías?',
  '¿Cuál es tu posición favorita en el juego de la verdad o reto?',
  'Si pudieras tener una noche romántica en cualquier lugar del mundo, ¿dónde sería?',
  'Si tu vida amorosa fuera una película, ¿quién interpretaría el papel principal?',
  'Si pudieras tener una habilidad sensual adicional, ¿cuál sería?',
  '¿Qué objeto o prenda de ropa te hace sentir más sexy?',
  'Si pudieras vivir en el mundo de una película, ¿cuál elegirías y por qué?',
  '¿Cuál es tu película favorita de todos los tiempos y por qué?',
  'Si tu vida fuera una película, ¿cuál sería su género?',
  'Si pudieras ser un personaje de película por un día, ¿quién serías?',
  '¿Prefieres ver una película en el cine o en casa? ¿Por qué?',
  'Si tuvieras que recrear una escena famosa de una película, ¿cuál sería y quién interpretaría los roles principales?',
  '¿Cuál es la película que siempre te hace llorar?',
  'Si pudieras cambiar el final de una película, ¿cuál sería y cómo terminaría?',
  '¿Qué actor o actriz interpretaría tu vida si fuera una película biográfica?',
  'Si fueras director de cine, ¿cuál sería el género de tu primera película?',
  '¿Cuál es la película que has visto más veces?',
  'Si tuvieras que vivir en la trama de una película de ciencia ficción, ¿cuál sería?',
  '¿Cuál es la película que te hizo enamorarte del cine?',
  '¿Si pudieras tener una cena con cualquier personaje de película, quién sería y por qué?',
  '¿Cuál es tu género de película menos favorito y por qué?',
  'Si pudieras cambiar de lugar con un personaje de película, ¿quién sería y qué harías en su lugar?',
  '¿Qué película crees que es subestimada y debería ser más conocida?',
  '¿Si pudieras tener acceso al guion de una película antes de que se estrene, lo leerías?',
  '¿Cuál es la película más impactante que has visto y por qué te afectó tanto?',
  '¿Preferirías tener nariz de payaso o pies de pato?',
  'Si tu vida fuera una película de comedia, ¿quién interpretaría el papel principal?',
  '¿Elegirías pelear contra 100 patos del tamaño de caballos o contra un caballo del tamaño de un pato?',
  '¿Cuál sería tu superpoder inútil? (Ejemplo: la capacidad de hacer que las palomitas de maíz te obedezcan)',
  'Si pudieras intercambiar cuerpos con un político por un día, ¿quién sería?',
  '¿Qué harías si descubres que tu gato puede hablar pero solo sobre temas aburridos?',
  '¿Cuál es la palabra más divertida que conoces y por qué?',
  'Si tu vida fuera un sabor de helado, ¿cuál sería y por qué?',
  '¿Qué harías si despertaras un día y descubres que eres un unicornio?',
  '¿Elegirías tener un brazo de goma o una pierna de resorte?',
  'Si tu almohada pudiera hablar, ¿qué pensaría de ti?',
  '¿Cuál sería tu nombre de superhéroe basado en lo que estás haciendo ahora?',
  '¿Si fueras un emoji, cuál serías?',
  '¿Qué canción elegirías como banda sonora para tu vida?',
  '¿Si pudieras tener una conversación con un objeto inanimado, cuál sería y qué le preguntarías?',
  '¿Elegirías tener una cola o alas?',
  '¿Qué harías si descubres que tu sombra tiene una vida propia?',
  '¿Preferirías tener una mascota dragon o un pingüino ninja?',
  '¿Cuál sería tu primera regla si fueras el gobernante del mundo?',
  '¿Si pudieras vivir en una película de dibujos animados, cuál sería y por qué?',
  '¿Salvarías a una persona desconocida en peligro aunque eso signifique poner en riesgo tu propia vida?',
  'Si tu mejor amigo cometiera un crimen, ¿lo denunciarías a la policía?',
  '¿Mentirías para proteger a alguien que cometió un error grave?',
  'Si pudieras salvar a 10 personas desconocidas sacrificando la vida de una persona que conoces, ¿lo harías?',
  '¿Aceptarías un trabajo que sabes que implica hacer algo moralmente cuestionable, pero que te brinda mucha estabilidad económica?',
  'Si descubres que tu pareja te engaña, ¿preferirías saberlo o vivir en la ignorancia?',
  '¿Aceptarías un soborno si eso pudiera mejorar significativamente la vida de tu familia?',
  'Si tuvieras que elegir entre salvar a un amigo o a un extraño, ¿a quién elegirías?',
  '¿Participarías en un experimento científico controvertido si eso pudiera conducir a descubrimientos médicos importantes?',
  'Si tuvieras acceso a información privilegiada que pudiera ayudarte a obtener grandes ganancias, pero que es ilegal, ¿la usarías?',
  '¿Apoyarías una decisión que beneficie a tu país pero perjudique a otros?',
  'Si fueras testigo de un acto de discriminación, ¿intervendrías aunque eso pudiera tener consecuencias negativas para ti?',
  '¿Aceptarías un trabajo que sabes que contribuirá a la contaminación ambiental?',
  '¿Mantendrías un secreto que podría dañar seriamente la reputación de alguien si revelarlo podría evitar daño a otras personas?',
  'Si te encuentras con una billetera perdida con una gran cantidad de dinero, ¿la devolverías o te quedarías con el dinero?',
  '¿Dejarías que un amigo conduzca borracho si eso evita que tome el volante en estado de ebriedad?',
  'Si tuvieras que elegir entre salvar a tu mejor amigo o a tu mascota, ¿quién elegirías?',
  '¿Participarías en un chisme que sabes que podría dañar la reputación de alguien, incluso si no estás seguro de su veracidad?',
  'Si supieras que un compañero de trabajo está siendo injustamente culpado de algo, ¿lo revelarías aunque eso te cause problemas en el trabajo?',
  '¿Aceptarías un trato injusto para ti si eso significa que muchas personas se beneficiarían?',
  'Si pudieras elegir tu trabajo ideal, ¿cuál sería y por qué?',
  '¿Cuál ha sido tu mayor logro profesional hasta ahora?',
  'Si tuvieras que describir tu trabajo en una sola palabra, ¿cuál sería?',
  '¿Qué consejo laboral te hubiera gustado recibir cuando empezaste tu carrera?',
  'Si pudieras trabajar en cualquier parte del mundo, ¿dónde sería?',
  '¿Cuál es la habilidad laboral que más valoras en ti mismo/a?',
  'Si fueras jefe por un día, ¿qué cambiarías en tu lugar de trabajo?',
  '¿Cuál es la tarea que más disfrutas realizar en tu trabajo?',
  '¿Cómo te desconectas del trabajo y encuentras equilibrio entre vida laboral y personal?',
  'Si pudieras tener una habilidad o conocimiento adicional para tu trabajo, ¿cuál sería?',
  '¿Cuál es la lección más importante que has aprendido en el ámbito laboral?',
  'Si pudieras mejorar una cosa en tu entorno laboral, ¿cuál sería?',
  '¿Prefieres trabajar de forma independiente o en equipo? ¿Por qué?',
  '¿Cuál es el desafío más grande que has enfrentado en tu carrera y cómo lo superaste?',
  'Si pudieras cambiar de carrera en este momento, ¿a qué te dedicarías?',
  '¿Cuál es la habilidad o conocimiento en tu campo que crees que es subestimado?',
  'Si tuvieras la oportunidad de trabajar con cualquier persona famosa, ¿quién sería?',
  '¿Qué hábito laboral te gustaría mejorar en ti mismo/a?',
  '¿Cuál es tu rutina matutina antes de ir al trabajo?',
  'Si pudieras implementar una política laboral en todas las empresas, ¿cuál sería?',
  'Si tuvieras que vivir en una película de terror, ¿cuál elegirías y por qué?',
  'Si solo pudieras comer un tipo de comida por el resto de tu vida, ¿cuál sería?',
  'Si tuvieras que elegir entre tener invisibilidad o leer mentes, ¿cuál escogerías?',
  'Si pudieras cambiar de profesión por un día, ¿cuál elegirías y qué harías?',
  'Si te encontraras con tu yo del pasado, ¿qué consejo le darías?',
  'Si pudieras pasar un día en la mente de otra persona, ¿quién sería?',
  'Si fueras un personaje de película de ciencia ficción, ¿serías el héroe o el villano?',
  'Si tuvieras que vivir en una época pasada, ¿cuál elegirías y por qué?',
  'Si pudieras tener una conversación con un animal, ¿cuál escogerías y qué le preguntarías?',
  'Si tuvieras que enfrentarte a tu peor miedo para obtener algo que realmente deseas, ¿lo harías?',
  'Si pudieras tener una habilidad sobrenatural, pero solo en situaciones específicas, ¿cuál sería?',
  'Si tuvieras que eliminar un recuerdo de tu mente, ¿cuál sería y por qué?',
  'Si pudieras cambiar de lugar con alguien por un día, ¿quién sería y qué harías?',
  'Si pudieras tener una conversación con un personaje histórico, ¿quién escogerías?',
  'Si te dieran la oportunidad de explorar el espacio, ¿aceptarías el desafío?',
  'Si tuvieras que elegir entre ser famoso por tus logros o ser querido por tus amigos y familia, ¿cuál preferirías?',
  'Si pudieras conocer la respuesta a una pregunta universal, ¿cuál sería la pregunta?',
  'Si tuvieras que vivir sin uno de tus sentidos, ¿cuál elegirías y por qué?',
  'Si pudieras ser parte de cualquier obra de ficción (libro, película, serie), ¿cuál escogerías?',
  'Si te dieran la oportunidad de vivir en un mundo de fantasía, ¿qué tipo de criatura serías?',
  'Si yo digo "playa", tú dices...',
  'Si yo digo "pizza", tú dices...',
  'Si yo digo "viaje", tú dices...',
  'Si yo digo "fiesta", tú dices...',
  'Si yo digo "libro", tú dices...',
  'Si yo digo "musica", tú dices...',
  'Si yo digo "montaña", tú dices...',
  'Si yo digo "película", tú dices...',
  'Si yo digo "risa", tú dices...',
  'Si yo digo "aventura", tú dices...',
  'Si yo digo "guitarra", tú dices...',
  'Si yo digo "sueño", tú dices...',
  'Si yo digo "helado", tú dices...',
  'Si yo digo "tecnología", tú dices...',
  'Si yo digo "romance", tú dices...',
  'Si yo digo "montaña rusa", tú dices...',
  'Si yo digo "estrellas", tú dices...',
  'Si yo digo "cine", tú dices...',
  'Si yo digo "avión", tú dices...',
  'Si yo digo "regalo", tú dices...',
  '¿Cuál es tu peor experiencia en el baño?',
  'Si pudieras ser invisible por un día, ¿qué harías?',
  '¿Cuál es la cosa más rara que has buscado en Google?',
  'Si fueras un superhéroe, ¿cuál sería tu superpoder más inútil?',
  '¿Cuál es la mentira más absurda que has contado para salir de un aprieto?',
  '¿Qué animal sería más gracioso si pudiera hablar?',
  'Si pudieras intercambiar vidas con un personaje ficticio, ¿quién sería y por qué?',
  '¿Cuál es la cosa más extraña que has comido por apuesta?',
  'Si pudieras tener un súper poder solo los fines de semana, ¿cuál elegirías?',
  '¿Cuál es tu habilidad secreta que nadie conoce?',
  'Si pudieras ser famoso por algo absurdo, ¿qué sería?',
  '¿Cuál es la peor película que has visto y te gustó de todos modos?',
  'Si pudieras cambiar de cuerpo con alguien por un día, ¿quién sería y qué harías?',
  '¿Cuál es tu peor hábito alimenticio secreto?',
  'Si pudieras tener una conversación con un objeto inanimado, ¿cuál elegirías y qué le preguntarías?',
  '¿Cuál es tu historia más vergonzosa de la escuela?',
  'Si tu vida fuera una película, ¿cuál sería su título?',
  '¿Cuál es la cosa más rara que has visto a alguien hacer en público?',
  'Si pudieras eliminar una palabra del idioma, ¿cuál sería y por qué?',
  '¿Cuál es la cosa más extraña que llevas en tu bolso o mochila en este momento?',
  'Si tu vida tuviera una banda sonora, ¿cuál sería la canción principal?',
  '¿Qué superpoder elegirías solo para molestar a tus vecinos?',
  'Si pudieras tener una conversación con un personaje histórico, ¿quién sería y qué le preguntarías?',
  '¿Cuál es la peor moda que has seguido sin darte cuenta?',
  'Si pudieras tener un animal como compañero parlante, ¿cuál elegirías?',
  '¿Cuál es el chiste más tonto que conoces?',
  'Si pudieras ser un personaje de dibujos animados, ¿cuál sería y por qué?',
  '¿Cuál es tu talento más inútil pero divertido?',
  'Si fueras un juguete en una caja sorpresa, ¿cuál sería la sorpresa dentro de la caja?',
  '¿Cuál es la cosa más ridícula por la que te has emocionado?',
  'Si pudieras tener una habilidad sobrenatural pero solo la mitad del tiempo, ¿cuál sería?',
  '¿Cuál es tu peor hábito de conducción?',
  'Si pudieras ser el protagonista de cualquier videojuego, ¿cuál elegirías?',
  '¿Cuál es tu truco más extraño para despertarte por la mañana?',
  'Si tu vida fuera una sitcom, ¿quiénes serían los personajes principales?',
  '¿Qué harías si te encontraras a tu yo del pasado?',
  'Si pudieras cambiar el final de una película famosa, ¿cuál sería y cómo terminaría?',
  '¿Cuál es el peor regalo que has recibido y fingiste que te encantaba?',
  'Si pudieras vivir en cualquier época histórica, ¿cuál sería y por qué?',
  '¿Cuál es la cosa más extraña que has hecho por amor?',
  'Si pudieras tener una mascota mitológica, ¿cuál sería?',
  '¿Cuál es el consejo más extraño que te han dado y que realmente funcionó?',
  'Si pudieras tener la habilidad de hablar con los animales, ¿cuál sería la primera pregunta que les harías?',
  '¿Cuál es la película que te hace llorar sin importar cuántas veces la veas?',
  'Si pudieras vivir en el universo de un libro, ¿cuál sería?',
  '¿Cuál es el objeto más extraño que tienes en tu habitación en este momento?',
  'Si pudieras inventar una nueva fiesta, ¿cuál sería la ocasión y cómo la celebrarías?',
  '¿Cuál es la cosa más ridícula que has hecho solo porque estabas aburrido?',
  'Si pudieras tener la respuesta a una pregunta sobre el futuro, ¿cuál sería esa pregunta?',
  '¿Cuál es la cosa más graciosa que has hecho mientras pensabas que nadie te veía?',
  '¿Cuál es tu fantasía más atrevida que nunca admitirías en público?',
  'Si pudieras tener una cita con cualquier celebridad, ¿a quién elegirías y qué harías?',
  'Si tuvieras que escribir una novela erótica, ¿cuál sería el título?',
  '¿Prefieres tener una noche apasionada e inolvidable o una relación estable y tranquila?',
  'Si pudieras intercambiar vidas con alguien solo por una noche, ¿con quién sería y por qué?',
  '¿Cuál es la fantasía más loca que has compartido con tu pareja?',
  '¿Prefieres un masaje sensual o una cena romántica para una cita perfecta?',
  '¿Cuál es la palabra o frase más sexy que conoces en otro idioma?',
  'Si fueras un juguete sexual, ¿cuál sería y por qué?',
  'Si pudieras tener un encuentro romántico en cualquier lugar del mundo, ¿dónde sería?',
  'Si pudieras intercambiar lugares con un político famoso por un día, ¿quién sería y por qué?',
  '¿Cuál sería tu eslogan divertido si te postularas para un cargo político?',
  'Si tu vida política fuera una comedia, ¿cuál sería el título de la película?',
  '¿Qué ley divertida o inusual crearías si fueras un legislador por un día?',
  'Si los políticos fueran personajes de dibujos animados, ¿cuál sería tu caricatura favorita y por qué?',
  'Si tuvieras que organizar un debate cómico entre políticos, ¿quiénes serían los participantes y sobre qué temas hablarían?',
  '¿Cuál sería tu disfraz político más divertido para Halloween?',
  'Si pudieras invitar a un político a una cena cómica, ¿quién sería y qué plato le servirías?',
  'Si los debates políticos fueran competiciones de chistes, ¿quién crees que ganaría?',
  'Si pudieras agregar una categoría cómica a las elecciones, ¿cuál sería?',
  '¿Cuál sería tu estrategia cómica para ganar simpatía en la campaña política?',
  'Si los políticos tuvieran que realizar talent shows, ¿qué acto te gustaría ver de tu político favorito?',
  '¿Cuál sería el título divertido de tu autobiografía política?',
  'Si los políticos fueran personajes de películas de superhéroes, ¿quiénes serían los héroes y los villanos?',
  'Si tuvieras que escribir un discurso cómico para un político, ¿cuál sería el tema principal?',
  '¿Cuál sería tu estrategia para ganar votos en una elección ficticia y cómica?',
  'Si pudieras hacer que un político famoso participara en un programa de comedia, ¿cuál elegirías y por qué?',
  '¿Qué emoji usarías para describir la situación política actual en tu país?',
  'Si fueras un político en una película de comedia, ¿qué actor o actriz te interpretaría?',
  '¿Cuál sería tu propuesta cómica para mejorar la calidad de vida de los ciudadanos?',
];

const prisma = new PrismaClient();

async function main() {
  const shittyQuestionsCount = await prisma.shittyQuestion.count();
  if (shittyQuestionsCount) {
    console.log('Questions already in the database', shittyQuestionsCount);
    return;
  } else {
    await prisma.shittyQuestion.createMany({
      data: shittyQuestions.map((question) => {
        return {
          question,
        };
      }),
    });  
  }
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
