import { motion } from 'framer-motion'

const rotaciones = [-4, 3, -2]

export default function Mesa({ sobres, vistos, onElegir }) {
  return (
    <div className="flex flex-col items-center gap-8">
      {sobres.map((s, i) => {
        const visto = vistos.includes(s.id)
        return (
          <motion.button
            key={s.id}
            aria-label="Elegir este sobre"
            onClick={() => onElegir(s.id)}
            className="relative w-[230px] h-[150px] cursor-pointer"
            style={{ rotate: rotaciones[i] }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i, duration: 0.6 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Sombra */}
            <div className="absolute -bottom-4 left-5 right-5 h-4 rounded-full bg-rose-900/15 blur-md" />

            {/* Sobre cerrado */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{ background: '#e85d6f' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: '#ff8f94', clipPath: 'polygon(0 0, 55% 50%, 0 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: '#ff7d88', clipPath: 'polygon(100% 0, 45% 50%, 100% 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: '#ff6b7a', clipPath: 'polygon(0 100%, 50% 44%, 100% 100%)' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: '#ff6f81', clipPath: 'polygon(0 0, 100% 0, 50% 60%)' }}
              />
            </div>

            {/* Sello */}
            <div
              className="absolute left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-red-700
                         shadow-lg shadow-red-900/40 flex items-center justify-center
                         text-rose-100 text-lg ring-2 ring-red-800/40"
              style={{ top: '58%' }}
            >
              ♥
            </div>

            {/* Símbolo: aparece cuando ya viste el secreto de ese sobre */}
            {visto && (
              <motion.div
                className="absolute -top-3 -right-3 w-11 h-11 rounded-full bg-[#1f1b2e]
                           border border-amber-300/60 flex items-center justify-center text-2xl shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                {s.simbolo}
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}