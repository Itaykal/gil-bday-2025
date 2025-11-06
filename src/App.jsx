import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import content from './content.json'
import './App.css'

function App() {
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [showSecret, setShowSecret] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [shakeIntensity, setShakeIntensity] = useState(0)
  const [showAtla, setShowAtla] = useState(false)
  const [keySequence, setKeySequence] = useState('')
  const [showFirstClick, setShowFirstClick] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [emojiClickCount, setEmojiClickCount] = useState(0)

  // VINE BOOM SOUND
  const [playBoom] = useSound(`${import.meta.env.BASE_URL}vine-boom.mp3`, { volume: 0.5 })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ATLA Easter egg - type "yipyip" to activate
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = (keySequence + e.key.toLowerCase()).slice(-6)
      setKeySequence(newSequence)

      if (newSequence === 'yipyip') {
        setShowAtla(true)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [keySequence])

  const handleCakeClick = () => {
    // VINE BOOM
    playBoom()

    // First click - show massive popup
    if (clickCount === 0) {
      setShowFirstClick(true)
      setTimeout(() => setShowFirstClick(false), 2500)
    }

    setClickCount(prev => prev + 1)
    setShakeIntensity(prev => prev + 5)

    if (clickCount >= 4) {
      setShowSecret(true)
    }

    setTimeout(() => setShakeIntensity(0), 500)
  }

  // Handle corner emoji click for mobile ATLA easter egg
  const handleEmojiClick = () => {
    const newCount = emojiClickCount + 1
    setEmojiClickCount(newCount)

    if (newCount >= 3) {
      setShowAtla(true)
      setEmojiClickCount(0)
    }
  }

  // Parse markdown links [text](url) in wishes
  const parseMarkdownLink = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
      }
      // Add the link
      parts.push({ type: 'link', text: match[1], url: match[2] })
      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) })
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }]
  }

  return (
    <>
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={true}
        numberOfPieces={200}
      />

      <div className="container">
        <motion.div
          className="spinning-emojis top-left easter-egg-trigger"
          animate={{
            rotate: 360,
            x: (mousePosition.x - windowDimension.width / 2) * 0.02,
            y: (mousePosition.y - windowDimension.height / 2) * 0.02,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", x: { type: "spring" }, y: { type: "spring" } }}
          onClick={handleEmojiClick}
          whileTap={{ scale: 1.3 }}
        >
          🎉✨🎂
        </motion.div>
        <motion.div
          className="spinning-emojis top-right"
          animate={{
            rotate: -360,
            x: (mousePosition.x - windowDimension.width / 2) * -0.02,
            y: (mousePosition.y - windowDimension.height / 2) * 0.02,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", x: { type: "spring" }, y: { type: "spring" } }}
        >
          🎈🎁🌟
        </motion.div>
        <motion.div
          className="spinning-emojis bottom-left"
          animate={{
            rotate: 360,
            x: (mousePosition.x - windowDimension.width / 2) * 0.02,
            y: (mousePosition.y - windowDimension.height / 2) * -0.02,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", x: { type: "spring" }, y: { type: "spring" } }}
        >
          💖🎊🔥
        </motion.div>
        <motion.div
          className="spinning-emojis bottom-right"
          animate={{
            rotate: -360,
            x: (mousePosition.x - windowDimension.width / 2) * -0.02,
            y: (mousePosition.y - windowDimension.height / 2) * -0.02,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", x: { type: "spring" }, y: { type: "spring" } }}
        >
          👑💅✨
        </motion.div>

        <motion.div
          className={`main-content ${shakeIntensity > 0 ? 'shake' : ''}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.6 }}
        >
          <motion.h1
            className="rainbow-text"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", delay: 0.3, duration: 0.8 }}
          >
            {content.title.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.3, rotate: 10, color: "#ff00ff" }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            className="cake-container"
            onClick={handleCakeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: [0, -10, 10, -10, 0] }}
          >
            <motion.div
              className="cake"
              animate={{
                rotate: [0, 5, -5, 5, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎂
            </motion.div>
            <p className="click-hint">
              {clickCount < 5 ? content.cakeHint : content.cakeHintFinal}
            </p>
          </motion.div>

          <div className="blessing-container">
            {content.blessings.filter(b => b.trim() !== '').map((blessing, index) => (
              <motion.div
                key={index}
                className="blessing-text"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.5 + index * 0.1,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -5, 5, -5, 0],
                  boxShadow: "0 10px 40px rgba(147, 112, 219, 0.6)",
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{
                  scale: 0.95,
                  rotate: [0, 10, -10, 0],
                }}
                style={{
                  fontSize: `${1.2 + Math.random() * 0.8}rem`,
                  cursor: "pointer"
                }}
              >
                {Array.from(blessing).map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    style={{ display: "inline-block" }}
                    whileHover={{
                      y: -3,
                      color: "#ff00ff",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="main-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.p
              className="message-line"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.7, type: "spring" }}
            >
              {content.wishesTitle}
            </motion.p>
            <div className="wishes">
              {content.wishes.map((wish, index) => {
                const parsedContent = parseMarkdownLink(wish)
                return (
                  <motion.span
                    key={index}
                    className="wish"
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 3 + index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                      rotate: [0, 2, -2, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {parsedContent.map((part, partIndex) => {
                      if (part.type === 'link') {
                        return (
                          <a
                            key={partIndex}
                            href={part.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wish-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {part.text}
                          </a>
                        )
                      }
                      return <span key={partIndex}>{part.content}</span>
                    })}
                  </motion.span>
                )
              })}
            </div>
          </motion.div>

          <AnimatePresence>
            {showSecret && (
              <motion.div
                className="secret-message"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <motion.div
                  className="secret-box"
                  animate={{
                    rotate: [0, -2, 2, -2, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <motion.p
                    className="secret-title"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    {content.secretMessage.title}
                  </motion.p>
                  <p className="secret-text">
                    {content.secretMessage.lines.map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < content.secretMessage.lines.length - 1 && <br/>}
                      </span>
                    ))}
                  </p>
                  <div className="extra-emojis">
                    🎮🎂📚🌙✨🎵💫🍕🎉🦄🎁🔥⭐🌟🎈
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="footer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, type: "spring" }}
          >
            <motion.p
              className="footer-text"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {content.footer.main}
            </motion.p>
            <p className="small-text">
              {content.footer.subtitle}
            </p>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showFirstClick && (
            <motion.div
              className="first-click-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="first-click-popup"
                initial={{ scale: 0, rotate: -720 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 720 }}
                transition={{
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.6
                }}
              >
                <motion.h1
                  className="first-click-text"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.2
                  }}
                >
                  {content.firstClickPopup}
                </motion.h1>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAtla && (
            <motion.div
              className="atla-overlay"
              onClick={() => setShowAtla(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="atla-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <div className="element-symbols">
                  {['🌊', '🪨', '🔥', '💨'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className={`element ${['water', 'earth', 'fire', 'air'][index]}`}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.5, rotate: 360 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
                <motion.h2
                  className="atla-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {content.atla.title}
                </motion.h2>
              {content.atla.quotes.map((quoteObj, index) => (
                <div key={index} className="atla-quote-block">
                  <p className="atla-quote">
                    "{quoteObj.quote}"
                    {quoteObj.continuation && (
                      <>
                        <br/>
                        {quoteObj.continuation}
                      </>
                    )}
                  </p>
                  {quoteObj.speaker && (
                    <p className="atla-speaker">— {quoteObj.speaker}</p>
                  )}
                  <p className="atla-addition">{quoteObj.addition}</p>
                </div>
              ))}
              <div className="atla-elements-row">
                {content.atla.elements.map((element, index) => (
                  <div key={index} className="element-badge">{element}</div>
                ))}
              </div>
              <motion.p
                className="atla-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {content.atla.footer}
              </motion.p>
              <motion.button
                className="atla-close"
                onClick={() => setShowAtla(false)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {content.atla.closeButton}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <div className="floating-emojis">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="floating-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            >
              {['🎂', '🎉', '🎈', '🎁', '✨', '💖', '🌟', '🎊'][Math.floor(Math.random() * 8)]}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
