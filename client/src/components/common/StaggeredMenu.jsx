import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const StaggeredMenu = ({
  position = 'left',
  colors = ['#1e3a8a', '#2563eb', '#ffffff'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logo,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#000000',
  changeMenuColorOnOpen = true,
  accentColor = '#2563eb',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  
  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        { 
          yPercent: 0, 
          rotate: 0, 
          duration: 1, 
          ease: 'power4.out', 
          stagger: { each: 0.1, from: 'start' } 
        },
        itemsStart
      );
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.35,
      ease: 'power3.in',
      stagger: {
        each: 0.05,
        from: 'end'
      },
      overwrite: 'auto',
      onComplete: () => {
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateColor = useCallback((opening) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    
    if (changeMenuColorOnOpen) {
      const targetColor = opening ? openMenuButtonColor : menuButtonColor;
      colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
    }
  }, [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const seq = opening ? ['Menu', '...', 'Close'] : ['Close', '...', 'Menu'];
    
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });
    
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && 
          toggleBtnRef.current && !toggleBtnRef.current.contains(event.target)) {
        toggleMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, toggleMenu]);

  return (
    <div className={cn(
      "sm-scope select-none font-sans z-50",
      isFixed ? "fixed inset-0 pointer-events-none" : "relative w-full h-full",
      className
    )}>
      <div 
        className="staggered-menu-wrapper w-full h-full pointer-events-none"
        style={{ '--sm-accent': accentColor }}
        data-position={position}
      >
       {/* Layer Backgrounds */}
<div ref={preLayersRef} className={cn(
  "sm-prelayers absolute top-0 bottom-0 pointer-events-none z-[5] w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw]",
  position === 'left' ? 'left-0' : 'right-0'
)}>
          {colors.slice(0, -1).map((c, i) => (
            <div 
              key={i} 
              className="sm-prelayer absolute inset-0 shadow-2xl" 
              style={{ background: c }} 
            />
          ))}
        </div>

       {/* Header Toggle Button (Fixed top-left positioning) */}
<header className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[30] pointer-events-none">
  <button
    ref={toggleBtnRef}
    onClick={toggleMenu}
    className="sm-toggle pointer-events-auto flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-800/90 hover:bg-slate-800 text-white shadow-xl backdrop-blur-md transition-all focus:outline-none border border-slate-700/80 active:scale-95"
    aria-expanded={open}
  >
    <div className="relative h-[1.2em] overflow-hidden min-w-[40px] sm:min-w-[45px] text-left">
      <div ref={textInnerRef} className="flex flex-col font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
        {textLines.map((line, i) => (
          <span key={i} className="h-[1.2em] leading-tight flex items-center">{line}</span>
        ))}
      </div>
    </div>
    <div ref={iconRef} className="relative w-3.5 h-3.5 sm:w-4 sm:h-4">
      <span ref={plusHRef} className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full -translate-y-1/2" />
      <span ref={plusVRef} className="absolute top-0 left-1/2 w-0.5 h-full bg-current rounded-full -translate-x-1/2" />
    </div>
  </button>
</header>

        {/* Menu Panel */}
<aside
  ref={panelRef}
  className={cn(
    "staggered-menu-panel absolute top-0 bottom-0 z-10 pointer-events-auto flex flex-col pt-20 pb-10 px-6 sm:px-12 overflow-y-auto w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] shadow-2xl border-r border-slate-100",
    position === 'left' ? 'left-0' : 'right-0'
  )}
  style={{ background: colors[colors.length - 1] }}
>
          <div className="flex-1 flex flex-col justify-between">
            <nav>
              <ul className="flex flex-col gap-6 list-none p-0 m-0">
                {items.map((item, idx) => (
                  <li key={idx} className="overflow-hidden">
                    <a
                      href={item.link}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                          toggleMenu();
                        }
                      }}
                      className="group relative flex items-baseline gap-4 no-underline"
                      aria-label={item.ariaLabel}
                    >
                      {displayItemNumbering && (
                        <span className="text-xs font-semibold opacity-40 translate-y-[-0.25rem]">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      )}
                      <span className="sm-panel-itemLabel inline-block font-extrabold text-2xl sm:text-4xl text-slate-800 uppercase tracking-tight transition-colors group-hover:text-blue-600">
  {item.label}
</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {displaySocials && socialItems.length > 0 && (
              <div className="pt-8 border-t border-slate-100">
                <h3 className="sm-socials-title text-[10px] font-bold uppercase tracking-widest mb-4 text-slate-400">Portal Resources</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
                  {socialItems.map((social, i) => (
                    <li key={i}>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-xs font-semibold text-slate-700 no-underline hover:text-blue-600 transition-colors py-1 inline-block"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StaggeredMenu;