import { useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, animate } from 'framer-motion'

const oculto = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }

export default function Carta({ mensaje, cifrado, pista, simbolo, onCerrar, onDescubrir }) {
  const giro = useMotionValue(0)
  const animacion = useRef(null)
  const seMovio = useRef(false)
  const [vioReverso, setVioReverso] = useState(false)

  // Detecta cuándo ella llegó a ver la parte de atrás
  useMotionValueEvent(giro, 'change', (v) => {
    const angulo = ((v % 360) + 360) % 360
    if (!vioReverso && angulo > 120 && angulo < 240) {
      setVioReverso(true)
      onDescubrir?.()
    }
  })

  // Acomoda la carta en la cara más cercana (0°, 180°, 360°...)
  const acomodar = (destino) => {
    animacion.current?.stop()
    animacion.current = animate(giro, destino, {
      type: 'spring',
      stiffness: 90,
      damping: 12,
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div style={{ perspective: 1000 }}>
        <motion.div
          className="relative w-[300px] h-[420px] cursor-grab"
          style={{ rotateY: giro, transformStyle: 'preserve-3d', touchAction: 'none' }}
          onPanStart={() => {
            animacion.current?.stop()
            seMovio.current = true
          }}
          onPan={(e, info) => giro.set(giro.get() + info.delta.x * 0.7)}
          onPanEnd={(e, info) => {
            const destino = Math.round((giro.get() + info.velocity.x * 0.15) / 180) * 180
            acomodar(destino)
            setTimeout(() => (seMovio.current = false), 50)
          }}
          onTap={() => {
            if (seMovio.current) return
            acomodar(Math.round(giro.get() / 180) * 180 + 180)
          }}
        >
          {/* FRENTE: el mensaje lindo */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#fffaf2] border-2 border-dashed border-rose-300
                       shadow-2xl shadow-rose-900/30 flex flex-col items-center justify-center
                       px-8 text-center"
            style={oculto}
          >
            <span className="text-rose-400 text-3xl mb-4">♥</span>
            <p className="font-mano text-3xl leading-snug text-rose-600">{mensaje}</p>
            <p className="absolute bottom-5 text-sm text-rose-900/40">
              Tocá o arrastrá para darla vuelta
            </p>
          </div>

          {/* REVERSO: el secreto */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#1f1b2e] border-2 border-amber-300/60
                       shadow-2xl shadow-black/40 flex flex-col items-center justify-center
                       px-6 text-center"
            style={{ ...oculto, transform: 'rotateY(180deg)' }}
          >
            {/* Símbolo en la esquina: indica el lugar de este sobre en el orden */}
            <div
              className="absolute top-3 right-3 w-12 h-12 rounded-full border border-amber-300/50
                         bg-amber-300/10 flex items-center justify-center text-3xl"
            >
              {simbolo}
            </div>

            <span className="text-2xl">🔒</span>
            <p className="font-mano text-xl text-amber-200/80 mt-1">Mensaje secreto</p>

            <p className="font-mono text-xl tracking-wider text-amber-300 mt-6 break-words whitespace-pre-line">
              {cifrado}
            </p>

            <p className="font-titulo italic text-sm text-amber-100/60 mt-8">
              Pista: {pista}
            </p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={onCerrar}
        className="mt-10 h-12 px-8 rounded-full bg-white/90 text-rose-600 font-semibold
                   shadow-lg active:scale-95 transition-transform"
      >
        Guardar la carta
      </button>
    </div>
  )
}