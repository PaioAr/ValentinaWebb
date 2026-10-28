import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CINEMATICA } from '../datos'

const PASO = 1.8 // segundos entre una frase y la siguiente

// Colores del iris en la escena del panal: [centro, medio, borde]
// Ahora están en tono miel. Cambialos por el color de sus ojos.
const IRIS = ['#fef3c7', '#f59e0b', '#92400e']

// inicio: en qué segundo empieza el texto (para que se vea primero la animación)
// min: tiempo mínimo antes de poder tocar para seguir
const ESCENAS = [
  { id: 'noche', fondo: 'bg-gradient-to-b from-[#120e1f] to-[#2a2140]', color: 'text-amber-100', inicio: 2, min: 0 },
  { id: 'flores', fondo: 'bg-gradient-to-b from-[#2a2140] via-[#7b3f6e] to-[#f08fa8]', color: 'text-rose-50', inicio: 3.5, min: 7 },
  { id: 'loto', fondo: 'bg-gradient-to-b from-[#ffe4ec] via-[#f9b8cf] to-[#7fb3b8]', color: 'text-rose-900', inicio: 4, min: 8 },
  { id: 'cerezo', fondo: 'bg-gradient-to-b from-[#ffd6e0] via-[#ffc2d1] to-[#fde2c8]', color: 'text-rose-900', inicio: 3, min: 6 },
  { id: 'panal', fondo: 'bg-[#5a2d0c]', color: 'text-amber-50', inicio: 2.5, min: 6 },
  { id: 'campo', fondo: 'bg-gradient-to-b from-[#5eb8ff] via-[#a8defa] to-[#e6f7ff]', color: 'text-sky-900', inicio: 3, min: 0 },
]

/* =====================================================
   PIEZAS COMPARTIDAS
   ===================================================== */

// Un pétalo. Su base queda en el punto (0,0) del contenedor y crece hacia arriba.
function Petalo({ w, h, color, ...movimiento }) {
  return (
    <motion.div
      className="absolute"
      style={{ width: w, height: h, left: -w / 2, top: -h, originX: 0.5, originY: 1 }}
      {...movimiento}
    >
      <svg viewBox="0 0 60 120" width="100%" height="100%" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.18))' }}>
        <path d="M30 118 C2 90 0 40 30 2 C60 40 58 90 30 118 Z" fill={color} />
        <path d="M30 110 C26 80 26 40 30 14" stroke="white" strokeOpacity=".35" strokeWidth="2" fill="none" />
      </svg>
    </motion.div>
  )
}

// Frases que aparecen una por una
function Lineas({ lineas, inicio, clase }) {
  return (
    <div className="flex flex-col gap-3 max-w-xs">
      {lineas.map((l, i) => (
        <motion.p
          key={i}
          className={clase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: inicio + i * PASO, duration: 1.2 }}
        >
          {l}
        </motion.p>
      ))}
    </div>
  )
}

