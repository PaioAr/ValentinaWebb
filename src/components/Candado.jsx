import { useState } from 'react'
import { motion } from 'framer-motion'

const normalizar = (t) =>
  t.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const etiquetas = ['Primera pieza', 'Segunda pieza', 'Tercera pieza']

export default function Candado({ piezas, onAbrir, onVolver }) {
  const [valores, setValores] = useState(['', '', ''])
  const [error, setError] = useState(false)
  const [intento, setIntento] = useState(0)

  const cambiar = (i, v) => {
    const copia = [...valores]
    copia[i] = v
    setValores(copia)
    setError(false)
  }

  const probar = () => {
    const ok = piezas.every((p, i) => normalizar(valores[i]) === normalizar(p))
    if (ok) {
      onAbrir()
    } else {
      setError(true)
      setIntento((n) => n + 1)
    }
  }

  return (
    <motion.div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center
                 bg-gradient-to-b from-[#2a2140] to-[#1f1b2e]
                 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-xs">
        <span className="text-5xl">🔐</span>
        <h2 className="font-titulo text-3xl font-bold text-amber-200 mt-3">El candado</h2>
        <p className="font-titulo italic text-amber-100/70 mt-3 leading-relaxed">
          Escribí las tres piezas en el orden correcto.
        </p>
        <p className="text-sm text-amber-100/40 mt-1">
          Pista: pensá en cómo transcurre un día.
        </p>

        <motion.div
          key={intento}
          className="mt-8 flex flex-col gap-3"
          animate={error ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {etiquetas.map((et, i) => (
            <input
              key={et}
              value={valores[i]}
              onChange={(e) => cambiar(i, e.target.value)}
              placeholder={et}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              className="h-14 w-full rounded-xl bg-white/10 border border-amber-300/40 px-4
                         text-center text-lg text-amber-100 placeholder:text-amber-100/30
                         focus:outline-none focus:border-amber-300"
            />
          ))}
        </motion.div>

        {error && (
          <p className="mt-4 text-sm text-rose-300">
            Esa combinación no abre el candado. Revisá las piezas y su orden.
          </p>
        )}

        <button
          onClick={probar}
          className="mt-6 w-full h-14 rounded-full bg-amber-300 text-[#1f1b2e] text-lg font-semibold
                     shadow-lg active:scale-95 transition-transform"
        >
          Abrir
        </button>

        <button onClick={onVolver} className="mt-4 h-11 text-amber-100/60 text-sm">
          Volver a los sobres
        </button>
      </div>
    </motion.div>
  )
}