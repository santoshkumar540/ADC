import React, { useEffect, useState } from 'react';
import type { AdSettings } from '../../types';
import { api } from '../../services/api';

interface AdContainerProps {
  slot: 'top' | 'inline' | 'sidebar' | 'bottom';
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ slot, className = '' }) => {
  const [adSettings, setAdSettings] = useState<AdSettings | null>(null);

  useEffect(() => {
    let mounted = true;
    api.getAdSettings()
      .then((res) => {
        if (mounted) setAdSettings(res.settings);
      })
      .catch(() => {
        // Silently default to disabled ads in offline/local
      });
    return () => {
      mounted = false;
    };
  }, []);

  const slotId =
    slot === 'top'
      ? adSettings?.top_ad_slot
      : slot === 'inline'
      ? adSettings?.inline_ad_slot
      : slot === 'sidebar'
      ? adSettings?.sidebar_ad_slot
      : adSettings?.bottom_ad_slot;

  // When ads are disabled or in dev mode:
  if (!adSettings?.ads_enabled) {
    return (
      <aside
        aria-label="Sponsorship placeholder"
        className={`w-full my-6 p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 flex flex-col items-center justify-center text-center text-xs text-slate-400 select-none ${className}`}
      >
        <span className="font-semibold tracking-wider uppercase text-[10px] text-slate-400">
          AdSense Ready Slot ({slot.toUpperCase()})
        </span>
        <span className="text-[11px] text-slate-400 mt-0.5">
          Configurable via Admin &bull; Clean Non-Intrusive Layout
        </span>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full my-6 overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      <div className="w-full text-center text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-1">
        Sponsored Educational Resource
      </div>
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={adSettings.publisher_id}
        data-ad-slot={slotId || '1234567890'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};
