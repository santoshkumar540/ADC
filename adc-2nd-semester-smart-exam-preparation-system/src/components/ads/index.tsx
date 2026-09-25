import React from 'react';
import { AdContainer } from './AdContainer';

export const AdTop: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer slot="top" className={className} />
);

export const AdInline: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer slot="inline" className={className} />
);

export const AdSidebar: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer slot="sidebar" className={className} />
);

export const AdBottom: React.FC<{ className?: string }> = ({ className }) => (
  <AdContainer slot="bottom" className={className} />
);
