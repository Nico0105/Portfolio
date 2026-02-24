import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardFooter, Image, Button } from "@heroui/react";
import ingeniaPrintImg from "./assets/IngeniaPrint.png";
import ScouterImg from "./assets/Scouter.png";
import "./Home.css";

// ============================================================
// PROYECTOS — config manual
// ============================================================
const GITHUB_USER = "Nico0105";

const REPOS_CONFIG = [
  { name: "Ingenia-Print-Campus", customImage: ingeniaPrintImg },
  { name: "GestorEntrenamientos",  customImage: null },
  { name: "Scouter",               customImage: ScouterImg },
];

// ============================================================
// SKILLS DATA — SVG icons inline
// ============================================================
const SKILLS = [
  {
    name: "JavaScript",
    color: "#F7DF1E",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" fill="#F7DF1E"/>
        <path d="M112 12H16C13.8 12 12 13.8 12 16v96c0 2.2 1.8 4 4 4h96c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z" fill="#F7DF1E"/>
        <path d="M66 94.5c0 7.5-4.4 10.9-10.8 10.9-5.8 0-9.1-3-10.8-6.6l5.9-3.5c1.1 2 2.1 3.7 4.5 3.7 2.3 0 3.8-.9 3.8-4.4V64h7.4v30.5zm20.3 10.9c-6.7 0-11-3.2-13.1-7.4l5.9-3.4c1.5 2.5 3.6 4.3 7.1 4.3 3 0 4.9-1.5 4.9-3.5 0-2.4-2-3.3-5.3-4.7l-1.8-.8c-5.3-2.2-8.8-5-8.8-10.9 0-5.4 4.1-9.5 10.6-9.5 4.6 0 7.9 1.6 10.3 5.8l-5.6 3.6c-1.2-2.2-2.6-3.1-4.6-3.1-2.1 0-3.5 1.3-3.5 3.1 0 2.2 1.3 3 4.5 4.3l1.8.8c6.2 2.7 9.7 5.4 9.7 11.4 0 6.5-5.1 10-12 10z" fill="#333"/>
      </svg>
    ),
  },
  {
    name: "Java",
    color: "#ED8B00",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#EA2D2E" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187z"/>
        <path fill="#EA2D2E" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.677 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.001.359-.327.468-.617z"/>
        <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path fill="#EA2D2E" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
      </svg>
    ),
  },
  {
    name: "SQL",
    color: "#00758F",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#00758F" d="M116.948 97.807c-6.863-.187-12.104.452-16.585 2.341-1.273.537-3.305.552-3.513 2.147.7.733.809 1.829 1.365 2.731 1.07 1.73 2.876 4.052 4.488 5.268 1.762 1.33 3.577 2.751 5.465 3.902 3.358 2.047 7.107 3.217 10.34 5.268 1.906 1.21 3.799 2.733 5.658 4.097.92.675 1.537 1.724 2.732 2.147v-.194c-.628-.8-.79-1.898-1.366-2.733l-2.537-2.537c-2.48-3.292-5.629-6.184-8.976-8.585-2.669-1.916-8.642-4.504-9.755-7.609l-.195-.195c1.892-.214 4.107-.898 5.854-1.367 2.934-.786 5.556-.583 8.585-1.365l4.097-1.171v-.78c-1.531-1.571-2.623-3.651-4.292-5.073-4.37-3.72-9.138-7.437-14.048-10.537-2.724-1.718-6.089-2.835-8.976-4.292-.971-.491-2.677-.746-3.318-1.562-1.517-1.932-2.342-4.382-3.511-6.633-2.45-4.717-4.849-9.868-7.024-14.831-1.48-3.384-2.441-6.72-4.293-9.756-8.86-14.567-18.396-23.358-33.169-32-3.144-1.838-6.928-2.563-10.929-3.512-2.145-.129-4.292-.26-6.44-.391-1.311-.546-2.673-2.149-3.902-2.927-4.894-3.092-17.448-9.817-21.072-.975-2.289 5.581 3.421 11.025 5.462 13.854 1.434 1.982 3.269 4.207 4.293 6.438.675 1.467.79 2.938 1.367 4.489 1.417 3.822 2.652 7.98 4.487 11.511 1.418 2.689 2.975 5.521 4.878 7.804 1.098 1.332 2.987 1.921 3.316 4.293-1.865 2.598-1.969 6.603-3.122 9.561-4.87 15.368-.315 34.419 7.999 45.72 2.146 3.069 7.217 9.662 14.048 7.122 6.007-2.239 4.663-10.03 6.439-16.785l.391-1.952c.995 1.937 1.979 3.867 2.927 5.855 2.171 3.502 6.015 7.165 9.561 9.561 1.748 1.181 3.126 3.216 5.268 3.902v-.195h-.195c-.428-.614-1.075-.862-1.561-1.367-1.217-1.248-2.571-2.924-3.513-4.293-2.789-3.943-5.247-8.232-7.413-12.683-1.064-2.179-1.989-4.595-2.927-6.829-.351-.836-.351-2.101-1.17-2.537-1.083 1.676-2.704 3.035-3.513 5.073-1.358 3.408-1.485 7.661-1.952 12.097-.286.047-.195 0-.391.194-4.214-1.037-5.689-5.197-7.219-8.779-3.956-9.297-4.691-24.24-1.171-34.949.872-2.724 4.819-11.312 3.317-13.854-.786-2.097-3.386-3.315-4.878-4.975-1.807-2.04-3.543-4.731-4.683-7.219-3.032-6.652-4.692-14.073-8.193-20.468-1.673-3.036-4.506-6.103-6.829-8.781-2.562-2.955-5.429-5.1-7.412-8.778-.762-1.441-1.795-3.752-1.171-5.464.207-.587.39-1.249 1.17-1.366 1.168-.939 4.421.247 5.658.78 3.25 1.387 5.99 2.718 8.779 4.683 1.327.944 2.674 2.765 4.293 3.317h1.952c3.054.688 6.483.21 9.365 1.17 5.065 1.664 9.621 4.266 13.659 7.024 12.478 8.383 22.695 20.307 29.561 34.558 1.119 2.347 1.605 4.576 2.537 7.024 1.924 5.131 4.354 10.409 6.244 15.415 1.887 4.997 3.706 10.028 6.439 14.243 1.413 2.142 6.867 3.301 9.365 4.487 1.7.794 4.549 1.597 6.05 2.733 2.99 2.29 5.879 4.96 8.584 7.415 1.36 1.247 5.542 3.954 5.854 5.659z"/>
        <path fill="#00758F" d="M28.549 23.938c-1.519-.03-2.602.131-3.707.391v.195h.195c.722 1.481 1.989 2.437 2.927 3.708l2.147 4.488.195-.195c1.329-.937 1.942-2.435 1.951-4.683-.537-.567-.616-1.274-.975-1.952-.562-1.023-1.665-1.608-2.733-1.952z"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    color: "#6DA55F",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 34.998 10 38.407v51.142c0 3.476 2.153 6.423 5.012 8.062l11.278 6.589c5.506 2.749 7.484 2.749 9.994 2.749 8.105 0 12.794-4.911 12.794-13.482V46.185c0-.718-.979-1.297-1.697-1.297h-5.344c-.718 0-1.193.579-1.193 1.297V93.45c0 3.749-3.466 7.472-10.234 4.377L19.213 91.2c-.411-.234-.927-.757-.927-1.651V38.408c0-.93.324-1.778.927-2.113l44.744-25.609c.509-.246 1.394-.246 1.903 0l44.135 25.609c.603.336.772 1.184.772 2.113v51.142c0 .93-.169 1.519-.772 1.651l-44.195 25.609c-.51.246-1.312.246-1.82 0L54.16 109.2c-.347-.196-.806-.231-1.149-.044-3.484 1.678-4.134 2.224-7.381 3.535-.812.55 0 .907.462 1.192l13.609 8.099c1.38.783 2.894 1.192 4.41 1.192 1.514 0 3.009-.41 4.385-1.192l44.195-25.609c2.861-1.666 4.412-4.614 4.412-8.062V38.407c0-3.476-2.151-6.423-5.332-8.073z"/>
        <path fill="#83CD29" d="M77.727 81.977c-11.419 0-13.897-5.228-13.897-9.609 0-.718.56-1.297 1.279-1.297h5.453c.632 0 1.162.459 1.162 1.091.786 5.301 3.115 7.963 6.052 7.963 3.739 0 5.731-1.843 5.731-5.174 0-2.64-1.107-4.409-8.63-5.663-5.897-1.122-9.805-4.108-9.805-9.969 0-6.546 5.534-10.452 14.564-10.452 10.239 0 15.215 3.543 15.853 11.126.033.364-.089.696-.313.952-.229.255-.549.403-.882.403h-5.492c-.6 0-1.114-.441-1.167-1.034-.791-4.377-2.96-5.785-7.999-5.785-4.476 0-6.618 1.558-6.618 4.605 0 2.885 1.432 3.723 8.681 4.939 7.248 1.215 9.783 4.001 9.783 10.141-.001 7.036-5.867 11.763-15.756 11.763z"/>
      </svg>
    ),
  },
  {
    name: "Express.js",
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 73.47 81.56 81.33 74.32 89.3c-2.contemporary 2.43-4.73 3.21-8.37 2.46l26.36-30.93L67.56 32.22c4.34-.89 7.29-.07 9.9 3.54 5.86 8.24 12.18 16.14 18.89 24.86 7-8.35 13.83-16.24 20.32-24.41 2.36-2.94 4.86-4.6 8.83-3.54L100.3 58.08zM1.14 56.29C2.17 48.68 6.33 43.29 13.82 40c7.63-3.35 15.29-3.36 22.43.88 7.53 4.49 9.34 11.88 9.16 20.09H9c-.27 9.09 6.13 14.94 15.73 14.52 6.34-.28 11.65-2.89 15.55-8.14l7.08 4.36c-7.58 11.06-25.4 14.2-36.38 6.5C2.84 73.93-.37 65.73 1.14 56.29zm8.28-4.26h28.34c-.31-9.59-5.5-15.05-13.44-15.05-8.22 0-13.89 5.57-14.9 15.05z"/>
      </svg>
    ),
  },
  {
    name: "HTML",
    color: "#E34F26",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E44D26" d="M19.037 113.876L9.032 1.627h109.936l-10.016 112.249-45.019 12.495z"/>
        <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
        <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
        <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.336-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
      </svg>
    ),
  },
  {
    name: "CSS",
    color: "#1572B6",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/>
        <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z"/>
        <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/>
        <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018V87.349z"/>
        <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v13.6l28.354-7.858.208-2.337 2.406-26.091H81.127z"/>
        <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.333-3.711h34.648zm-.047 27.994v13.831H48.792l-.277-3.108-.631-7.012-.333-3.711h16.45z"/>
      </svg>
    ),
  },
  {
    name: "Python",
    color: "#3776AB",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5A9FD4"/>
          <stop offset="1" stopColor="#306998"/>
        </linearGradient>
        <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD43B"/>
          <stop offset="1" stopColor="#FFE873"/>
        </linearGradient>
        <path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
        <path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.548v23.508c0 6.693 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    color: "#06B6D4",
    svg: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.745 12.207 8.66C72.883 56.64 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.38-13.535-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.38 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.745-12.207-8.66C55.128 71.358 47.863 64 32.004 64zm0 0" fill="#38bdf8"/>
      </svg>
    ),
  },
];