function BotonVolver({ delay, clase, onClick }) {
  return (
    <motion.button
      className={`relative z-10 h-11 px-6 rounded-full border text-sm font-semibold
                  active:scale-95 transition-transform ${clase}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 1 }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      Volver a verla 🌸
    </motion.button>
  )
}

/* =====================================================
   ESCENA 1: NOCHE
   ===================================================== */

function Estrellas() {
  const lista = Array.from({ length: 45 }, (_, i) => ({
    id: i, x: (i * 53) % 100, y: (i * 37) % 100, t: 1 + (i % 3), d: 2 + (i % 4), r: (i * 0.4) % 3,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lista.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-amber-100"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.t, height: s.t }}
          animate={{ opacity: [0.15, 1, 0.15] }}
          transition={{ duration: s.d, delay: s.r, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

function Luna() {
  return (
    <motion.div
      className="w-20 h-20 rounded-full"
      style={{ boxShadow: 'inset -16px -6px 0 0 #fde68a, 0 0 50px 10px rgba(253,230,138,.25)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    />
  )
}

/* =====================================================
   ESCENA 2: FLORES ABRIÉNDOSE
   ===================================================== */

function Flor({ x, y, escala, color, centro, delay }) {
  const n = 8
  return (
    <motion.div
      className="absolute w-0 h-0"
      style={{ left: x, top: y }}
      initial={{ scale: 0, rotate: -30 }}
      animate={{ scale: escala, rotate: 0 }}
      transition={{ delay, duration: 2.4, ease: 'easeOut' }}
    >
      {Array.from({ length: n }, (_, i) => (
        <Petalo
          key={i}
          w={56}
          h={110}
          color={color}
          initial={{ rotate: 0, scale: 0.3 }}
          animate={{ rotate: (360 / n) * i, scale: 1 }}
          transition={{ delay: delay + 0.3 + i * 0.1, duration: 1.6, ease: 'easeOut' }}
        />
      ))}
      <motion.div
        className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full"
        style={{ background: centro }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 1 }}
      />
    </motion.div>
  )
}

function Flores() {
  return (
    <div className="relative w-[300px] h-[260px]">
      <Flor x={45} y={190} escala={0.45} color="#c4b5fd" centro="#fde68a" delay={1.6} />
      <Flor x={255} y={195} escala={0.45} color="#fda4af" centro="#fde68a" delay={2.0} />
      <Flor x={150} y={125} escala={0.8} color="#f9a8d4" centro="#fbbf24" delay={0.3} />
    </div>
  )
}

/* =====================================================
   ESCENA 3: FLOR DE LOTO
   ===================================================== */

const CAPAS = [
  { color: '#f9a8d4', angulos: [-80, -50, 50, 80], w: 70, h: 130, delay: 0.3 },
  { color: '#f472b6', angulos: [-55, -25, 25, 55], w: 66, h: 125, delay: 0.9 },
  { color: '#fbcfe8', angulos: [-28, 0, 28], w: 58, h: 115, delay: 1.5 },
]

function Loto() {
  return (
    <div className="relative w-[300px] h-[260px]">
      {/* Agua y ondas */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[290px] h-10 rounded-[50%] bg-teal-800/30" />
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 bottom-8 -ml-[100px] w-[200px] h-6 rounded-[50%] border border-white/70"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.7, 0] }}
          transition={{ duration: 4, delay: 2.5 + i * 2, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      {/* Hoja */}
      <div className="absolute bottom-6 left-1/2 -ml-[90px] w-[180px] h-7 rounded-[50%] bg-emerald-600/80" />
      {/* Brillo */}
      <motion.div
        className="absolute left-1/2 bottom-12 -ml-14 w-28 h-28 rounded-full bg-amber-200 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.5, duration: 2 }}
      />
      {/* Pétalos: de afuera hacia adentro */}
      <div className="absolute left-1/2 bottom-12 w-0 h-0">
        {CAPAS.flatMap((c, ci) =>
          c.angulos.map((a, i) => (
            <Petalo
              key={`${ci}-${i}`}
              w={c.w}
              h={c.h}
              color={c.color}
              initial={{ rotate: 0, scale: 0.4, opacity: 0 }}
              animate={{ rotate: a, scale: 1, opacity: 1 }}
              transition={{ delay: c.delay + i * 0.1, duration: 2.2, ease: 'easeOut' }}
            />
          ))
        )}
      </div>
    </div>
  )
}

/* =====================================================
   ESCENA 4: CEREZO CON PÉTALOS CAYENDO
   ===================================================== */

const RAMAS = [
  { d: 'M150 280 C150 240 146 210 148 170', w: 14, delay: 0 },
  { d: 'M148 192 C130 172 105 162 80 130', w: 8, delay: 0.7 },
  { d: 'M149 182 C170 162 200 152 225 120', w: 8, delay: 0.8 },
  { d: 'M148 172 C140 142 135 117 120 85', w: 6, delay: 1 },
  { d: 'M149 166 C158 136 170 112 185 80', w: 6, delay: 1.1 },
  { d: 'M100 150 C85 150 70 145 55 140', w: 4, delay: 1.5 },
  { d: 'M205 138 C220 140 235 138 252 130', w: 4, delay: 1.6 },
  { d: 'M121 90 C112 78 102 72 90 70', w: 4, delay: 1.7 },
]

// [x, y, radio] de cada racimo de flores
const RACIMOS = [
  [80, 130, 34], [55, 140, 26], [120, 85, 36], [90, 70, 28], [185, 80, 36],
  [225, 120, 34], [252, 130, 26], [150, 58, 40], [115, 115, 30], [190, 115, 30],
  [150, 98, 34], [70, 100, 24], [235, 92, 26], [150, 28, 26],
]
const ROSAS = ['#fbcfe8', '#f9a8d4', '#fce7f3', '#f472b6']

function Cerezo() {
  return (
    <svg viewBox="0 0 300 280" width="320" height="298">
      <ellipse cx="150" cy="278" rx="95" ry="8" fill="rgba(120,60,60,.15)" />

      {RAMAS.map((r, i) => (
        <motion.path
          key={i}
          d={r.d}
          stroke="#6b4a3a"
          strokeWidth={r.w}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: r.delay, duration: 1.4, ease: 'easeOut' }}
        />
      ))}

      {RACIMOS.map(([cx, cy, r], ci) => (
        <motion.g
          key={ci}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6 + ci * 0.12, duration: 1.2, ease: 'easeOut' }}
        >
          <circle cx={cx} cy={cy} r={r} fill={ROSAS[ci % 4]} opacity="0.9" />
          {Array.from({ length: 5 }, (_, k) => {
            const a = ((k * 72 + ci * 20) * Math.PI) / 180
            return (
              <circle
                key={k}
                cx={cx + Math.cos(a) * r * 0.85}
                cy={cy + Math.sin(a) * r * 0.85}
                r={r * 0.4}
                fill={ROSAS[(ci + k + 1) % 4]}
                opacity="0.85"
              />
            )
          })}
        </motion.g>
      ))}
    </svg>
  )
}

function LluviaPetalos({ cantidad = 26 }) {
  const colores = ['#f9a8d4', '#fbcfe8', '#f472b6', '#fda4af']
  const lista = Array.from({ length: cantidad }, (_, i) => ({
    id: i,
    x: (i * 37) % 100,
    w: 10 + ((i * 5) % 9),
    dur: 7 + (i % 6) * 1.2,
    delay: 2.5 + ((i * 0.55) % 7),
    giro: i % 2 ? 360 : -360,
    vaiven: 20 + (i % 4) * 12,
    color: colores[i % 4],
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {lista.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`, top: '14vh', width: p.w, height: p.w * 1.3,
            background: p.color, borderRadius: '60% 0 60% 40%',
          }}
          initial={{ opacity: 0, y: '0vh' }}
          animate={{ opacity: [0, 0.9, 0.9, 0], y: '85vh', x: [0, p.vaiven, -p.vaiven, 0], rotate: p.giro }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

/* =====================================================
   ESCENA 5: PANAL CON ABEJAS
   ===================================================== */

function FondoPanal() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 38%, #fcd34d 0%, #d97706 50%, #5a2d0c 100%)' }}
      />
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
        <defs>
          <pattern id="panal" width="55.43" height="96" patternUnits="userSpaceOnUse">
            <g fill="rgba(251,191,36,.18)" stroke="#92400e" strokeWidth="3" strokeLinejoin="round">
              <polygon points="27.71,0 55.43,16 55.43,48 27.71,64 0,48 0,16" />
              <polygon points="0,48 27.71,64 27.71,96 0,112 -27.71,96 -27.71,64" />
              <polygon points="55.43,48 83.14,64 83.14,96 55.43,112 27.72,96 27.72,64" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#panal)" />
      </svg>
      {/* Luz que respira */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,240,160,.5), transparent 60%)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}

