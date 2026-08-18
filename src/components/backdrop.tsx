export function Backdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#070A0F]">
      {/* Violet aurora — upper area (behind eclipse zone, reference x 42-64% y 5-25%) */}
      <div className="aurora-violet animate-aurora absolute top-[2%] left-[40%] h-[34vh] w-[24vw] rounded-full opacity-55" />

      {/* Mint aurora — right/lower */}
      <div className="aurora-mint animate-aurora absolute top-[35%] right-[-8%] h-[55vh] w-[38vw] rounded-full opacity-70 [animation-delay:-8s]" />

      {/* Faint mint glow — bottom-left */}
      <div className="aurora-mint absolute -bottom-[20%] left-[-5%] h-[45vh] w-[35vw] rounded-full opacity-40 [animation-delay:-16s]" />

      {/* Technical grid overlay */}
      <div className="grid-lines absolute inset-0 opacity-60" />

      {/* Vignette — keeps edges dark and premium */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_35%,transparent_40%,rgba(4,6,10,0.55)_100%)]" />
    </div>
  );
}