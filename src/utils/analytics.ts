/**
 * CRO & Analytics Tracking Utility
 * Dispatches standard Google Analytics 4 (gtag) and Meta Pixel (fbq) events,
 * and maintains an active event log for verification and debug preview.
 */

export interface TrackingEvent {
  id: string;
  name: string;
  timestamp: string;
  source: string;
  payload: Record<string, unknown>;
}

type EventListener = (event: TrackingEvent) => void;
const listeners: EventListener[] = [];
const eventHistory: TrackingEvent[] = [];

export function subscribeToEvents(callback: EventListener) {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getEventHistory(): TrackingEvent[] {
  return [...eventHistory];
}

export function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  const eventData: TrackingEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour12: false }),
    source: payload.cta_location ? String(payload.cta_location) : 'website_interaction',
    payload
  };

  eventHistory.unshift(eventData);
  if (eventHistory.length > 20) eventHistory.pop();

  // Trigger internal subscribers
  listeners.forEach(fn => fn(eventData));

  // Dispatch to window.gtag if present (Google Analytics 4)
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', name, payload);
  }

  // Dispatch to window.fbq if present (Meta Pixel)
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: Function }).fbq) {
    (window as unknown as { fbq: Function }).fbq('trackCustom', name, payload);
  }

  // Console log with CRO formatting
  console.log(`[CRO Event Tracked] %c${name}`, 'color: #BA7A6A; font-weight: bold;', payload);
}

export const DOCTOR_NAME = 'Dra. Manoela Maia';
export const DOCTOR_TITLE = 'Especialista em Harmonização Orofacial & Estética Dental';
export const CLINIC_NAME = 'Dra. Manoela Maia | Odontologia & Harmonização Orofacial';
export const WHATSAPP_NUMBER = '5571991478389';
export const WHATSAPP_DISPLAY = '(71) 99147-8389';
export const INSTAGRAM_URL = 'https://www.instagram.com/manomaia?stkn=dDhudzNnN2wwMHF5';
export const INSTAGRAM_HANDLE = '@manomaia';
export const CLINIC_ADDRESS = 'Complexo Odonto-Médico Itaigara - Av. Antônio Carlos Magalhães, 585, Sala 703 - Itaigara, Salvador - BA, 41800-700';

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