function Abeja({ y, tam, dur, delay, sentido }) {
  const alas = {
    style: { transformBox: 'fill-box', transformOrigin: 'bottom center' },
    animate: { scaleY: [1, 0.3, 1] },
    transition: { duration: 0.18, repeat: Infinity },
  }
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, left: 0 }}
      initial={{ x: sentido > 0 ? '-15vw' : '115vw' }}
      animate={{ x: sentido > 0 ? '115vw' : '-15vw', y: [0, -18, 10, -12, 0] }}
      transition={{
        x: { duration: dur, delay, repeat: Infinity, ease: 'linear' },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg
        width={tam}
        height={tam * 0.7}
        viewBox="0 0 40 28"
        style={{ transform: sentido > 0 ? 'none' : 'scaleX(-1)', opacity: 0.9 }}
      >
        <defs>
          <clipPath id="cuerpoAbeja">
            <ellipse cx="20" cy="17" rx="12" ry="8" />
          </clipPath>
        </defs>
        <motion.ellipse cx="16" cy="9" rx="6" ry="7" fill="white" fillOpacity=".75" {...alas} />
        <motion.ellipse cx="25" cy="9" rx="6" ry="7" fill="white" fillOpacity=".75" {...alas} />
        <ellipse cx="20" cy="17" rx="12" ry="8" fill="#fbbf24" />
        <g clipPath="url(#cuerpoAbeja)" fill="#1c1917">
          <rect x="13" y="8" width="4" height="18" />
          <rect x="21" y="8" width="4" height="18" />
        </g>
        <circle cx="33" cy="17" r="5" fill="#1c1917" />
        <polygon points="8,17 2,15 2,19" fill="#1c1917" />
      </svg>
    </motion.div>
  )
}

