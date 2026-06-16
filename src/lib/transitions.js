export const transitions = {
  micro:    { duration: 0.15, ease: "easeOut" },
  layout:   { duration: 0.20, ease: "easeOut" },
  entrance: { duration: 0.30, ease: [0.16, 1, 0.3, 1] },
}

export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.entrance },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
}