// ================= SOBRES =================
// El ORDEN de este arreglo es el orden CORRECTO del patrón: sol → atardecer → luna.
// Cada sobre guarda una pieza del código final (tienen que escribirse en ese orden).
//
// Los textos cifrados de ejemplo dicen "LA PIEZA ES ...". Cambiá mensajes, piezas
// y cifrados por los tuyos (si cambiás una pieza, tenés que cifrarla de nuevo).

export const SOBRES = [
  {
    id: 'sol',
    simbolo: '☀️',
    mensaje: 'Sos mi luz de cada mañana, y mi primer pensamiento al despertar',
    cifrado: 'OD SLHCD HV WH', // César +3 → "LA PIEZA ES TE"
    pista: 'cada letra avanzó 3 lugares: para leerla, retrocedé 3 (la D es una A)',
    pieza: 'TE',
  },
  {
    id: 'atardecer',
    simbolo: '🌇',
    mensaje: 'Aunque el día termine, vos me acompañás hasta el final.',
    cifrado: 'OREIUQ SE AZEIP AL', // al revés → "LA PIEZA ES QUIERO"
    pista: 'probá leerlo desde el final, como en un espejo',
    pieza: 'QUIERO',
  },
  {
    id: 'luna',
    simbolo: '🌙',
    mensaje: 'Aunque sea de noche, vos me iluminas mas que la luna.',
    cifrado: '12-1\n16-9-5-26-1\n5-19\n19-9-5-13-16-18-5', // A1Z26 → "LA PIEZA ES SIEMPRE"
    pista: 'cada número es el lugar de una letra en el abecedario (A=1, B=2, C=3...)',
    pieza: 'SIEMPRE',
  },
]

// Cómo se muestran los sobres en la mesa (mezclados, sin números)
export const ORDEN_MESA = ['luna', 'sol', 'atardecer']

// ================= CINEMÁTICA =================
// Cada escena es una lista de frases. Cada frase aparece una debajo de otra.
// Podés poner las que quieras (de 1 a 5 funciona bien). Los textos de abajo son
// solo de ejemplo: reemplazalos por los tuyos.

export const CINEMATICA = {
  // 1. Noche con estrellas y luna
  noche: ['Valentina...', 'todavía queda algo por mostrarte.', 'algo que las palabras no siempre alcanzan a explicar.', 'asi que hice esto para vos.'],

  // 2. Flores abriéndose
  flores: ['Apartaste todo lo malo de mi corazón',
        'y de golpe todo comenzó a florecer.',
        'Desde que llegaste, hasta mis días más grises',
        'tienen un motivo para volverse bonitos.'],

  // 3. Flor de loto
  loto: [
    'Como la flor de loto,',
        'que se abre en el barro,',
        'así te veo yo:',
        'fuerte, serena y hermosa.',
        'Y aun en tus días difíciles,',
        'seguís siendo mi flor favorita.',
  ],

  // 4. Cerezo con pétalos cayendo
  cerezo: [
  'Los cerezos florecen una vez al año,',
  'y hasta su belleza mas grande',
  'tiene un dia en el que se despide.',
  'Pero si algo tengo claro,',
  'es que no quiero un amor pasajero.',
  'Quiero seguir eligiéndote cada día,',
  'y que me elijas vos también.',
  ],

  // 5. Panal de abejas (hablás de sus ojos)
  panal: [
  'Si me preguntan de qué color es la miel,',
  'respondo con el color de tus ojos.',
  'Porque hay algo en tu mirada',
  'que no encuentro en ningún otro lugar.',
  'Y aunque existieran mil formas de belleza,',
  'yo siempre volvería a mirar los mas dulces... los tuyos.'
  ],

  // 6. Campo verde, cielo celeste y sol (la calma)
  campo: [
  'Y al final, después de tanto dolor,',
  'encontré un lugar donde puedo descansar.',
  'Donde no necesito fingir ser fuerte,',
  'ni encontrar las palabras perfectas.',
  'Un lugar donde basta con ser yo.',
  'Y ese lugar, mi amor,',
  'es estar con vos.',
  'Te amo mi amor.'
  ],
}