const ABEJAS = [
  { y: '10%', tam: 34, dur: 16, delay: 0, sentido: 1 },
  { y: '24%', tam: 26, dur: 21, delay: 3, sentido: -1 },
  { y: '40%', tam: 38, dur: 18, delay: 6, sentido: 1 },
  { y: '57%', tam: 28, dur: 23, delay: 1, sentido: -1 },
  { y: '72%', tam: 32, dur: 17, delay: 8, sentido: 1 },
  { y: '86%', tam: 24, dur: 20, delay: 4, sentido: -1 },
]

// Un ojo dentro de una celda del panal
function Ojo() {
  const rayos = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2
    return {
      x1: 80 + Math.cos(a) * 22, y1: 80 + Math.sin(a) * 22,
      x2: 80 + Math.cos(a) * 50, y2: 80 + Math.sin(a) * 50,
    }
  })
  return (
    <motion.svg
      viewBox="0 0 160 160"
      width="170"
      height="170"
      style={{ filter: 'drop-shadow(0 0 18px rgba(255,214,100,.7))' }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8 }}
    >
      <defs>
        <radialGradient id="iris">
          <stop offset="0%" stopColor={IRIS[0]} />
          <stop offset="55%" stopColor={IRIS[1]} />
          <stop offset="100%" stopColor={IRIS[2]} />
        </radialGradient>
      </defs>
      <polygon
        points="80,8 142,44 142,116 80,152 18,116 18,44"
        fill="#3b1d08"
        stroke="#fde68a"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="80" r="54" fill="url(#iris)" />
      {rayos.map((r, i) => (
        <line key={i} {...r} stroke="rgba(120,53,15,.45)" strokeWidth="1.2" />
      ))}
      <circle cx="80" cy="80" r="54" fill="none" stroke="rgba(60,25,5,.6)" strokeWidth="3" />
      <motion.circle
        cx="80"
        cy="80"
        r="21"
        fill="#140700"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="66" cy="64" r="7" fill="white" opacity=".85" />
      <circle cx="94" cy="96" r="3" fill="white" opacity=".6" />
    </motion.svg>
  )
}

/* =====================================================
   ESCENA 6: CAMPO VERDE, CIELO Y SOL (CALMA)
   ===================================================== */

const ANIM_NUBES = `
@keyframes nubeVuela {
  from { transform: translateX(-45vw); }
  to   { transform: translateX(130vw); }
}`

function Nube({ top, escala, dur, adelanto }) {
  return (
    <div
      className="absolute left-0 pointer-events-none"
      style={{ top, animation: `nubeVuela ${dur}s linear infinite`, animationDelay: `-${adelanto}s` }}
    >
      <div className="relative w-40 h-14" style={{ transform: `scale(${escala})`, transformOrigin: 'left center' }}>
        <div className="absolute bottom-0 left-0 w-40 h-8 rounded-full bg-white/90" />
        <div className="absolute bottom-3 left-5 w-16 h-12 rounded-full bg-white/90" />
        <div className="absolute bottom-3 left-14 w-20 h-14 rounded-full bg-white/90" />
      </div>
    </div>
  )
}

const flores = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: ((i * 29) % 94) + 3,
  b: ((i * 7) % 20) + 2,
  color: ['#ffffff', '#fde047', '#fbcfe8', '#ffffff'][i % 4],
  t: 6 + (i % 3) * 2,
  d: 2.5 + (i % 4) * 0.6,
}))

const luces = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 41) % 100,
  t: 3 + (i % 4) * 1.5,
  dur: 9 + (i % 5) * 2,
  delay: (i * 0.8) % 8,
  vaiven: 15 + (i % 3) * 12,
}))