// ============================================================
// ZOOM TITLE
// ============================================================
function ZoomTitle({ text, start }) {
  return (
    <motion.h1
      className="home-title"
      initial={{ scale: 4, opacity: 0, filter: "blur(20px)" }}
      animate={start ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.h1>
  );
}

// ============================================================
// LOADING SCREEN
// ============================================================
function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment =
        current < 70 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.3;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(() => {
          setVisible(false);
          if (onFinish) onFinish();
        }, 1400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const neonColor = `hsl(${120 + progress * 1.2}, 100%, 55%)`;
  const glowStrength = `0 0 8px ${neonColor}, 0 0 20px ${neonColor}, 0 0 45px ${neonColor}60`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="loader-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="loader-grain" />
          <div
            className="loader-ambient"
            style={{ background: `radial-gradient(circle, ${neonColor}08 0%, transparent 70%)` }}
          />
          <motion.div
            className="loader-percentage"
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ color: neonColor, textShadow: glowStrength }}
          >
            {progress}
            <span className="loader-percentage-symbol">%</span>
          </motion.div>
          <div className="loader-bar-container">
            <div className="loader-bar-labels" style={{ color: `${neonColor}80` }}>
              <span>Cargando</span>
              <span>{progress < 100 ? "Inicializando..." : "Listo ✦"}</span>
            </div>
            <div className="loader-bar-track">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%`, background: neonColor, boxShadow: glowStrength }}
              />
              <div
                className="loader-bar-dot"
                style={{
                  left: `${progress}%`,
                  boxShadow: `0 0 6px ${neonColor}, 0 0 18px ${neonColor}, 0 0 35px ${neonColor}`,
                }}
              />
            </div>
          </div>
          <AnimatePresence>
            {done && (
              <motion.div
                className="loader-done"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ color: neonColor, textShadow: glowStrength }}
              >
                ✦
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// PROJECTS SECTION
// ============================================================
function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const results = await Promise.all(
          REPOS_CONFIG.map(({ name }) =>
            fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`).then((r) => r.json())
          )
        );
        const merged = results.map((repo) => {
          const config = REPOS_CONFIG.find((r) => r.name === repo.name);
          return { ...repo, customImage: config?.customImage ?? null };
        });
        setProjects(merged);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getImage = (p) =>
    p.customImage || `https://opengraph.githubassets.com/1/${GITHUB_USER}/${p.name}`;

  if (loading) {
    return (
      <section className="projects-section">
        <p className="projects-loading">Cargando proyectos...</p>
      </section>
    );
  }

  const featured = projects[0];
  const rest     = projects.slice(1, 3);

  return (
    <motion.section
      className="projects-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="projects-header">
        <span className="section-number-label">02</span>
        <h3 className="section-title">Proyectos</h3>
      </div>

      {/* Featured — 1 grande */}
      {featured && (
        <motion.div
          className="project-card-wrapper project-card-featured"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a href={featured.html_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
            <Card isFooterBlurred className="project-card">
              <Image removeWrapper alt={featured.name} className="project-card-img project-card-img-featured" src={getImage(featured)} />
              <CardFooter className="project-card-footer">
                <div className="project-footer-info">
                  <p className="project-footer-title">{featured.name.replace(/-/g, " ")}</p>
                  <p className="project-footer-desc">
                    {featured.description ? featured.description.substring(0, 80) + "..." : "Ver en GitHub"}
                  </p>
                </div>
                <Button radius="full" size="sm" color="primary">GitHub</Button>
              </CardFooter>
            </Card>
          </a>
        </motion.div>
      )}

      {/* 2 abajo */}
      <div className="projects-grid-bottom">
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            className="project-card-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + 0.1 * i, duration: 0.5 }}
          >
            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="project-card-link">
              <Card isFooterBlurred className="project-card">
                {project.customImage ? (
                  <Image removeWrapper alt={project.name} className="project-card-img" src={getImage(project)} />
                ) : (
                  <div className="project-card-placeholder">
                    <span className="project-card-placeholder-name">{project.name.replace(/-/g, " ")}</span>
                  </div>
                )}
                <CardFooter className="project-card-footer">
                  <div className="project-footer-info">
                    <p className="project-footer-title">{project.name.replace(/-/g, " ")}</p>
                    <p className="project-footer-desc">
                      {project.description ? project.description.substring(0, 55) + "..." : "Ver en GitHub"}
                    </p>
                  </div>
                  <Button radius="full" size="sm" color="primary">GitHub</Button>
                </CardFooter>
              </Card>
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="about-header">
        <span className="section-number-label">03</span>
        <h3 className="section-title">Sobre mí</h3>
      </div>

      <div className="about-content">
        <motion.p
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Soy <span className="about-highlight">Nicolás Escolar</span>, desarrollador web
          Full Stack. Me especializo en el frontend con{" "}
          <span className="about-highlight">React y JavaScript</span>, y en el backend con{" "}
          <span className="about-highlight">Node.js, Java y Python</span>. Actualmente
          trabajo de manera <span className="about-highlight">freelance</span> y estoy
          cursando el último año de la carrera de{" "}
          <span className="about-highlight">Analista de Sistemas</span> en la Universidad
          Davinci.
        </motion.p>

        <motion.p
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Aprendo rápido y me gusta mucho lo que hago — construir cosas que funcionen bien
          y se vean mejor.
        </motion.p>
      </div>
    </motion.section>
  );
}

// ============================================================
// SKILLS SECTION
// ============================================================
function SkillsSection() {
  return (
    <motion.section
      className="skills-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="skills-header">
        <span className="section-number-label">04</span>
        <h3 className="section-title">Skills</h3>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.06 }}
            transition={{ delay: 0.05 * i, duration: 0.4, type: "spring", stiffness: 200 }}
            style={{ "--skill-color": skill.color }}
          >
            <div className="skill-icon">{skill.svg}</div>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-glow" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ============================================================
// HOME
// ============================================================
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      <main className="home-wrapper">
        <section className="home-hero">
         

          <ZoomTitle text="Nicolás Escolar" start={!loading} />
          <motion.p
            className="home-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Full Stack Developer · Web Developer
          </motion.p>
        </section>

        <ProjectsSection />
        <AboutSection />
        <SkillsSection />

        <footer className="home-footer">
          <p>© 2026 — Nicolás Escolar</p>
        </footer>
      </main>
    </>
  );
}