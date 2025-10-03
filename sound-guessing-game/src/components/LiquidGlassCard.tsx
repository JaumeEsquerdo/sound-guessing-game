import { motion } from "framer-motion"

export function LiquidGlassCard({
    children,
    containerStyle,
    randomOffset = Math.random() * 10 // factor aleatorio por tarjeta (math.random genera un numero aleatorio entre 0 y 1 y lo multiplica en este caso x 10  y dan el resultado en px)
}: {
    children: React.ReactNode;
    containerStyle?: React.CSSProperties;
    randomOffset?: number;
}) {
    const offset = randomOffset;

    return (
        <motion.div
            style={{
                position: "relative",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
                overflow: "hidden",
                padding: "32px",
                width: "100%",
                height: "100%",
                ...containerStyle,
            }}
        >
            {/* Gradiente animado tipo reflejo líquido */}
            <motion.div
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: "-25%",
                    left: "-25%",
                    width: "150%",
                    height: "150%",
                    backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(255,255,255,0.05) 20%),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3), rgba(255,255,255,0) 30%)
          `,
                    zIndex: 0,
                    filter: "blur(30px)",
                }}
                animate={{
                    x: ["0px", `${20 + offset}px`, `-${20 + offset}px`, "0px"],
                    y: ["0px", `-${10 + offset / 2}px`, `${10 + offset / 2}px`, "0px"],
                    rotate: [0, 1 + offset / 4, -1 - offset / 4, 0],
                    backgroundPosition: ["0% 0%", "50% 50%", "100% 100%", "0% 0%"],
                    filter: ["blur(30px)", "blur(28px)", "blur(32px)", "blur(30px)"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {children}
        </motion.div>
    );
}