function FondoCampo() {
  const rayos = 'repeating-conic-gradient(rgba(255,250,200,.55) 0 7deg, transparent 7deg 20deg)'
  const mascara = 'radial-gradient(circle, #000 10%, transparent 68%)'
  return (
    <>
      <style>{ANIM_NUBES}</style>

      {/* Sol */}
      <motion.div
        className="absolute top-[6vh] right-[10%] w-32 h-32 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3 }}
      >
        <motion.div
          className="absolute w-[320px] h-[320px]"
          style={{ background: rayos, WebkitMaskImage: mascara, maskImage: mascara }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="relative w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fffef0 30%, #fff3a0 70%, #ffe066 100%)',
            boxShadow: '0 0 40px 20px rgba(255,240,150,.8), 0 0 120px 60px rgba(255,255,200,.5)',
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Nubes */}
      <Nube top="14%" escala={1} dur={90} adelanto={20} />
      <Nube top="28%" escala={0.7} dur={120} adelanto={70} />
      <Nube top="8%" escala={0.55} dur={100} adelanto={50} />

      {/* Luces flotando */}
      {luces.map((l) => (
        <motion.span
          key={l.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${l.x}%`, bottom: '12vh', width: l.t, height: l.t,
            boxShadow: '0 0 8px 3px rgba(255,255,255,.8)',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.9, 0], y: '-45vh', x: [0, l.vaiven, -l.vaiven, 0] }}
          transition={{ duration: l.dur, delay: 2 + l.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Colinas */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <path d="M0 90 C60 40 140 70 220 50 C300 30 360 60 400 45 L400 200 L0 200 Z" fill="#9be58a" />
        <path d="M0 120 C80 80 150 120 230 95 C310 70 360 100 400 90 L400 200 L0 200 Z" fill="#63c765" />
        <path d="M0 160 C90 130 160 165 250 145 C320 130 370 150 400 140 L400 200 L0 200 Z" fill="#3fae54" />
      </motion.svg>

      {/* Florcitas moviéndose con el viento */}
      {flores.map((f) => (
        <motion.span
          key={f.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${f.x}%`, bottom: `${f.b}vh`, width: f.t, height: f.t,
            background: f.color, originY: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: [-8, 8, -8] }}
          transition={{
            opacity: { delay: 2 + f.id * 0.1, duration: 1 },
            rotate: { duration: f.d, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </>
  )
}

/* =====================================================
   CINEMÁTICA
   ===================================================== */

export default function Cinematica() {
  const [idx, setIdx] = useState(0)
  const [listo, setListo] = useState(false)

  const esc = ESCENAS[idx]
  const ultima = idx === ESCENAS.length - 1
  const lineas = CINEMATICA[esc.id]
  const espera = Math.max(esc.min, esc.inicio + (lineas.length - 1) * PASO + 2)

  // Hasta que no termina de aparecer todo, el toque no avanza
  useEffect(() => {
    setListo(false)
    const t = setTimeout(() => setListo(true), espera * 1000)
    return () => clearTimeout(t)
  }, [idx, espera])

  const avanzar = () => {
    if (listo && !ultima) setIdx(idx + 1)
  }

  const textoGrande = 'font-mano text-3xl leading-snug'

  return (
    <div className="relative min-h-dvh overflow-hidden" onClick={avanzar}>
      <AnimatePresence mode="wait">
        <motion.div
          key={esc.id}
          className={`relative min-h-dvh overflow-hidden flex flex-col items-center justify-center gap-10
                      px-8 py-10 text-center ${esc.fondo} ${esc.color}
                      pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          {esc.id === 'noche' && (
            <>
              <Estrellas />
              <Luna />
              <Lineas lineas={lineas} inicio={esc.inicio} clase={textoGrande} />
            </>
          )}

          {esc.id === 'flores' && (
            <>
              <Estrellas />
              <Flores />
              <Lineas lineas={lineas} inicio={esc.inicio} clase={textoGrande} />
            </>
          )}

          {esc.id === 'loto' && (
            <>
              <Loto />
              <Lineas lineas={lineas} inicio={esc.inicio} clase="font-titulo italic text-xl leading-relaxed" />
            </>
          )}

          {esc.id === 'cerezo' && (
            <>
              <LluviaPetalos />
              <Cerezo />
              <Lineas lineas={lineas} inicio={esc.inicio} clase="font-titulo italic text-xl leading-relaxed" />
            </>
          )}

          {esc.id === 'panal' && (
            <>
              <FondoPanal />
              {ABEJAS.map((a, i) => (
                <Abeja key={i} {...a} />
              ))}
              <div className="relative z-10 flex flex-col items-center gap-10">
                <Ojo />
                <Lineas
                  lineas={lineas}
                  inicio={esc.inicio}
                  clase="font-titulo italic text-xl leading-relaxed [text-shadow:0_1px_6px_rgba(60,20,0,0.75)]"
                />
              </div>
            </>
          )}

          {esc.id === 'campo' && (
            <>
              <FondoCampo />
              <div className="relative z-10 flex flex-col items-center gap-8 pb-[22vh]">
                <Lineas
                  lineas={lineas}
                  inicio={esc.inicio}
                  clase="font-titulo italic text-xl leading-relaxed [text-shadow:0_0_12px_rgba(255,255,255,0.95)]"
                />
                <BotonVolver
                  delay={esc.inicio + lineas.length * PASO + 0.5}
                  clase="border-sky-700/40 text-sky-900 bg-white/60"
                  onClick={() => setIdx(0)}
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Aviso para seguir */}
      <AnimatePresence>
        {listo && !ultima && (
          <motion.p
            key={esc.id}
            className={`fixed left-0 right-0 text-center text-sm z-30 ${esc.color}`}
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tocá para continuar
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}