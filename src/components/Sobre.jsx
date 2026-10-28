import { useState } from 'react'
import { motion } from 'framer-motion'

const C = {
  fondo: '#e85d6f',     // interior del sobre
  izq: '#ff8f94',       // triángulo izquierdo del frente
  der: '#ff7d88',       // triángulo derecho del frente
  abajo: '#ff6b7a',     // triángulo de abajo
  solapaCerrada: '#ff6f81',
  solapaAbierta: '#d94a5e',
}

const corazones = [
  { x: -90, d: 0 },
  { x: -50, d: 0.15 },
  { x: -10, d: 0.3 },
  { x: 30, d: 0.1 },
  { x: 70, d: 0.25 },
  { x: 100, d: 0.4 },
]

export default function Sobre({ numero, mensaje, onAbrir, onSacarCarta }) {
  const [abierto, setAbierto] = useState(false)
  const [solapaAtras, setSolapaAtras] = useState(false)

  const abrir = () => {
    if (abierto) return
    setAbierto(true)
    // a mitad de la rotación, la solapa pasa por detrás de la carta
    setTimeout(() => setSolapaAtras(true), 300)
    onAbrir?.()
  }

  return (
    <div className="flex flex-col items-center mt-32">
      <div style={{ perspective: 800 }}>
        <motion.div
          role={abierto ? undefined : 'button'}
          aria-label={`Abrir sobre ${numero}`}
          onClick={abrir}
          className="relative w-[280px] h-[190px] cursor-pointer"
          animate={abierto ? { y: 0 } : { y: [0, -8, 0] }}
          transition={abierto ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={abierto ? undefined : { scale: 0.95 }}
        >
          {/* Sombra en el piso */}
          <div className="absolute -bottom-6 left-6 right-6 h-5 rounded-full bg-rose-900/15 blur-md" />

          {/* Fondo / interior del sobre */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{ background: C.fondo, zIndex: 0 }}
          />

          {/* Solapa: cerrada va al frente, abierta va detrás de la carta */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[110px]"
            style={{
              transformOrigin: 'top',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              zIndex: solapaAtras ? 1 : 30,
            }}
            initial={{ rotateX: 0, backgroundColor: C.solapaCerrada }}
            animate={
              abierto
                ? { rotateX: 180, backgroundColor: C.solapaAbierta }
                : { rotateX: 0, backgroundColor: C.solapaCerrada }
            }
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/* Carta */}
          <motion.div
            className="absolute left-[20px] top-[12px] w-[240px] h-[170px] rounded-md
                       border-2 border-dashed border-rose-300 bg-[#fffaf2] shadow-md
                       flex items-start justify-center px-4 pt-4 text-center"
            style={{ zIndex: 10 }}
            initial={{ y: 0 }}
            animate={{ y: abierto ? -100 : 0 }}
            transition={{ delay: abierto ? 0.55 : 0, duration: 0.9, ease: 'easeOut' }}
            onClick={abierto ? onSacarCarta : undefined}
          >
            <p className="font-mano text-2xl leading-tight text-rose-600">{mensaje}</p>
          </motion.div>

          {/* Frente del sobre (el "bolsillo") */}
          <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ zIndex: 20 }}>
            <div
              className="absolute inset-0"
              style={{ background: C.izq, clipPath: 'polygon(0 0, 55% 50%, 0 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: C.der, clipPath: 'polygon(100% 0, 45% 50%, 100% 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: C.abajo, clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)' }}
            />
          </div>

          {/* Sello (desaparece al abrir) */}
          <motion.div
            className="absolute left-1/2 w-14 h-14 -ml-7 -mt-7 rounded-full bg-red-700
                       shadow-lg shadow-red-900/40 flex items-center justify-center
                       text-rose-100 text-2xl ring-4 ring-red-800/40"
            style={{ top: '58%', zIndex: 40 }}
            animate={{ opacity: abierto ? 0 : 1, scale: abierto ? 0.4 : 1 }}
            transition={{ duration: 0.25 }}
          >
            ♥
          </motion.div>

          {/* Corazones que salen al abrir */}
          {abierto &&
            corazones.map((c, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 text-rose-400 pointer-events-none"
                style={{ top: -60, zIndex: 50, fontSize: 18 + (i % 3) * 6 }}
                initial={{ opacity: 0, x: c.x, y: 0 }}
                animate={{ opacity: [0, 1, 0], x: c.x, y: -90 }}
                transition={{ delay: 1.1 + c.d, duration: 1.6, ease: 'easeOut' }}
              >
                ♥
              </motion.span>
            ))}
        </motion.div>
      </div>

      <p className="font-mano text-2xl text-rose-500 mt-10">Sobre {numero}</p>
    </div>
  )
}