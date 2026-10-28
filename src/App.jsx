import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sobre from './components/Sobre'
import Carta from './components/Carta'
import Mesa from './components/Mesa'
import Candado from './components/Candado'
import Cinematica from './components/Cinematica'
import { SOBRES, ORDEN_MESA } from './datos'

// Corazoncitos flotando de fondo
function Corazones() {
  const lista = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    izquierda: (i * 83) % 100,
    tamano: 14 + ((i * 7) % 18),
    duracion: 7 + (i % 5),
    retraso: (i * 0.6) % 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lista.map((c) => (
        <motion.span
          key={c.id}
          className="absolute bottom-[-40px] text-pink-300/70"
          style={{ left: `${c.izquierda}%`, fontSize: c.tamano }}
          animate={{ y: [0, -900], opacity: [0, 1, 0] }}
          transition={{
            duration: c.duracion,
            delay: c.retraso,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}

function Inicio({ onEmpezar }) {
  return (
    <motion.div
      className="relative min-h-dvh flex flex-col items-center justify-center px-8 text-center
                 bg-gradient-to-b from-rose-50 via-pink-100 to-rose-200
                 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Corazones />

      <div className="relative z-10 max-w-sm">
        <motion.p
          className="font-mano text-2xl text-rose-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Preparado para vos con cariño
        </motion.p>

        <motion.h1
          className="font-titulo text-5xl font-bold text-rose-600 mt-3 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Valentina 
        </motion.h1>

        <motion.p
          className="font-titulo italic text-lg text-rose-900/70 mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Es una pequeña experiencia: sobres, secretos y mensaje al final.
          Tomate tu tiempo y disfrutala.
        </motion.p>

        <motion.button
          onClick={onEmpezar}
          className="mt-10 w-full h-14 rounded-full bg-rose-500 text-white text-lg font-semibold
                     shadow-lg shadow-rose-300 active:scale-95 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          Empezar 💌
        </motion.button>

        <motion.p
          className="text-sm text-rose-900/50 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          Mejor con el celular en vertical
        </motion.p>
      </div>
    </motion.div>
  )
}

function App() {
  const [pantalla, setPantalla] = useState('inicio') // inicio | sobres | final | juego
  const [activoId, setActivoId] = useState(null) // sobre elegido (null = estás en la mesa)
  const [sobreAbierto, setSobreAbierto] = useState(false)
  const [cartaAfuera, setCartaAfuera] = useState(false)
  const [vistos, setVistos] = useState([]) // ids de los sobres cuyo secreto ya vio

  const activo = SOBRES.find((s) => s.id === activoId)
  const enMesa = ORDEN_MESA.map((id) => SOBRES.find((s) => s.id === id))
  const tieneTodas = vistos.length === SOBRES.length

  const elegir = (id) => {
    setActivoId(id)
    setSobreAbierto(false)
    setCartaAfuera(false)
  }

  const marcarVisto = (id) => setVistos((v) => (v.includes(id) ? v : [...v, id]))

  return (
    <AnimatePresence mode="wait">
      {pantalla === 'inicio' && (
        <Inicio key="inicio" onEmpezar={() => setPantalla('sobres')} />
      )}

      {pantalla === 'sobres' && (
        <motion.div
          key="sobres"
          className="min-h-dvh flex flex-col items-center justify-center gap-6 px-6 py-8
                     bg-gradient-to-b from-rose-50 to-rose-100
                     pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!activo ? (
            <>
              <p className="font-titulo italic text-lg text-rose-900/70 text-center">
                Tres sobres y un solo orden correcto.
                <br />
                ¿Cuál va primero?
              </p>

              <Mesa sobres={enMesa} vistos={vistos} onElegir={elegir} />

              {tieneTodas && (
                <motion.button
                  onClick={() => setPantalla('final')}
                  className="h-14 px-8 rounded-full bg-rose-500 text-white text-lg font-semibold
                             shadow-lg shadow-rose-300 active:scale-95 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Ya tengo las tres piezas 🔐
                </motion.button>
              )}
            </>
          ) : (
            <>
              <p className="font-titulo italic text-lg text-rose-900/70 text-center">
                {sobreAbierto ? 'Tocá la carta para sacarla' : 'Tocá el sobre para abrirlo'}
              </p>

              <Sobre
                key={activo.id}
                mensaje={activo.mensaje}
                onAbrir={() => setSobreAbierto(true)}
                onSacarCarta={() => setCartaAfuera(true)}
              />

              <button
                onClick={() => setActivoId(null)}
                className="mt-2 h-11 px-6 rounded-full text-rose-500 text-sm font-semibold
                           border border-rose-300 active:scale-95 transition-transform"
              >
                Volver a la mesa
              </button>
            </>
          )}

          {/* Carta en grande, por encima de todo */}
          <AnimatePresence>
            {cartaAfuera && activo && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center
                           bg-rose-950/70 backdrop-blur-sm
                           pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ y: 200, scale: 0.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  exit={{ y: 200, scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14 }}
                >
                  <Carta
                    mensaje={activo.mensaje}
                    cifrado={activo.cifrado}
                    pista={activo.pista}
                    simbolo={activo.simbolo}
                    onDescubrir={() => marcarVisto(activo.id)}
                    onCerrar={() => setCartaAfuera(false)}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {pantalla === 'final' && (
        <Candado
          key="final"
          piezas={SOBRES.map((s) => s.pieza)}
          onAbrir={() => setPantalla('juego')}
          onVolver={() => {
            setActivoId(null)
            setPantalla('sobres')
          }}
        />
      )}

      {pantalla === 'juego' && <Cinematica key="cine" />}
    </AnimatePresence>
  )
}

export default App