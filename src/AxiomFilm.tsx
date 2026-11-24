import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type CSS = React.CSSProperties;

const COLORS = {
  paper: '#F8FAFC',
  ink: '#101827',
  muted: '#64748B',
  line: 'rgba(15, 23, 42, 0.10)',
  indigo: '#635BFF',
  indigoDeep: '#4038A8',
  cyan: '#14B8A6',
  emerald: '#10B981',
  red: '#E05252',
  white: '#FFFFFF',
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reveal = (frame: number, start: number, length: number) =>
  interpolate(frame, [start, start + length], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + 10, end - 10, end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

const mono: CSS = {
  fontFamily: '"SFMono-Regular", "Roboto Mono", Menlo, monospace',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

const serif: CSS = {
  fontFamily: '"AXIOM Instrument", Georgia, "Times New Roman", serif',
  fontStyle: 'italic',
  fontWeight: 400,
};

function GridBackground({ landscape }: { landscape: boolean }) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.paper,
        backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px), radial-gradient(circle at 50% 40%, rgba(99,91,255,0.10), transparent 38%)`,
        backgroundSize: landscape ? '56px 56px, 56px 56px, 100% 100%' : '42px 42px, 42px 42px, 100% 100%',
      }}
    />
  );
}

function TopChrome({ section, landscape }: { section: string; landscape: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: landscape ? '5.5%' : '3.2%',
        left: landscape ? '7%' : '7.5%',
        right: landscape ? '7%' : '7.5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: COLORS.muted,
        ...mono,
        fontSize: landscape ? '1.0vw' : '1.75vw',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: COLORS.ink, fontWeight: 700 }}>✦ AXIOM / RUSAN</span>
      <span>{section}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.55em' }}>
        <i style={{ width: '0.55em', height: '0.55em', borderRadius: '50%', background: COLORS.emerald, display: 'inline-block' }} />
        LIVE SYSTEM
      </span>
    </div>
  );
}

function SceneFrame({ children, opacity = 1 }: { children: React.ReactNode; opacity?: number }) {
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

function HookScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 16, stiffness: 115, mass: 0.7 } });
  const second = spring({ frame: Math.max(0, frame - 7), fps, config: { damping: 16, stiffness: 120, mass: 0.65 } });
  const third = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 135, mass: 0.6 } });
  const opacity = fade(frame, 0, 60);

  return (
    <SceneFrame opacity={opacity}>
      <TopChrome section="01 / POINT OF VIEW" landscape={landscape} />
      <div style={{ position: 'absolute', left: landscape ? '13%' : '9%', top: landscape ? '22%' : '19%', width: landscape ? '74%' : '82%' }}>
        <div style={{ ...mono, color: COLORS.indigo, fontSize: landscape ? '1.15vw' : '2.35vw', fontWeight: 700, marginBottom: landscape ? '3.4vh' : '4.7vh' }}>
          A FOUNDER-LED OPERATING SYSTEM
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ color: COLORS.ink, fontSize: landscape ? '7.2vw' : '11.4vw', lineHeight: 0.92, fontWeight: 850, letterSpacing: '-0.075em', transform: `translateX(${interpolate(entrance, [0, 1], [-12, 0])}%)` }}>
            YOUR BUSINESS
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: landscape ? '1.4vh' : '1.8vh' }}>
          <div style={{ ...serif, color: COLORS.ink, fontSize: landscape ? '8.6vw' : '13.4vw', lineHeight: 0.85, transform: `translateX(${interpolate(second, [0, 1], [18, 0])}%)` }}>
            doesn&apos;t need
          </div>
        </div>
        <div style={{ overflow: 'hidden', marginTop: landscape ? '1.8vh' : '2.2vh' }}>
          <div style={{ color: COLORS.indigo, fontSize: landscape ? '8.3vw' : '13.1vw', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.08em', textShadow: '0 12px 35px rgba(99,91,255,0.18)', transform: `translateX(${interpolate(third, [0, 1], [-18, 0])}%)` }}>
            MORE TOOLS.
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: landscape ? '13%' : '9%', bottom: landscape ? '16%' : '12%', display: 'flex', alignItems: 'center', gap: '1.2em', color: COLORS.muted, ...mono, fontSize: landscape ? '0.95vw' : '2vw' }}>
        <span style={{ width: landscape ? '6vw' : '16vw', height: 1, background: COLORS.indigo, display: 'block' }} />
        <span>THE COST IS MANUAL DRAG</span>
      </div>
      <div style={{ position: 'absolute', top: `${interpolate(frame, [45, 60], [-4, 104], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%`, left: 0, width: '100%', height: landscape ? '0.35vw' : '0.8vw', background: COLORS.indigo, boxShadow: `0 0 ${landscape ? '1.6vw' : '4vw'} ${COLORS.indigo}`, opacity: interpolate(frame, [44, 50, 58, 61], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }} />
    </SceneFrame>
  );
}

const problemCards = [
  { name: 'AIRTABLE SYNC', status: '429 / RATE LIMIT', detail: '148 leads held in queue', color: COLORS.red, x: 8, y: 31, r: -8 },
  { name: 'ZAPIER AUTOMATION', status: '504 / TIMEOUT', detail: 'API response stalled', color: '#B7791F', x: 51, y: 27, r: 9 },
  { name: 'SLACK WEBHOOK', status: 'SILENT FAILURE', detail: 'Payload discarded', color: COLORS.red, x: 15, y: 60, r: 6 },
  { name: 'CRM DEAL SYNC', status: 'DISCONNECTED', detail: 'Manual copy-pasting', color: '#B7791F', x: 56, y: 59, r: -7 },
];

function ProblemCard({ card, index, landscape }: { card: (typeof problemCards)[number]; index: number; landscape: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inSpring = spring({ frame: Math.max(0, frame - index * 5), fps, config: { damping: 13, stiffness: 120, mass: 0.55 } });
  const drift = Math.sin((frame + index * 21) / 13) * (landscape ? 0.6 : 1.1);
  return (
    <div style={{ position: 'absolute', left: `${landscape ? card.x + 8 : card.x}%`, top: `${landscape ? card.y - 4 : card.y}%`, width: landscape ? '20%' : '35%', minHeight: landscape ? '18%' : '13%', padding: landscape ? '1.1vw' : '3.3vw', background: 'rgba(255,255,255,0.86)', border: `1px solid ${card.color}55`, boxShadow: `0 16px 36px rgba(15,23,42,0.08)`, transform: `translate(${interpolate(inSpring, [0, 1], [index % 2 ? 22 : -22, 0])}%, ${interpolate(inSpring, [0, 1], [index * 13, 0])}%) rotate(${card.r + drift}deg)`, opacity: interpolate(inSpring, [0, 1], [0, 1]) }}>
      <div style={{ ...mono, color: COLORS.muted, fontSize: landscape ? '0.82vw' : '1.55vw', marginBottom: '0.9em' }}>{card.name}</div>
      <div style={{ color: card.color, fontSize: landscape ? '1.35vw' : '3.0vw', fontWeight: 800, letterSpacing: '-0.04em' }}>{card.status}</div>
      <div style={{ color: COLORS.ink, marginTop: '0.8em', fontSize: landscape ? '0.92vw' : '1.8vw' }}>{card.detail}</div>
      <div style={{ display: 'flex', gap: '0.4em', marginTop: '1.1em' }}>
        {[0, 1, 2, 3].map((dot) => <span key={dot} style={{ width: landscape ? '0.35vw' : '0.9vw', height: landscape ? '0.35vw' : '0.9vw', borderRadius: '50%', background: card.color, opacity: 0.34 + dot * 0.15 }} />)}
      </div>
    </div>
  );
}

function ProblemScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 0, 75);
  return (
    <SceneFrame opacity={opacity}>
      <TopChrome section="02 / OPERATIONAL DRAG" landscape={landscape} />
      <div style={{ position: 'absolute', left: landscape ? '13%' : '9%', top: landscape ? '15%' : '13%', width: landscape ? '74%' : '82%' }}>
        <div style={{ color: COLORS.ink, fontSize: landscape ? '5.7vw' : '9.4vw', fontWeight: 900, letterSpacing: '-0.07em', lineHeight: 0.92 }}>TOO MANY TOOLS.</div>
        <div style={{ ...serif, color: COLORS.red, fontSize: landscape ? '6.3vw' : '10.1vw', lineHeight: 0.95, marginTop: '1.2vh' }}>nothing connected.</div>
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        {problemCards.map((card, index) => <ProblemCard key={card.name} card={card} index={index} landscape={landscape} />)}
        {[0, 1, 2].map((line) => <div key={line} style={{ position: 'absolute', left: `${landscape ? 31 + line * 11 : 30 + line * 12}%`, top: `${landscape ? 47 + line * 3 : 45 + line * 5}%`, width: landscape ? '15%' : '22%', borderTop: `1px dashed ${COLORS.red}88`, transform: `rotate(${line % 2 ? 18 : -13}deg)`, opacity: 0.8 }} />)}
      </div>
      <div style={{ position: 'absolute', left: landscape ? '13%' : '9%', right: landscape ? '13%' : '9%', bottom: landscape ? '10%' : '8%', borderTop: `1px solid ${COLORS.red}66`, paddingTop: '1em', color: COLORS.red, ...mono, fontSize: landscape ? '0.85vw' : '1.7vw' }}>
        OPERATIONAL DRAG <span style={{ color: COLORS.ink }}>+18 HRS / WEEK LOST TO MANUAL TRIAGE</span>
      </div>
    </SceneFrame>
  );
}

const systemPills = ['LEAD QUALIFICATION', 'CLIENT ONBOARDING', 'CONTENT ENGINE', 'KNOWLEDGE COPILOT'];

function ShiftScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const progress = reveal(frame, 0, 64);
  const opacity = fade(frame, 0, 75);
  return (
    <SceneFrame opacity={opacity}>
      <TopChrome section="03 / DETERMINISTIC ARCHITECTURE" landscape={landscape} />
      <div style={{ position: 'absolute', left: '50%', top: '13%', transform: 'translateX(-50%)', width: landscape ? '75%' : '84%', textAlign: 'center' }}>
        <div style={{ ...mono, color: COLORS.indigo, fontSize: landscape ? '1vw' : '2vw', fontWeight: 700 }}>THE AXIOM SHIFT</div>
        <div style={{ color: COLORS.ink, fontWeight: 900, fontSize: landscape ? '6.2vw' : '10.2vw', letterSpacing: '-0.08em', lineHeight: 0.9, marginTop: '1.6vh' }}>CHAOS COLLAPSES</div>
        <div style={{ ...serif, color: COLORS.indigo, fontSize: landscape ? '5.5vw' : '9.4vw', lineHeight: 0.95, marginTop: '1vh' }}>into connected systems.</div>
      </div>
      <div style={{ position: 'absolute', top: `${interpolate(progress, [0, 1], [-20, 120])}%`, left: 0, width: '100%', height: landscape ? '0.28vw' : '0.7vw', background: COLORS.indigo, boxShadow: `0 0 ${landscape ? '2vw' : '5vw'} ${COLORS.indigo}`, zIndex: 5 }} />
      <div style={{ position: 'absolute', left: landscape ? '12%' : '8%', right: landscape ? '12%' : '8%', top: landscape ? '55%' : '48%', display: 'grid', gridTemplateColumns: landscape ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', gap: landscape ? '1vw' : '2.4vw' }}>
        {systemPills.map((pill, index) => {
          const pillIn = reveal(frame, 10 + index * 6, 24);
          return (
            <div key={pill} style={{ border: `1px solid ${COLORS.indigo}66`, background: 'rgba(255,255,255,0.78)', padding: landscape ? '1.2vw' : '3.5vw 2.5vw', transform: `translateY(${interpolate(pillIn, [0, 1], [22, 0])}px)`, opacity: pillIn, boxShadow: '0 12px 26px rgba(99,91,255,0.10)' }}>
              <div style={{ ...mono, color: COLORS.indigo, fontSize: landscape ? '0.78vw' : '1.5vw' }}>0{index + 1} // VERIFIED</div>
              <div style={{ color: COLORS.ink, fontSize: landscape ? '1.0vw' : '2.6vw', fontWeight: 800, marginTop: '0.8em', lineHeight: 1.05 }}>{pill}</div>
              <div style={{ color: COLORS.emerald, ...mono, fontSize: landscape ? '0.72vw' : '1.25vw', marginTop: '1.1em' }}>✓ SYSTEM CONNECTED</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', bottom: landscape ? '10%' : '8%', width: '100%', textAlign: 'center', ...mono, color: COLORS.muted, fontSize: landscape ? '0.86vw' : '1.7vw' }}>ONE OPERATING LAYER // ZERO MANUAL HANDOFFS</div>
    </SceneFrame>
  );
}

function DashboardScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 0, 105);
  const cursorProgress = reveal(frame, 28, 34);
  const tasks = Math.round(interpolate(frame, [0, 80], [1220, 1248], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  return (
    <SceneFrame opacity={opacity}>
      <TopChrome section="04 / AXIOM CORE" landscape={landscape} />
      <div style={{ position: 'absolute', left: landscape ? '7%' : '6%', top: landscape ? '14%' : '11%', width: landscape ? '86%' : '88%', height: landscape ? '72%' : '76%', background: 'rgba(255,255,255,0.91)', border: `1px solid ${COLORS.indigo}40`, boxShadow: '0 25px 70px rgba(15,23,42,0.13)', overflow: 'hidden' }}>
        <div style={{ height: landscape ? '12%' : '9%', borderBottom: `1px solid ${COLORS.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: landscape ? '0 2.1vw' : '0 4vw' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7em', color: COLORS.ink, fontWeight: 800, fontSize: landscape ? '1.2vw' : '2.8vw' }}><span style={{ color: COLORS.indigo }}>✦</span> Axiom Core</div>
          <div style={{ ...mono, color: COLORS.muted, fontSize: landscape ? '0.73vw' : '1.35vw' }}>⌘K &nbsp; / &nbsp; RUSAN</div>
        </div>
        <div style={{ padding: landscape ? '2vw 2.2vw' : '4.2vw' }}>
          <div style={{ color: COLORS.ink, fontSize: landscape ? '2.3vw' : '5vw', letterSpacing: '-0.06em', fontWeight: 800 }}>Good evening, Rusan<span style={{ color: COLORS.indigo }}>.</span></div>
          <div style={{ color: COLORS.muted, fontSize: landscape ? '1vw' : '2vw', marginTop: '0.7em' }}>Your automation systems are running smoothly.</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: landscape ? '1vw' : '2vw', marginTop: landscape ? '2.4vw' : '4vw' }}>
            {[['07', 'SYSTEMS ACTIVE', COLORS.indigo], [tasks.toLocaleString(), 'TASKS COMPLETED', COLORS.ink], ['99.9%', 'UPTIME', COLORS.emerald]].map(([value, label, color]) => (
              <div key={label} style={{ borderTop: `2px solid ${color}`, paddingTop: '0.85em' }}><div style={{ color, fontSize: landscape ? '2.0vw' : '4.2vw', fontWeight: 800, letterSpacing: '-0.06em' }}>{value}</div><div style={{ ...mono, color: COLORS.muted, fontSize: landscape ? '0.7vw' : '1.3vw', marginTop: '0.5em' }}>{label}</div></div>
            ))}
          </div>
          <div style={{ marginTop: landscape ? '2.2vw' : '4vw', border: `1px solid ${COLORS.line}`, padding: landscape ? '1.3vw' : '2.8vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', ...mono, color: COLORS.muted, fontSize: landscape ? '0.7vw' : '1.35vw' }}><span>THROUGHPUT / LIVE</span><span style={{ color: COLORS.emerald }}>● NOMINAL</span></div>
            <svg viewBox="0 0 800 150" style={{ width: '100%', height: landscape ? '7vw' : '18vw', marginTop: '1em', overflow: 'visible' }}>
              <path d="M0 118 C90 105, 110 42, 190 72 S315 120, 390 53 S530 30, 600 78 S710 111, 800 24" fill="none" stroke={`${COLORS.indigo}28`} strokeWidth="18" />
              <path d="M0 118 C90 105, 110 42, 190 72 S315 120, 390 53 S530 30, 600 78 S710 111, 800 24" fill="none" stroke={COLORS.indigo} strokeWidth="4" strokeDasharray="1000" strokeDashoffset={interpolate(frame, [0, 105], [1000, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
              <circle cx={interpolate(frame, [0, 105], [0, 800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} cy="95" r="7" fill={COLORS.indigo} />
            </svg>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: landscape ? '1fr 1fr' : '1fr', gap: landscape ? '0.8vw' : '1.6vw', marginTop: landscape ? '1.2vw' : '2vw' }}>
            {['Lead Qualification & CRM Sync', 'Zero-Friction Client Onboarding'].map((item, index) => <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${COLORS.line}`, padding: landscape ? '0.8vw 1vw' : '1.7vw', color: COLORS.ink, fontSize: landscape ? '0.82vw' : '1.65vw' }}><span>{item}</span><span style={{ color: COLORS.emerald, ...mono, fontSize: landscape ? '0.6vw' : '1.1vw' }}>✓ {index === 0 ? 'DISPATCHED' : 'RUNNING'}</span></div>)}
          </div>
        </div>
        <div style={{ position: 'absolute', left: `${interpolate(cursorProgress, [0, 1], [60, 80])}%`, top: `${interpolate(cursorProgress, [0, 1], [62, 77])}%`, width: landscape ? '1.2vw' : '2.8vw', height: landscape ? '1.6vw' : '3.5vw', borderLeft: `0.18em solid ${COLORS.ink}`, borderBottom: `0.18em solid ${COLORS.ink}`, transform: 'rotate(-35deg)', opacity: cursorProgress, filter: `drop-shadow(0 0 8px ${COLORS.indigo})` }} />
      </div>
    </SceneFrame>
  );
}

const services = [
  ['01', 'AI AUTOMATIONS', 'Remove repetitive work.'],
  ['02', 'WEBSITE DESIGN', 'Build the digital front door.'],
  ['03', 'CRM BUILDS', 'Keep qualified pipeline moving.'],
  ['04', 'AI CONSULTANCY', 'Direct architecture with Rusan.'],
];

function ServiceScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 0, 75);
  return (
    <SceneFrame opacity={opacity}>
      <TopChrome section="05 / THE SERVICE STACK" landscape={landscape} />
      <div style={{ position: 'absolute', left: landscape ? '10%' : '8%', top: landscape ? '15%' : '14%', width: landscape ? '80%' : '84%' }}>
        <div style={{ color: COLORS.ink, fontWeight: 900, fontSize: landscape ? '6.2vw' : '10.8vw', letterSpacing: '-0.08em', lineHeight: 0.9 }}>Automate the Work<span style={{ color: COLORS.indigo }}>.</span></div>
        <div style={{ ...serif, color: COLORS.indigo, fontSize: landscape ? '6.2vw' : '10.8vw', lineHeight: 0.93, marginTop: '1vh' }}>Amplify the Business.</div>
        <div style={{ color: COLORS.muted, fontSize: landscape ? '1.05vw' : '2.1vw', lineHeight: 1.35, maxWidth: landscape ? '64%' : '92%', marginTop: '2.5vh' }}>Practical systems for ambitious businesses — designed and connected directly with Rusan.</div>
      </div>
      <div style={{ position: 'absolute', left: landscape ? '10%' : '8%', right: landscape ? '10%' : '8%', top: landscape ? '56%' : '53%', display: 'grid', gridTemplateColumns: landscape ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)', gap: landscape ? '1vw' : '2.3vw' }}>
        {services.map(([number, title, detail], index) => {
          const inFrame = reveal(frame, 10 + index * 6, 24);
          return <div key={title} style={{ background: index === 0 ? COLORS.indigo : 'rgba(255,255,255,0.8)', color: index === 0 ? COLORS.white : COLORS.ink, border: `1px solid ${index === 0 ? COLORS.indigo : COLORS.line}`, padding: landscape ? '1.2vw' : '3.2vw 2.5vw', minHeight: landscape ? '8vw' : '20vw', opacity: inFrame, transform: `translateY(${interpolate(inFrame, [0, 1], [20, 0])}px)` }}><div style={{ ...mono, fontSize: landscape ? '0.68vw' : '1.3vw', opacity: 0.72 }}>{number} // AXIOM</div><div style={{ fontWeight: 800, fontSize: landscape ? '1.1vw' : '2.45vw', lineHeight: 1.05, marginTop: '1.1em' }}>{title}</div><div style={{ fontSize: landscape ? '0.82vw' : '1.55vw', opacity: 0.72, marginTop: '0.8em', lineHeight: 1.25 }}>{detail}</div></div>;
        })}
      </div>
      <div style={{ position: 'absolute', bottom: landscape ? '8%' : '7%', width: '100%', textAlign: 'center', ...mono, color: COLORS.muted, fontSize: landscape ? '0.78vw' : '1.5vw' }}>FOUNDER-LED // NO HANDOFFS // SYSTEMS THAT COMPOUND</div>
    </SceneFrame>
  );
}

function RevealScene({ landscape }: { landscape: boolean }) {
  const frame = useCurrentFrame();
  const star = spring({ frame, fps: useVideoConfig().fps, config: { damping: 12, stiffness: 85, mass: 0.55 } });
  const opacity = fade(frame, 0, 60);
  const pulse = 1 + Math.sin(frame / 8) * 0.035;
  return (
    <SceneFrame opacity={opacity}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 38%, rgba(99,91,255,0.18), transparent 33%)' }} />
      <TopChrome section="06 / SYSTEMS OPERATIONAL" landscape={landscape} />
      <div style={{ position: 'absolute', top: landscape ? '14%' : '16%', width: '100%', textAlign: 'center', ...mono, color: COLORS.indigo, fontSize: landscape ? '0.95vw' : '1.9vw' }}>✦ AXIOM BY RUSAN</div>
      <div style={{ position: 'absolute', top: landscape ? '25%' : '25%', width: '100%', textAlign: 'center', transform: `scale(${interpolate(star, [0, 1], [0.5, 1]) * pulse})`, opacity: star }}>
        <div style={{ color: COLORS.indigo, fontSize: landscape ? '8vw' : '22vw', lineHeight: 0.65, filter: `drop-shadow(0 0 ${landscape ? '2vw' : '6vw'} rgba(99,91,255,0.32))` }}>✦</div>
      </div>
      <div style={{ position: 'absolute', top: landscape ? '44%' : '43%', width: '100%', textAlign: 'center' }}>
        <div style={{ color: COLORS.ink, fontSize: landscape ? '8.6vw' : '18vw', fontWeight: 900, letterSpacing: '-0.11em', lineHeight: 0.75 }}>AXIOM</div>
        <div style={{ ...serif, color: COLORS.muted, fontSize: landscape ? '2.1vw' : '5.8vw', marginTop: '1.2em' }}>by Rusan</div>
        <div style={{ display: 'inline-block', ...mono, color: COLORS.indigo, border: `1px solid ${COLORS.indigo}88`, padding: landscape ? '0.75vw 1.15vw' : '1.8vw 2.8vw', fontSize: landscape ? '0.72vw' : '1.45vw', marginTop: landscape ? '2.1vw' : '4.2vw' }}>AI AUTOMATION &amp; DIGITAL PRESENCE ADVISORY</div>
      </div>
      <div style={{ position: 'absolute', top: landscape ? '77%' : '76%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: landscape ? '1.2vw' : '2.8vw' }}>
        <div style={{ background: COLORS.ink, color: COLORS.white, padding: landscape ? '1.05vw 1.7vw' : '2.5vw 4.2vw', fontSize: landscape ? '1vw' : '2.2vw', fontWeight: 700, transform: `scale(${interpolate(star, [0, 1], [0.86, 1])})` }}>Book a 20-Min Discovery Session <span style={{ color: '#B9B5FF' }}>→</span></div>
        <div style={{ color: COLORS.emerald, ...mono, fontSize: landscape ? '0.78vw' : '1.55vw' }}>● SYSTEMS OPERATIONAL / DIRECT FOUNDER DIAGNOSTIC</div>
      </div>
    </SceneFrame>
  );
}

export const AxiomFromScratch: React.FC = () => {
  const { width, height } = useVideoConfig();
  const landscape = width > height;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper, color: COLORS.ink, overflow: 'hidden', fontFamily: '"AXIOM Inter", Arial, sans-serif' }}>
      <style>{`
        @font-face {
          font-family: "AXIOM Instrument";
          font-style: italic;
          font-weight: 400;
          src: url(${staticFile('InstrumentSerif-Italic.woff2')}) format("woff2");
        }
        @font-face {
          font-family: "AXIOM Inter";
          font-style: normal;
          font-weight: 100 900;
          src: url(${staticFile('Inter-Variable.woff2')}) format("woff2");
        }
      `}</style>
      <GridBackground landscape={landscape} />
      <Sequence from={0} durationInFrames={66}><HookScene landscape={landscape} /></Sequence>
      <Sequence from={58} durationInFrames={82}><ProblemScene landscape={landscape} /></Sequence>
      <Sequence from={132} durationInFrames={83}><ShiftScene landscape={landscape} /></Sequence>
      <Sequence from={207} durationInFrames={113}><DashboardScene landscape={landscape} /></Sequence>
      <Sequence from={309} durationInFrames={83}><ServiceScene landscape={landscape} /></Sequence>
      <Sequence from={384} durationInFrames={66}><RevealScene landscape={landscape} /></Sequence>
      <Audio src={staticFile('axiom_fresh_soundtrack.wav')} volume={0.62} />
    </AbsoluteFill>
  );
};
